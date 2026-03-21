"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUploadField from "@/features/forms/components/FileUploadField";
import { getDefaultOptions } from "@/features/forms/utils/fieldHelpers";
import type { Fields } from "@/features/forms/types";

type Props = {
  item: Fields;
  name: string;
  fieldType: string;
  value: string;
  hasError: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSelectChange: (val: string) => void;
  onFileChange: (fileName: string) => void;
};

const FormFieldInput: React.FC<Props> = ({
  item, name, fieldType, value, hasError,
  onChange, onBlur, onSelectChange, onFileChange,
}) => {
  const errorClass = hasError ? "border-red-400 focus-visible:ring-red-400" : "";

  if (fieldType === "select") {
    return (
      <Select onValueChange={onSelectChange} value={value || ""}>
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
        onChange={onChange}
        onBlur={onBlur}
        value={value || ""}
        rows={4}
        className={`resize-none dark:bg-neutral-800 dark:border-neutral-700 transition-colors ${errorClass}`}
      />
    );
  }

  if (fieldType === "file") {
    return (
      <FileUploadField
        name={name}
        value={value}
        placeholder={item.placeholder}
        hasError={hasError}
        onFileChange={onFileChange}
      />
    );
  }

  return (
    <Input
      type={fieldType}
      name={name}
      placeholder={item.placeholder || `Enter ${item.label?.toLowerCase()}`}
      onChange={onChange}
      onBlur={onBlur}
      value={value || ""}
      className={`dark:bg-neutral-800 dark:border-neutral-700 transition-colors ${errorClass}`}
    />
  );
};

export default FormFieldInput;
