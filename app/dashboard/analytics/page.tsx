import { getFormStats } from "@/actions/formStats";
import Analytics from "@/components/Analytics";
import React from "react";
const AnalyticsPage = async () => {
  const data = await getFormStats();

  return (
    <div>
      <Analytics noOfSubmissions={data || 0} />
    </div>
  );
};

export default AnalyticsPage;
