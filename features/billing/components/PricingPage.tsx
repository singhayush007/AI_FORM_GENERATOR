"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { pricingPlan, type PricingPlan } from "@/lib/pricingplan";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Zap } from "lucide-react";
import PricingCard from "@/features/billing/components/PricingCard";

type Props = { userId?: string | undefined };

const PricingPage: React.FC<Props> = ({ userId }) => {
  const router = useRouter();

  const handlePlanClick = async (plan: string, price: number) => {
    if (!userId) { router.push("/sign-in"); return; }
    if (price === 0) { toast.success("Free plan selected! No payment required."); router.push("/success"); return; }

    try {
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, currency: "INR", plan }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error("Payment failed: " + (data.error || "Please try again")); return; }

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
    } catch {
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
        <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-gray-100">Plans & Pricing</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto">
          Start free and upgrade as you grow. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
        {pricingPlan.map((plan: PricingPlan) => (
          <PricingCard key={plan.level} plan={plan} onSelect={handlePlanClick} />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
