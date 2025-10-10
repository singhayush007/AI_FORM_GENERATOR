import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getFormStats() {
  const user = await currentUser();
  if (!user) {
    console.log("User not found");
    return 0; // fallback value
  }

  try {
    const stats = await prisma.form.aggregate({
      where: { ownerId: user.id as string },
      _count: true,
    });

    return stats._count;
  } catch (error) {
    console.error("Prisma query failed:", error);
    return 0; // temporary fallback to avoid crash
  }
}
