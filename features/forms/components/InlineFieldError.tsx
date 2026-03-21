import React from "react";
import { AlertCircle } from "lucide-react";

type Props = { message: string };

const InlineFieldError: React.FC<Props> = ({ message }) => (
  <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
    <span>{message}</span>
  </div>
);

export default InlineFieldError;
