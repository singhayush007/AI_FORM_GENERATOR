"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const generateForm = async (_prev: unknown, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) return { success: false, message: "User not found" };

    const schema = z.object({ description: z.string().min(1) });
    const result = schema.safeParse({
      description: formData.get("description"),
    });
    if (!result.success)
      return {
        success: false,
        message: "Invalid data",
        error: result.error.errors,
      };

    const description = result.data.description;

    if (!process.env.OPENROUTER_API_KEY)
      return { success: false, message: "OpenRouter API key missing!" };

    const prompt = `
You are an intelligent form generator. 
Your task: Generate a VALID JSON object representing a form. 
DO NOT include any explanation, text, markdown, or comments.

Example format:
{
  "formTitle": "Job Application Form",
  "formFields": [
    { "label": "Full Name", "name": "full_name", "placeholder": "Enter your full name" },
    { "label": "Email", "name": "email", "placeholder": "Enter your email address" }
  ]
}

Now generate the form for this description: "${description}"

Output STRICTLY in JSON format only.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a helpful AI form generator." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
        },
      }
    );

    const rawText = response.data.choices[0].message.content || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let json;
    try {
      json = JSON.parse(cleaned);
    } catch (e) {
      console.error("⚠️ Invalid JSON from AI:", cleaned);
      return {
        success: false,
        message: "Invalid JSON response from AI. Please try again.",
      };
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
      message: "Form generated!",
      formId: form.id,
      data: form,
    };
  } catch (err) {
    console.error("❌ Error generating form:", err);
    return { success: false, message: "Error generating form." };
  }
};
