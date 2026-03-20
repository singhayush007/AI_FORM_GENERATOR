import { getFormStats } from "@/features/dashboard/actions/formStats";
import Analytics from "@/features/dashboard/components/Analytics";
import React from "react";

const AnalyticsPage = async () => {
  const stats = await getFormStats();

  return (
    <Analytics
      totalForms={stats.totalForms}
      publishedForms={stats.publishedForms}
      draftForms={stats.draftForms}
      totalSubmissions={stats.totalSubmissions}
    />
  );
};

export default AnalyticsPage;
