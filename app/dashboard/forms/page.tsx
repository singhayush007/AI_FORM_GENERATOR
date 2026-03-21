import { getForms } from "@/features/forms/actions/getForms";
import FormList from "@/features/forms/components/FormList";
import GenerateFormInput from "@/features/forms/components/GenerateFormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, LayoutList, Plus } from "lucide-react";
import React from "react";

const FormsPage = async () => {
  const forms = await getForms();
  const count = forms?.data?.length ?? 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-gray-100 dark:border-neutral-800 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            <LayoutList className="w-3 h-3" />
            {count} form{count !== 1 ? "s" : ""} created
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 dark:from-gray-100 dark:via-blue-300 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
          My Forms
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
          Manage all your AI-generated forms here.{" "}
          <span className="text-gray-700 dark:text-gray-300 font-medium">Publish, edit, and track submissions easily.</span>
        </p>
        <div className="mt-5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
