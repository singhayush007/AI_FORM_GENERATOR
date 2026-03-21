import React from "react";

type Props = {
  name: string;
  value: string;
  placeholder?: string;
  hasError: boolean;
  onFileChange: (fileName: string) => void;
};

const FileUploadField: React.FC<Props> = ({ name, value, placeholder, hasError, onFileChange }) => (
  <div className={`flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-neutral-800 cursor-pointer hover:border-blue-400 transition-colors ${hasError ? "border-red-400" : "border-gray-200 dark:border-neutral-700"}`}>
    <label className="flex items-center gap-2 w-full cursor-pointer">
      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded font-medium shrink-0">
        Choose File
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
        {value || placeholder || "Upload PDF, DOC, DOCX"}
      </span>
      <input
        type="file"
        name={name}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0];
          onFileChange(file?.name || "");
        }}
        className="hidden"
      />
    </label>
  </div>
);

export default FileUploadField;
