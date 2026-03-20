import { getForms } from "@/actions/getForms";
import FormList from "@/features/forms/components/FormList";
import GenerateFormInput from "@/components/GenerateFormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, Plus } from "lucide-react";
import React from "react";

const FormsPage = async () => {
  const forms = await getForms();
  const count = forms?.data?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Forms</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {count} form{count !== 1 ? "s" : ""} created
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              <Plus className="h-4 w-4" />
              Create New Form
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
      </div>

      {/* Forms Grid */}
      {count === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-gray-300 dark:border-neutral-700 rounded-2xl text-center">
          <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
            No forms yet
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs mb-5">
            Create your first AI-powered form and start collecting responses in minutes.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                <Plus className="h-4 w-4" />
                Create First Form
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
        </div>
      ) : (
        <div className="flex flex-wrap gap-5">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {forms?.data?.map((form: any) => (
            <FormList key={form.id} form={form} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsPage;
