import prisma from "@/lib/prisma";
import SubmissionsDetails from "@/components/SubmissionsDetails";

export default async function SubmissionsPage({
  params,
}: {
  params: { formId: string };
}) {
  const formId = Number(params.formId);
  const submissions = await prisma.submissions.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Submissions
      </h1>

      {submissions.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No submissions yet.</p>
      ) : (
        <div className="space-y-6">
          {submissions.map((s, index) => (
            <div
              key={s.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {/* Render using SubmissionsDetails component */}
              <SubmissionsDetails submission={s} index={index} />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Submitted on: {new Date(s.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
