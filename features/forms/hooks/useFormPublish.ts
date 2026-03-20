"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { publishForm } from "@/actions/publishForm";

export function useFormPublish(formId: number) {
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    const result = await publishForm(formId);
    setLoading(false);
    if (result?.success) {
      setSuccessDialogOpen(true);
    } else {
      toast.error(result?.message || "Failed to publish form");
    }
  };

  return { loading, successDialogOpen, setSuccessDialogOpen, handlePublish };
}
