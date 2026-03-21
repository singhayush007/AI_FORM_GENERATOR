import PricingPage from "@/features/billing/components/PricingPage";
import { currentUser } from "@clerk/nextjs/server";
import { Zap } from "lucide-react";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page header */}
      <div className="mb-6 pb-6 border-b border-gray-100 dark:border-neutral-800 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            <Zap className="w-3 h-3" />
            Plans &amp; Pricing
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 dark:from-gray-100 dark:via-blue-300 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
          Upgrade Your Plan
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
          Unlock more form generations, priority support, and advanced features.{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">No hidden fees. Cancel anytime.</span>
        </p>
      </div>

      <PricingPage userId={user?.id} />
    </div>
  );
};

export default page;
