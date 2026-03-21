"use server";
import prisma from "@/lib/prisma";

/** Fetch a single form with optional submissions */
export async function getFormById(id: number, includeSubmissions = false) {
  return prisma.form.findUnique({
    where: { id },
    ...(includeSubmissions
      ? {
          include: {
            FormSubmissions: {
              orderBy: { createdAt: "desc" as const },
              take: 5,
            },
          },
        }
      : {}),
  });
}
