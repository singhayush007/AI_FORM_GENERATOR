"use server";
import prisma from "@/lib/prisma";

/** Fetch all submissions for a given form, newest first */
export async function getFormSubmissions(formId: number) {
  return prisma.submissions.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" },
  });
}
