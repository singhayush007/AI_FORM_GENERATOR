"use client";
import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, Globe, AlertCircle } from "lucide-react";
import { submitForm } from "@/features/forms/actions/submitForm";
import { useFormPublish } from "@/features/forms/hooks/useFormPublish";
import FormPublishDialog from "@/features/forms/components/FormPublishDialog";
import type { Fields } from "@/features/forms/types";

type FormRecord = {
  id: number;
  content: unknown;
  published: boolean;
  submissions: number;
};
type Props = { form: FormRecord; isEditMode: boolean };

export const getFieldType = (item: Fields): string => {
  if (item.type) return item.type;
  const n = (item.name || "").toLowerCase();
  const l = (item.label || "").toLowerCase();
  if (n.includes("email") || l.includes("email")) return "email";
  if (n.includes("phone") || n.includes("tel") || n.includes("mobile") || l.includes("phone") || l.includes("mobile")) return "tel";
  if (n.includes("resume") || n.includes("cv") || n.includes("file") || n.includes("upload") || n.includes("attachment") || l.includes("resume") || l.includes("cv")) return "file";
  if (n.includes("date") || l.includes("date")) return "date";
  if (n.includes("age") || n.includes("salary") || n.includes("number") || l.includes("age")) return "number";
  if (n.includes("message") || n.includes("description") || n.includes("feedback") || n.includes("comment") || n.includes("cover_letter") || n.includes("bio") || l.includes("cover letter") || l.includes("message") || l.includes("description")) return "textarea";
  if (n.includes("url") || n.includes("website") || n.includes("portfolio") || n.includes("linkedin")) return "url";
  if (n.includes("gender") || l.includes("gender")) return "select";
  if (n.includes("country") || l.includes("country")) return "select";
  if (n.includes("department") || l.includes("department")) return "select";
  if ((n.includes("experience") && n.includes("level")) || l.includes("experience level")) return "select";
  if (n.includes("employment_type") || l.includes("employment type") || l.includes("job type")) return "select";
  if (n.includes("education") || l.includes("education")) return "select";
  return "text";
};

export const getDefaultOptions = (item: Fields): string[] => {
  if (item.options && item.options.length > 0) return item.options;
  const n = (item.name || "").toLowerCase();
  const l = (item.label || "").toLowerCase();
  if (n.includes("gender") || l.includes("gender")) return ["Male", "Female", "Non-binary", "Prefer not to say"];
  if (n.includes("country") || l.includes("country")) return ["India", "United States", "United Kingdom", "Canada", "Australia", "Other"];
  if (n.includes("department") || l.includes("department")) return ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "Design", "Other"];
  if (n.includes("experience") || l.includes("experience")) return ["Fresher", "Junior (1-2 years)", "Mid-level (3-5 years)", "Senior (5+ years)"];
  if (n.includes("employment") || l.includes("employment") || l.includes("job type")) return ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
  if (n.includes("education") || l.includes("education")) return ["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"];
  return [];
};

