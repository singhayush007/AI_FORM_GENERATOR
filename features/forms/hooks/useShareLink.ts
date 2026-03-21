"use client";
import { useClipboard } from "@/features/forms/hooks/useClipboard";
import toast from "react-hot-toast";

/** Returns the shareable form URL and a copy-to-clipboard handler */
export function useShareLink(formId: number) {
  const shareLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/forms/${formId}`
      : `/forms/${formId}`;

  const { copy, copied } = useClipboard();

  const handleCopy = () => {
    copy(shareLink);
    toast.success("Link copied to clipboard!");
  };

  return { shareLink, handleCopy, copied };
}
