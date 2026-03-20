"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/features/forms/hooks/useClipboard";
import toast from "react-hot-toast";

type Props = {
  formId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FormPublishDialog: React.FC<Props> = ({ formId, open, onOpenChange }) => {
  const shareLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/forms/${formId}`
      : `/forms/${formId}`;

  const { copy } = useClipboard();

  const handleCopy = () => {
    copy(shareLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            🎉 Form Published Successfully!
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Your form is live. Share the link below to start collecting responses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
            <LinkIcon className="w-4 h-4 text-blue-500 shrink-0" />
            <Input
              readOnly
              className="border-0 bg-transparent text-blue-700 dark:text-blue-300 text-sm font-mono p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
              value={shareLink}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCopy} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              Copy Link
            </Button>
            <Button variant="outline" className="flex-1 cursor-pointer" onClick={() => window.open(shareLink, "_blank")}>
              Open Form
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormPublishDialog;
