import prisma from "@/lib/prisma";
import AiGeneratedForm from "@/features/forms/components/AiGeneratedForm";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";

export default async function PublicFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  const id = Number(formId);

  if (isNaN(id)) return notFound();

  const form = await prisma.form.findUnique({ where: { id } });

  if (!form || !form.published) return notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any =
    typeof form.content !== "object"
      ? JSON.parse(form.content as string)
      : form.content;

  const title: string = content?.formTitle || (Array.isArray(content) ? content[0]?.formTitle : "") || "Form";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-950 dark:to-neutral-900 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Fill out the form below and submit your response.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 p-8">
          <AiGeneratedForm form={form} isEditMode={false} />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Powered by <span className="font-semibold text-blue-500">Formify.ai</span>
        </p>
      </div>
    </div>
  );
}
