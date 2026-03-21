import * as Yup from "yup";
import type { Fields } from "@/features/forms/types";

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

export const buildFieldValidator = (label: string, type: string): Yup.StringSchema => {
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
};