/** Build Yup schema based on field type */
function buildFieldValidator(label: string, type: string): Yup.StringSchema {
  switch (type) {
    case "email":
      return Yup.string()
        .email(`${label}: Please enter a valid email address (e.g. name@example.com)`)
        .required(`${label} is required`);

    case "tel":
      return Yup.string()
        .matches(/^[6-9]\d{9}$/, `${label}: Mobile number must be exactly 10 digits and start with 6, 7, 8 or 9`)
        .required(`${label} is required`);

    case "url":
      return Yup.string()
        .matches(
          /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
          `${label}: Please enter a valid URL (e.g. https://example.com)`
        )
        .required(`${label} is required`);

    case "number":
      return Yup.string()
        .matches(/^\d+$/, `${label}: Please enter a valid number`)
        .required(`${label} is required`);

    case "date":
      return Yup.string().required(`${label} is required`);

    case "file":
      return Yup.string().required(`${label}: Please upload a file`);

    case "textarea":
      return Yup.string()
        .min(5, `${label}: Must be at least 5 characters`)
        .required(`${label} is required`);

    default:
      return Yup.string()
        .min(2, `${label}: Must be at least 2 characters`)
        .required(`${label} is required`);
  }
}

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
      const type = getFieldType(field);
      shape[name] = buildFieldValidator(label, type);
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

  /** On submit: validate all fields, show toast for first error */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      formik.handleSubmit(e as React.FormEvent<HTMLFormElement>);
      return;
    }

    // Mark all fields touched to show inline errors
    const touchedAll = fields.reduce<Record<string, boolean>>(
      (acc, f) => ({ ...acc, [f.name || ""]: true }),
      {}
    );
    formik.setTouched(touchedAll as typeof formik.touched, false);

    const errors = await formik.validateForm();
    const errorMessages = Object.values(errors) as string[];

    if (errorMessages.length > 0) {
      // Show each error as a separate toast
      errorMessages.forEach((msg, i) => {
        setTimeout(() => {
          toast.error(msg, { duration: 4000 });
        }, i * 300);
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
          const hasError = formik.touched[name] && formik.errors[name];

          return (
            <div key={index} className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
                {!isEditMode && <span className="text-red-400 ml-0.5">*</span>}
              </Label>

              {(() => {
                if (fieldType === "select") {
                  return (
                    <Select
                      onValueChange={(val) => {
                        formik.setFieldValue(name, val);
                        formik.setFieldTouched(name, true, true);
                      }}
                      value={formik.values[name] || ""}
                    >
                      <SelectTrigger className={`dark:bg-neutral-800 dark:border-neutral-700 w-full transition-colors ${hasError ? "border-red-400 focus:ring-red-400" : ""}`}>
                        <SelectValue placeholder={item.placeholder || `Select ${item.label?.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {getDefaultOptions(item).map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }

                if (fieldType === "textarea") {
                  return (
                    <Textarea
                      name={name}
                      placeholder={item.placeholder || `Enter ${item.label?.toLowerCase()}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[name] || ""}
                      rows={4}
                      className={`resize-none dark:bg-neutral-800 dark:border-neutral-700 transition-colors ${hasError ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                    />
                  );
                }

                if (fieldType === "file") {
                  return (
                    <div className={`flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-neutral-800 cursor-pointer hover:border-blue-400 transition-colors ${hasError ? "border-red-400" : "border-gray-200 dark:border-neutral-700"}`}>
                      <label className="flex items-center gap-2 w-full cursor-pointer">
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-medium shrink-0">
                          Choose File
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {formik.values[name] || (item.placeholder || "Upload PDF, DOC, DOCX")}
                        </span>
                        <input
                          type="file"
                          name={name}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            formik.setFieldValue(name, file?.name || "");
                            formik.setFieldTouched(name, true, true);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  );
                }

                return (
                  <Input
                    type={fieldType}
                    name={name}
                    placeholder={item.placeholder || `Enter ${item.label?.toLowerCase()}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name] || ""}
                    className={`dark:bg-neutral-800 dark:border-neutral-700 transition-colors ${hasError ? "border-red-400 focus-visible:ring-red-400" : ""}`}
                  />
                );
              })()}

              {/* Inline error message */}
              {hasError && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{formik.errors[name] as string}</span>
                </div>
              )}
            </div>
          );
        })}

        {isEditMode ? (
          <Button
            type="submit"
            disabled={formik.isSubmitting || form.published}
            className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer disabled:opacity-60"
          >
            {formik.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
            {form.published ? "Already Published" : formik.isSubmitting ? "Publishing..." : "Publish Form"}
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            {formik.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {formik.isSubmitting ? "Submitting..." : "Submit Response"}
          </Button>
        )}
      </form>

      <FormPublishDialog formId={form.id} open={successDialogOpen} onOpenChange={setSuccessDialogOpen} />
    </div>
  );
};

export default AiGeneratedForm;
