"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const publishForm = async (formId: number) => {
  try {
    const user = await currentUser();
    if (!user) return { success: false, message: "User not found" };
    if (!formId) return { success: false, message: "Form not found" };

    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form) return { success: false, message: "Form not found" };
    if (form.ownerId !== user.id) return { success: false, message: "Unauthorized" };

    const updated = await prisma.form.update({
      where: { id: formId },
      data: { published: true },
    });

    return { success: true, shareUrl: updated.shareUrl };
  } catch {
    return { success: false, message: "An error occurred while publishing the form" };
  }
};
