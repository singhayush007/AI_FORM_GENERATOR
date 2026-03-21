import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GenerateFormInput from "@/features/forms/components/GenerateFormInput";
import { Plus } from "lucide-react";

type Props = {
  label?: string;
};

const CreateFormDialog: React.FC<Props> = ({ label = "Create New Form" }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
        <Plus className="h-4 w-4" />
        {label}
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[480px] dark:bg-neutral-900 dark:text-gray-100">
      <DialogHeader>
        <DialogTitle>Generate with AI</DialogTitle>
        <DialogDescription>
          Describe what kind of form you need and our AI will create it instantly.
        </DialogDescription>
      </DialogHeader>
      <GenerateFormInput />
    </DialogContent>
  </Dialog>
);

export default CreateFormDialog;
