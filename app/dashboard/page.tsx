import React from "react";
import { getFormStats } from "@/features/dashboard/actions/formStats";
import { getForms } from "@/features/forms/actions/getForms";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Globe,
  PenLine,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DashboardHome = async () => {
  const [user, stats, formsRes] = await Promise.all([
    currentUser(),
    getFormStats(),
    getForms(),
  ]);

  const recentForms = formsRes?.data?.slice(0, 4) ?? [];

  const metricCards = [
    {
      title: "Total Forms",
      value: stats.totalForms,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950",
      sub: "forms created",
    },
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950",
      sub: "responses collected",
    },
    {
      title: "Published",
      value: stats.publishedForms,
      icon: Globe,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950",
      sub: "live forms",
    },
    {
      title: "Drafts",
      value: stats.draftForms,
      icon: PenLine,
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-950",
      sub: "unpublished forms",
    },
  ];

  const firstName = user?.firstName || "there";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Greeting */}
      <div className="pb-6 border-b border-gray-100 dark:border-neutral-800 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900">
            <Sparkles className="w-3 h-3" />
            Welcome Back
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-green-800 to-green-600 dark:from-gray-100 dark:via-green-300 dark:to-green-400 bg-clip-text text-transparent leading-tight">
          Hey, {firstName} 👋
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
          Here&apos;s an overview of your form activity.{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">Build, publish, and track — all from one place.</span>
        </p>
        <div className="mt-5">
          <Link href="/dashboard/forms">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              <Plus className="w-4 h-4" />
              Create Form
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map(({ title, value, icon: Icon, color, bg, sub }) => (
          <Card
            key={title}
            className="border border-gray-200 dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {title}
              </CardTitle>
              <div className={`p-1.5 rounded-lg ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Forms */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Recent Forms
          </h2>
          <Link href="/dashboard/forms">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 cursor-pointer text-sm gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {recentForms.length === 0 ? (
          <Card className="border border-dashed border-gray-300 dark:border-neutral-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                You haven&apos;t created any forms yet.
              </p>
              <Link href="/dashboard/forms">
                <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  <Plus className="w-4 h-4" />
                  Create your first form
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {recentForms.map((form: any) => {
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
                <Link
                  key={form.id}
                  href={`/dashboard/forms/${form.id}`}
                  className="block"
                >
                  <Card className="border border-gray-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 shrink-0">
                          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {form.submissions} submission{form.submissions !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={
                          form.published
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 shrink-0 ml-2"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 shrink-0 ml-2"
                        }
                      >
                        {form.published ? "Live" : "Draft"}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
