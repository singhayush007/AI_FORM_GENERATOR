import prisma from "@/lib/prisma";
import SubmissionsDetails from "@/features/dashboard/components/SubmissionsDetails";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId: formIdStr } = await params;
  const formId = Number(formIdStr);

  const form = await prisma.form.findUnique({ where: { id: formId } });
  if (!form) return notFound();

  const submissions = await prisma.submissions.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any =
    typeof form.content !== "object"
      ? JSON.parse(form.content as string)
      : form.content;

  const title: string =
    content?.formTitle ||
    (Array.isArray(content) ? content[0]?.formTitle : "") ||
    "Untitled Form";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link href={`/dashboard/forms/${formId}`}>
        <Button variant="ghost" size="sm" className="gap-2 cursor-pointer -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Form
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Submissions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-md">
            {title}
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0 flex items-center gap-1.5 px-3 py-1.5 text-sm">
          <Users className="w-4 h-4" />
          {submissions.length} response{submissions.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Submissions List */}
      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-300 dark:border-neutral-700 rounded-2xl text-center">
          <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
            No responses yet
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
            Share your form link to start collecting responses.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((s, index) => (
            <div
              key={s.id}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Submission header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Response #{submissions.length - index}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(s.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <SubmissionsDetails submission={s} index={index} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
