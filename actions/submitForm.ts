"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const submitForm = async (formId: number, formData: any) => {
  try {
    if (!formId || !formData) {
      return { success: false, message: "Invalid form data" };
    }

    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form) return { success: false, message: "Form not found" };

    // Save submission
    await prisma.submissions.create({
      data: {
        formId,
        content: formData,
      },
    });

    // Increment submission count
    await prisma.form.update({
      where: { id: formId },
      data: { submissions: { increment: 1 } },
    });

    return { success: true, message: "Form submitted successfully" };
  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, message: "Something went wrong!" };
  }
};
