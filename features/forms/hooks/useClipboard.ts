"use client";

import { useState } from "react";

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    const resolvedText =
      text.startsWith("/") && typeof window !== "undefined"
        ? `${window.location.origin}${text}`
        : text;

    navigator.clipboard.writeText(resolvedText);
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  };

  return { copied, copy };
}
