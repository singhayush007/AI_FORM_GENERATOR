import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getFormStats() {
  const user = await currentUser();
  if (!user) {
    return { totalForms: 0, publishedForms: 0, draftForms: 0, totalSubmissions: 0 };
  }

  try {
    const forms = await prisma.form.findMany({
      where: { ownerId: user.id },
      select: { published: true, submissions: true },
    });

    const totalForms = forms.length;
    const publishedForms = forms.filter((f) => f.published).length;
    const draftForms = totalForms - publishedForms;
    const totalSubmissions = forms.reduce((acc, f) => acc + f.submissions, 0);

    return { totalForms, publishedForms, draftForms, totalSubmissions };
  } catch (error) {
    console.error("Prisma query failed:", error);
    return { totalForms: 0, publishedForms: 0, draftForms: 0, totalSubmissions: 0 };
  }
}
