"use client";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { submitForm } from "@/features/forms/actions/submitForm";
import { useFormPublish } from "@/features/forms/hooks/useFormPublish";
import FormPublishDialog from "@/features/forms/components/FormPublishDialog";
import FormFieldInput from "@/features/forms/components/FormFieldInput";
import InlineFieldError from "@/features/forms/components/InlineFieldError";
import FormSubmitButton from "@/features/forms/components/FormSubmitButton";
import { getFieldType, buildFieldValidator } from "@/features/forms/utils/fieldHelpers";
import type { Fields } from "@/features/forms/types";

type FormRecord = {
  id: number;
  content: unknown;
  published: boolean;
  submissions: number;
};

type Props = { form: FormRecord; isEditMode: boolean };

const AiGeneratedForm: React.FC<Props> = ({ form, isEditMode }) => {
  const router = useRouter();
  const { successDialogOpen, setSuccessDialogOpen, handlePublish } = useFormPublish(form.id);

  const value = typeof form.content !== "object" ? JSON.parse(form.content as string) : form.content;

  const fields: Fields[] = useMemo(() => {
    const v = value as Record<string, Fields[]> | Array<{ formFields: Fields[] }>;
    if (!Array.isArray(v)) return (v as Record<string, Fields[]>).formFields ?? [];
    return (v as Array<{ formFields: Fields[] }>)[0]?.formFields ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.content]);

  const validationSchema = useMemo(() => {
    if (isEditMode) return Yup.object({});
    const shape: Record<string, Yup.StringSchema> = {};
    fields.forEach((field) => {
      const name = field.name || "";
      const label = field.label || name;
      shape[name] = buildFieldValidator(label, getFieldType(field));
    });
    return Yup.object(shape);
  }, [fields, isEditMode]);

  const initialValues = useMemo(
    () => fields.reduce((acc, field) => ({ ...acc, [field.name || ""]: "" }), {} as Record<string, string>),
    [fields]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      if (isEditMode) {
        await handlePublish();
      } else {
        const data = await submitForm(form.id, values);
        if (data?.success) {
          toast.success(data.message || "Form submitted successfully!");
          resetForm();
          router.push("/success");
        } else {
          toast.error(data?.message || "Failed to submit form");
        }
      }
      setSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      formik.handleSubmit(e as React.FormEvent<HTMLFormElement>);
      return;
    }
    const touchedAll = fields.reduce<Record<string, boolean>>(
      (acc, f) => ({ ...acc, [f.name || ""]: true }),
      {}
    );
    formik.setTouched(touchedAll as typeof formik.touched, false);
    const errors = await formik.validateForm();
    const errorMessages = Object.values(errors) as string[];
    if (errorMessages.length > 0) {
      errorMessages.forEach((msg, i) => {
        setTimeout(() => toast.error(msg, { duration: 4000 }), i * 300);
      });
      return;
    }
    formik.handleSubmit(e as React.FormEvent<HTMLFormElement>);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((item: Fields, index: number) => {
          const name = item.name || "";
          const fieldType = getFieldType(item);
          const hasError = !!(formik.touched[name] && formik.errors[name]);

          return (
            <div key={index} className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
                {!isEditMode && <span className="text-red-400 ml-0.5">*</span>}
              </Label>

              <FormFieldInput
                item={item}
                name={name}
                fieldType={fieldType}
                value={formik.values[name] || ""}
                hasError={hasError}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onSelectChange={(val) => {
                  formik.setFieldValue(name, val);
                  formik.setFieldTouched(name, true, true);
                }}
                onFileChange={(fileName) => {
                  formik.setFieldValue(name, fileName);
                  formik.setFieldTouched(name, true, true);
                }}
              />

              {hasError && <InlineFieldError message={formik.errors[name] as string} />}
            </div>
          );
        })}

        <FormSubmitButton
          isEditMode={isEditMode}
          isSubmitting={formik.isSubmitting}
          published={form.published}
        />
      </form>

      <FormPublishDialog formId={form.id} open={successDialogOpen} onOpenChange={setSuccessDialogOpen} />
    </div>
  );
};

export default AiGeneratedForm;
