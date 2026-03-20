"use client";

import { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { submitForm } from "@/features/forms/actions/submitForm";
import type { Fields, FormContent } from "@/features/forms/types";

type UseFormSubmitProps = {
  formId: number;
  fields: Fields[];
  getFieldType: (item: Fields) => string;
};

function buildValidationSchema(fields: Fields[], getFieldType: (item: Fields) => string) {
  const shape: Record<string, Yup.StringSchema> = {};

  fields.forEach((field) => {
    const name = field.name || "";
    const label = field.label || name;
    const type = getFieldType(field);

    let validator = Yup.string();

    if (type === "email") {
      validator = validator.email("Please enter a valid email address").required(`${label} is required`);
    } else if (type === "url") {
      validator = validator.url("Please enter a valid URL (starting with https://)").required(`${label} is required`);
    } else if (type === "tel") {
      validator = validator.matches(/^[0-9+\-\s()]{7,15}$/, "Please enter a valid phone number").required(`${label} is required`);
    } else {
      validator = validator.required(`${label} is required`);
    }

    shape[name] = validator;
  });

  return Yup.object(shape);
}

export function useFormSubmit({ formId, fields, getFieldType }: UseFormSubmitProps) {
  const router = useRouter();

  const validationSchema = useMemo(
    () => buildValidationSchema(fields, getFieldType),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );

  const initialValues = useMemo(
    () => fields.reduce((acc, field) => ({ ...acc, [field.name || ""]: "" }), {} as Record<string, string>),
    [fields]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = await submitForm(formId, values);
      setSubmitting(false);
      if (data?.success) {
        toast.success(data.message || "Form submitted!");
        resetForm();
        router.push("/success");
      } else {
        toast.error(data?.message || "Failed to submit");
      }
    },
  });

  return { formik };
}
