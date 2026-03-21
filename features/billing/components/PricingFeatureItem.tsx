import React from "react";
import { Check } from "lucide-react";

type Props = {
  feature: string;
  isPro: boolean;
  isEnterprise: boolean;
};

const PricingFeatureItem: React.FC<Props> = ({ feature, isPro, isEnterprise }) => (
  <li className={`flex items-center gap-2.5 text-sm ${isEnterprise ? "text-neutral-300" : "text-gray-600 dark:text-gray-400"}`}>
    <span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${isPro ? "bg-blue-100 dark:bg-blue-900" : isEnterprise ? "bg-neutral-700" : "bg-gray-100 dark:bg-neutral-800"}`}>
      <Check className={`w-3 h-3 ${isPro ? "text-blue-600 dark:text-blue-400" : isEnterprise ? "text-neutral-300" : "text-gray-500 dark:text-gray-400"}`} />
    </span>
    {feature}
  </li>
);

export default PricingFeatureItem;
