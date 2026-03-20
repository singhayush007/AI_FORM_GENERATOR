"use client";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useClipboard } from "@/features/forms/hooks/useClipboard";

type Props = {
  text: string;
  className?: string;
};

const CopyButton: React.FC<Props> = ({ text, className }) => {
  const { copied, copy } = useClipboard();

  return (
    <Button
      size="sm"
      variant="outline"
      className={`cursor-pointer shrink-0 gap-1.5 transition-all ${className}`}
      onClick={() => copy(text)}
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
