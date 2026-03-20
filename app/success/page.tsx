"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const SuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isPayment = type === "payment";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-neutral-950 dark:to-neutral-900 px-4">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-800 p-10 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
          {isPayment ? "Payment Successful!" : "Submitted!"}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {isPayment
            ? "Your plan has been upgraded. You can now create unlimited forms."
            : "Your response has been submitted successfully. Thank you!"}
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push(isPayment ? "/dashboard" : "/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            {isPayment ? "Go to Dashboard" : "Back to Home"}
          </Button>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-6">
          Powered by <span className="font-semibold text-blue-500">Formify.ai</span>
        </p>
      </div>
    </div>
  );
};

const SuccessPage = () => (
  <Suspense>
    <SuccessContent />
  </Suspense>
);

export default SuccessPage;
