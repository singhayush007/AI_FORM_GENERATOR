import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PricingFeatureItem from "@/features/billing/components/PricingFeatureItem";
import type { PricingPlan } from "@/lib/pricingplan";

type Props = {
  plan: PricingPlan;
  onSelect: (level: string, price: number) => void;
};

const PricingCard: React.FC<Props> = ({ plan, onSelect }) => {
  const isPro = plan.level === "Pro";
  const isEnterprise = plan.level === "Enterprise";

  const cardClass = isPro
    ? "border-2 border-blue-500 shadow-2xl shadow-blue-100 dark:shadow-blue-950 bg-white dark:bg-neutral-900"
    : isEnterprise
    ? "border border-neutral-800 bg-neutral-900 dark:bg-neutral-900 text-white"
    : "border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900";

  const btnClass = isPro
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : isEnterprise
    ? "bg-white text-black hover:bg-gray-100"
    : "border border-gray-300 dark:border-neutral-600 bg-transparent hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-100";

  return (
    <Card className={`relative flex flex-col transition-all duration-200 h-full ${cardClass}`}>
      {isPro && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="bg-blue-600 text-white border-0 px-3 py-1 text-xs font-semibold shadow">
            🔥 Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="pt-8 pb-4">
        <CardTitle className={`text-xl font-bold ${isEnterprise ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
          {plan.level}
        </CardTitle>
        <div className="mt-2">
          <span className={`text-4xl font-extrabold ${isEnterprise ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
            {plan.price === 0 ? "$0" : `$${plan.price}`}
          </span>
          <span className={`text-sm ml-1 ${isEnterprise ? "text-neutral-400" : "text-gray-400"}`}>/month</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ul className="space-y-3">
          {plan.services.map((feature) => (
            <PricingFeatureItem
              key={feature}
              feature={feature}
              isPro={isPro}
              isEnterprise={isEnterprise}
            />
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className={`w-full cursor-pointer font-semibold transition-all ${btnClass}`}
          onClick={() => onSelect(plan.level, plan.price)}
        >
          {plan.price === 0 ? "Get Started Free" : `Start ${plan.level}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
