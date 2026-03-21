import AiGeneratedForm from "@/features/forms/components/AiGeneratedForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getFormById } from "@/features/forms/actions/getFormById";
import { parseFormContent, getFormTitle, getFormFieldCount } from "@/features/forms/utils/formUtils";
import { ArrowLeft, Globe, Lock, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const Edit = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const { formId } = await params;
  if (!formId) return notFound();

  const form = await getFormById(Number(formId));
  if (!form) return notFound();

  const content = parseFormContent(form.content);
  const title = getFormTitle(content);
  const fieldCount = getFormFieldCount(content);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/dashboard/forms">
        <Button variant="ghost" size="sm" className="gap-2 cursor-pointer -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Forms
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form Preview */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 dark:border-neutral-800">
            <CardHeader className="border-b border-gray-100 dark:border-neutral-800">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                  {title}
                </CardTitle>
                <Badge
                  className={
                    form.published
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0 shrink-0"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-0 shrink-0"
                  }
                >
                  {form.published ? (
                    <><Globe className="w-3 h-3 mr-1" />Published</>
                  ) : (
                    <><Lock className="w-3 h-3 mr-1" />Draft</>
                  )}
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Preview your form fields below. Click &quot;Publish Form&quot; to make it live.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <AiGeneratedForm form={form} isEditMode={true} />
            </CardContent>
          </Card>
        </div>

        {/* Right: Info Panel */}
        <div className="space-y-4">
          <Card className="border border-gray-200 dark:border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Form Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Fields</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{fieldCount}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Submissions
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{form.submissions}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <span className={form.published ? "font-medium text-green-600 dark:text-green-400" : "font-medium text-yellow-600 dark:text-yellow-400"}>
                  {form.published ? "Live" : "Draft"}
                </span>
              </div>
            </CardContent>
          </Card>

          {form.published && (
            <Card className="border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">
                  View submissions
                </p>
                <Link href={`/dashboard/forms/${form.id}/submissions`}>
                  <Button variant="outline" size="sm" className="w-full cursor-pointer border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900">
                    <Users className="w-4 h-4 mr-2" />
                    View Responses ({form.submissions})
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
