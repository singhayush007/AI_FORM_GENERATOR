import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CopyButton from "@/features/forms/components/CopyButton";
import {
  Edit2,
  ExternalLink,
  FileText,
  Users,
  Calendar,
  Globe,
  Lock,
  ArrowLeft,
} from "lucide-react";

export default async function FormDetailPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  const id = Number(formId);
  if (isNaN(id)) return notFound();

  const form = await prisma.form.findUnique({
    where: { id },
    include: {
      FormSubmissions: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!form) return notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any =
    typeof form.content !== "object"
      ? JSON.parse(form.content as string)
      : form.content;

  const title: string =
    content?.formTitle ||
    (Array.isArray(content) ? content[0]?.formTitle : "") ||
    "Untitled Form";

  const shareLink = `/forms/${form.id}`;

  const createdAt = new Date(form.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/forms">
          <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Forms
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            <Badge
              className={
                form.published
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              }
            >
              {form.published ? (
                <><Globe className="w-3 h-3 mr-1" />Published</>
              ) : (
                <><Lock className="w-3 h-3 mr-1" />Draft</>
              )}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Created on {createdAt}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/dashboard/forms/edit/${form.id}`}>
            <Button className="gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
              <Edit2 className="w-4 h-4" />
              Edit Form
            </Button>
          </Link>
          {form.published && (
            <a href={shareLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 cursor-pointer">
                <ExternalLink className="w-4 h-4" />
                View Live
              </Button>
            </a>
          )}
        </div>
      </div>

      <Separator />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border border-gray-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Submissions
            </CardTitle>
            <Users className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {form.submissions}
            </p>
            <p className="text-xs text-gray-500 mt-1">responses collected</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Form Fields
            </CardTitle>
            <FileText className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {Array.isArray(content?.formFields)
                ? content.formFields.length
                : Array.isArray(content)
                ? content[0]?.formFields?.length ?? 0
                : 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">fields in this form</p>
          </CardContent>
        </Card>
      </div>

      {/* Share Link */}
      {form.published && (
        <Card className="border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Shareable Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm bg-white dark:bg-neutral-900 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 truncate">
                {shareLink}
              </code>
              <CopyButton text={shareLink} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Submissions */}
      <Card className="border border-gray-200 dark:border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Recent Submissions
          </CardTitle>
          {form.submissions > 0 && (
            <Link href={`/dashboard/forms/${form.id}/submissions`}>
              <Button variant="ghost" size="sm" className="text-blue-600 cursor-pointer text-sm">
                View all →
              </Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {form.FormSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No submissions yet.{" "}
                {!form.published && (
                  <span>
                    <Link
                      href={`/dashboard/forms/edit/${form.id}`}
                      className="text-blue-600 underline"
                    >
                      Publish your form
                    </Link>{" "}
                    to start collecting responses.
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {form.FormSubmissions.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Response #{form.submissions - idx}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(sub.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
