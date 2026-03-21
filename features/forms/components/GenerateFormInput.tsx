"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { generateForm } from "@/features/forms/actions/generateForm";
import GenerateButton from "@/features/forms/components/GenerateButton";
import InlineFieldError from "@/features/forms/components/InlineFieldError";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MAX_FREE_FORM } from "@/lib/utils";

type Props = {
  text?: string;
  totalForms?: number;
  isSubscribed?: boolean;
  variant?: "hero" | "default";
};

const validationSchema = Yup.object({
  description: Yup.string()
    .min(10, "Please describe your form in at least 10 characters")
    .max(500, "Description must be under 500 characters")
    .required("Please describe the form you want to generate"),
});

const GenerateFormInput: React.FC<Props> = ({
  text,
  totalForms = 0,
  isSubscribed = true,
  variant = "default",
}) => {
  const router = useRouter();
  const isHero = variant === "hero";
  const canGenerate = isSubscribed || totalForms < MAX_FREE_FORM;

  const formik = useFormik({
    initialValues: { description: text || "" },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append("description", values.description);
      const result = await generateForm(null, formData);
      setSubmitting(false);
      if (result.success) {
        toast.success(result.message);
        resetForm();
        router.push(`/dashboard/forms/edit/${result.data?.id}`);
      } else {
        toast.error(result.message || "Error generating form");
      }
    },
  });

  useEffect(() => {
    if (text) formik.setFieldValue("description", text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const hasError = formik.touched.description && formik.errors.description;

  return (
    <div className="w-full space-y-1.5">
      <form onSubmit={formik.handleSubmit} className="flex items-center gap-2 w-full">
        {isHero ? (
          <input
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="e.g. Create a job application form with 5 fields..."
            className={`flex-1 h-11 px-4 rounded-xl bg-white/20 backdrop-blur-sm border text-white placeholder:text-white/60 outline-none focus:bg-white/25 transition-all text-sm ${
              hasError ? "border-red-400 focus:border-red-400" : "border-white/30 focus:border-white/60"
            }`}
          />
        ) : (
          <Input
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="e.g. Create a job application form with 5 fields..."
            className={`flex-1 h-11 ${hasError ? "border-red-400 focus-visible:ring-red-400" : ""}`}
          />
        )}

        <GenerateButton isHero={isHero} isSubmitting={formik.isSubmitting} canGenerate={canGenerate} />
      </form>

      {hasError && (
        <InlineFieldError
          message={formik.errors.description as string}
        />
      )}
    </div>
  );
};

export default GenerateFormInput;
