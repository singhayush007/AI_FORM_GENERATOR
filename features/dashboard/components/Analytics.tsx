import React from "react";
import { FileText, Globe, PenLine, Users, BarChart2 } from "lucide-react";
import MetricCard from "@/features/dashboard/components/MetricCard";
import ConversionRateBanner from "@/features/dashboard/components/ConversionRateBanner";

type Props = {
  totalForms: number;
  publishedForms: number;
  draftForms: number;
  totalSubmissions: number;
};

const metricCards = [
  { key: "totalForms" as keyof Props, title: "Total Forms", icon: FileText, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950", border: "border-blue-100 dark:border-blue-900", sub: "forms created overall" },
  { key: "totalSubmissions" as keyof Props, title: "Total Submissions", icon: Users, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950", border: "border-green-100 dark:border-green-900", sub: "responses received" },
  { key: "publishedForms" as keyof Props, title: "Published", icon: Globe, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950", border: "border-purple-100 dark:border-purple-900", sub: "live & accepting responses" },
  { key: "draftForms" as keyof Props, title: "Drafts", icon: PenLine, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950", border: "border-yellow-100 dark:border-yellow-900", sub: "not yet published" },
];

const Analytics: React.FC<Props> = (props) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="pb-6 border-b border-gray-100 dark:border-neutral-800 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900">
            <BarChart2 className="w-3 h-3" />
            Dashboard Insights
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 dark:from-gray-100 dark:via-purple-300 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
          Analytics Overview
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
          Track your form performance in real time.{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">Submissions, drafts, and live forms — all in one place.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map(({ key, ...cardProps }) => (
          <MetricCard key={key} value={props[key] as number} {...cardProps} />
        ))}
      </div>

      {props.totalForms > 0 && (
        <ConversionRateBanner
          publishedForms={props.publishedForms}
          totalSubmissions={props.totalSubmissions}
        />
      )}
    </div>
  );
};

export default Analytics;
