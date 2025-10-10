"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { PricingPlan, pricingPlan } from "@/lib/pricingplan";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

type Props = {
  userId: string | undefined;
};

const PricingPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();

  const handlePlanClick = (plan: string) => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    alert(`Selected Plan: ${plan}`); // Just show alert instead of Stripe checkout
  };

  return (
    <div className="py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-extrabold text-3xl">Plan and Pricing</h1>
        <p className="text-gray-500 mt-3">
          Receive unlimited credits when you pay early, and save your plan.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 justify-center">
        {pricingPlan.map((plan: PricingPlan) => (
          <Card
            key={plan.level} // Unique key
            className={`${
              plan.level === "Enterprise" ? "bg-[#1c1c1c] text-white" : ""
            } w-full sm:w-[300px] md:w-[350px] flex flex-col justify-between`}
          >
            <CardHeader className="flex flex-row items-center gap-4 ">
              <CardTitle>{plan.level}</CardTitle>
              {plan.level === "Pro" && (
                <Badge className="rounded-full bg-orange-600 ">🔥 Popular</Badge>
              )}
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-2xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.services.map((item) => (
                  <li className="flex items-center" key={item}>
                    <span className="text-green-500 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                variant={plan.level === "Enterprise" ? "default" : "outline"}
                className={`${
                  plan.level === "Enterprise" &&
                  "text-black bg-white hover:bg-gray-200"
                } w-full`}
                onClick={() => handlePlanClick(plan.level)}
              >
                Get started with {plan.level}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;

