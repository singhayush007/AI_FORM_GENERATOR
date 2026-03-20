"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PricingPlan, pricingPlan } from "@/lib/pricingplan";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Zap } from "lucide-react";

type Props = {
  userId?: string | undefined;
};

const PricingPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();

  const handlePlanClick = async (plan: string, price: number) => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    if (price === 0) {
      toast.success("Free plan selected! No payment required.");
      router.push("/success");
      return;
    }

    try {
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, currency: "INR", plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Payment failed: " + (data.error || "Please try again"));
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Formify.ai",
        description: `${plan} Plan`,
        order_id: data.id,
        handler: function (response: { razorpay_payment_id: string }) {
          toast.success("Payment Successful! ID: " + response.razorpay_payment_id);
          router.push("/success");
        },
        theme: { color: "#2563eb" },
      };

      type RazorpayConstructor = new (opts: unknown) => { open: () => void };
      const RazorpayClass = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay;
      const rzp = new RazorpayClass(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong while creating order");
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0 px-3 py-1">
          <Zap className="w-3.5 h-3.5 mr-1" />
          Simple Pricing
        </Badge>
        <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-gray-100">
          Plans & Pricing
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto">
          Start free and upgrade as you grow. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
        {pricingPlan.map((plan: PricingPlan) => {
          const isPro = plan.level === "Pro";
          const isEnterprise = plan.level === "Enterprise";

          return (
            <Card
              key={plan.level}
              className={`relative flex flex-col transition-all duration-200 h-full ${
                isPro
                  ? "border-2 border-blue-500 shadow-2xl shadow-blue-100 dark:shadow-blue-950 bg-white dark:bg-neutral-900"
                  : isEnterprise
                  ? "border border-neutral-800 bg-neutral-900 dark:bg-neutral-900 text-white"
                  : "border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
              }`}
            >
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white border-0 px-3 py-1 text-xs font-semibold shadow">
                    🔥 Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pt-8 pb-4">
                <CardTitle
                  className={`text-xl font-bold ${
                    isEnterprise ? "text-white" : "text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {plan.level}
                </CardTitle>
                <div className="mt-2">
                  <span
                    className={`text-4xl font-extrabold ${
                      isEnterprise ? "text-white" : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {plan.price === 0 ? "$0" : `$${plan.price}`}
                  </span>
                  <span
                    className={`text-sm ml-1 ${
                      isEnterprise ? "text-neutral-400" : "text-gray-400"
                    }`}
                  >
                    /month
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 pb-4">
                <ul className="space-y-3">
                  {plan.services.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2.5 text-sm ${
                        isEnterprise ? "text-neutral-300" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                          isPro
                            ? "bg-blue-100 dark:bg-blue-900"
                            : isEnterprise
                            ? "bg-neutral-700"
                            : "bg-gray-100 dark:bg-neutral-800"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            isPro
                              ? "text-blue-600 dark:text-blue-400"
                              : isEnterprise
                              ? "text-neutral-300"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-2">
                <Button
                  className={`w-full cursor-pointer font-semibold transition-all ${
                    isPro
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : isEnterprise
                      ? "bg-white text-black hover:bg-gray-100"
                      : "border border-gray-300 dark:border-neutral-600 bg-transparent hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-gray-100"
                  }`}
                  onClick={() => handlePlanClick(plan.level, plan.price)}
                >
                  {plan.price === 0 ? "Get Started Free" : `Start ${plan.level}`}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPage;
