"use server";

import prisma from "@/lib/prisma";

export const submitForm = async (formId: number, formData: Record<string, string>) => {
  try {
    if (!formId || !formData) {
      return { success: false, message: "Invalid form data" };
    }

    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form) return { success: false, message: "Form not found" };

    await prisma.submissions.create({ data: { formId, content: formData } });

    await prisma.form.update({
      where: { id: formId },
      data: { submissions: { increment: 1 } },
    });

    return { success: true, message: "Form submitted successfully" };
  } catch {
    return { success: false, message: "Something went wrong!" };
  }
};
