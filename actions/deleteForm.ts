"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteForm = async (formId: number) => {
  try {
    // Pehle linked submissions delete karo
    await prisma.submissions.deleteMany({
      where: { formId },
    });

    // Ab form delete karo
    const form = await prisma.form.delete({
      where: { id: formId },
    });

    if (!form) {
      return { success: false, message: "Form not found" };
    }

    // Update the dashboard forms list
    revalidatePath("/dashboard/forms");

    return {
      success: true,
      message: "Form deleted successfully.",
    };
  } catch (error: any) {
    console.error("Error deleting form:", error);
    return {
      success: false,
      message: error?.message || "Failed to delete form",
    };
  }
};
