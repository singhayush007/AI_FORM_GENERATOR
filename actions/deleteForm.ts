"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteForm = async (formId: number) => {
  try {
    await prisma.submissions.deleteMany({ where: { formId } });

    const form = await prisma.form.delete({ where: { id: formId } });

    if (!form) {
      return { success: false, message: "Form not found" };
    }

    revalidatePath("/dashboard/forms");

    return { success: true, message: "Form deleted successfully." };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete form";
    return { success: false, message };
  }
};
