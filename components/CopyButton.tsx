"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";

type Props = {
  /** Pass a full URL, or a relative path like /forms/123 — it will be resolved against current origin */
  text: string;
  className?: string;
};

const CopyButton: React.FC<Props> = ({ text, className }) => {
  const [copied, setCopied] = useState(false);

  const resolvedText =
    text.startsWith("/") && typeof window !== "undefined"
      ? `${window.location.origin}${text}`
      : text;

  const handleCopy = () => {
    navigator.clipboard.writeText(resolvedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className={`cursor-pointer shrink-0 gap-1.5 transition-all ${className}`}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy
        </>
      )}
    </Button>
  );
};

export default CopyButton;
