"use client";
import React from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

type Props = {
  formTitle: string;
  deleting: boolean;
  onConfirm: () => void;
};

const DeleteFormDialog: React.FC<Props> = ({ formTitle, deleting, onConfirm }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        variant="destructive"
        size="sm"
        disabled={deleting}
        className="gap-1.5 bg-red-500 hover:bg-red-600 text-white cursor-pointer text-xs transition-colors"
      >
        {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
        Delete
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete this form?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete &ldquo;{formTitle}&rdquo; and all its submissions. This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
        >
          Yes, delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteFormDialog;
