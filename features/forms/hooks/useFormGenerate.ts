"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { generateForm } from "@/features/forms/actions/generateForm";
import { MAX_FREE_FORM } from "@/lib/utils";

type UseFormGenerateProps = {
  text?: string;
  totalForms?: number;
  isSubscribed?: boolean;
};

const validationSchema = Yup.object({
  description: Yup.string()
    .min(10, "Please describe your form in at least 10 characters")
    .max(500, "Description must be under 500 characters")
    .required("Please describe the form you want to generate"),
});

export function useFormGenerate({
  text,
  totalForms = 0,
  isSubscribed = true,
}: UseFormGenerateProps) {
  const router = useRouter();
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

  return {
    formik,
    canGenerate,
    hasError: formik.touched.description && formik.errors.description,
  };
}
