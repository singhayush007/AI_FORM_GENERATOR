import { getForms } from "@/actions/getForms";
import FormList from "@/components/FormList";
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
import { Plus } from "lucide-react";
import React from "react";

const FormsPage = async () => {
  const forms = await getForms();

  return (
    <div className="p-6 space-y-6 bg-gray-50 text-gray-800 dark:bg-black dark:text-gray-100 min-h-screen transition-colors duration-500">
      {/* Header Section */}
      <section className="flex items-center justify-between max-w-7xl mx-auto mb-4">
        <h1 className="font-bold text-xl">My Forms</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Create New Form
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle>Write a prompt</DialogTitle>
              <DialogDescription>
                Write a clean prompt to get better results.
              </DialogDescription>
            </DialogHeader>
            <GenerateFormInput />
          </DialogContent>
        </Dialog>
      </section>

      {/* Forms List Section */}
      <div className="flex flex-wrap gap-6 justify-center px-4 py-4 max-w-full overflow-hidden">
        {forms?.data?.map((form: any) => (
          <FormList key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
};

export default FormsPage;
