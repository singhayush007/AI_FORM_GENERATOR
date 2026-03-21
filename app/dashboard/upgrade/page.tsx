import PricingPage from "@/features/billing/components/PricingPage";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Upgrade Plan
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Choose the plan that fits your needs. Upgrade anytime.
        </p>
      </div>
      <PricingPage userId={user?.id} />
    </div>
  );
};

export default page;
