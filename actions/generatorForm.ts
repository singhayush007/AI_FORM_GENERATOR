"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import Groq from "groq-sdk";

export const generateForm = async (_prev: unknown, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) return { success: false, message: "User not found" };

    const schema = z.object({ description: z.string().min(1) });
    const result = schema.safeParse({
      description: formData.get("description"),
    });
    if (!result.success)
      return { success: false, message: "Invalid data", error: result.error.issues };

    const description = result.data.description;

    if (!process.env.GROQ_API_KEY)
      return { success: false, message: "Groq API key missing!" };

    const prompt = `
You are an intelligent form generator.
Your task: Generate a VALID JSON object representing a form.
DO NOT include any explanation, text, markdown, or code blocks.

Each field must have: "label", "name", "placeholder", and "type".
Use these types: "text", "email", "tel", "number", "date", "file", "textarea", "url", "select"

Rules:
- Use "email" for email fields
- Use "tel" for phone number fields
- Use "file" for resume, CV, document, photo, image, attachment fields
- Use "date" for date of birth, joining date, deadline fields
- Use "number" for age, salary, quantity, experience years fields
- Use "textarea" for message, description, feedback, cover letter, bio fields
- Use "url" for website, portfolio, LinkedIn fields
- Use "select" for fields with fixed choices like: gender, country, state, education level, employment type, experience level, department, job type, priority, marital status, how did you hear about us, blood group, etc.
- For "select" type fields, add an "options" array with relevant choices
- Use "text" for everything else

Example format:
{
  "formTitle": "Job Application Form",
  "formFields": [
    { "label": "Full Name", "name": "full_name", "placeholder": "Enter your full name", "type": "text" },
    { "label": "Email", "name": "email", "placeholder": "Enter your email address", "type": "email" },
    { "label": "Gender", "name": "gender", "placeholder": "Select your gender", "type": "select", "options": ["Male", "Female", "Non-binary", "Prefer not to say"] },
    { "label": "Experience Level", "name": "experience_level", "placeholder": "Select experience level", "type": "select", "options": ["Fresher", "Junior (1-2 years)", "Mid-level (3-5 years)", "Senior (5+ years)"] },
    { "label": "Employment Type", "name": "employment_type", "placeholder": "Select employment type", "type": "select", "options": ["Full-time", "Part-time", "Contract", "Internship", "Freelance"] },
    { "label": "Resume", "name": "resume", "placeholder": "Upload your resume (PDF)", "type": "file" },
    { "label": "Cover Letter", "name": "cover_letter", "placeholder": "Write your cover letter", "type": "textarea" }
  ]
}

Now generate the form for this description: "${description}"

Output STRICTLY in JSON format only. No markdown, no backticks, no extra text.
`;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a helpful AI form generator. Always respond with valid JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const rawText = completion.choices[0]?.message?.content || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let json;
    try {
      json = JSON.parse(cleaned);
    } catch (e) {
      console.error("⚠️ Invalid JSON from AI:", cleaned);
      return { success: false, message: "Invalid JSON response from AI. Please try again." };
    }

    if (!json.formTitle || !json.formFields) {
      return { success: false, message: "Form data incomplete. Try again." };
    }

    const form = await prisma.form.create({
      data: { ownerId: user.id, content: json, published: false },
    });

    revalidatePath("/dashboard/forms");

    return {
      success: true,
      message: "Form generated successfully!",
      formId: form.id,
      data: form,
    };
  } catch (err: any) {
    console.error("❌ Error generating form:", err?.message || err);
    return { success: false, message: "Error generating form. Please try again." };
  }
};
