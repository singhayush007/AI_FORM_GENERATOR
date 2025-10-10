"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Form } from "@/types/form";
import { deleteForm } from "@/actions/deleteForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  form: Form;
};

const FormList: React.FC<Props> = ({ form }) => {
  const router = useRouter();

  const deleteFormHandler = async (formId: number) => {
    const data = await deleteForm(formId);
    if (data.success) toast.success(data.message);
    else toast.error(data.message);
  };

  return (
    <Card
      className="
        w-full 
        max-w-[400px]
        bg-white dark:bg-neutral-900
        border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-sm
        hover:shadow-xl hover:scale-[1.02]
        transition-all duration-300 ease-in-out
        flex flex-col justify-between
      "
    >
      <div>
        <CardHeader className="space-y-2">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
            {form.content.formTitle || "Untitled Form"}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
            Manage and track your form submissions easily.
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-2">
          <Link href={`/dashboard/forms/${form.id}/submissions`}>
            <Button
              variant="link"
              className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline"
            >
              Submissions – {form.submissions}
            </Button>
          </Link>
        </CardContent>
      </div>

      <CardFooter className="flex justify-between items-center mt-4 gap-3 p-4 pt-0">
        <Button
          variant="outline"
          className="
            flex items-center gap-2
            hover:bg-blue-100 dark:hover:bg-blue-900
            cursor-pointer transition-all duration-200
          "
          onClick={() => router.push(`/dashboard/forms/edit/${form.id}`)}
        >
          <Edit2 size={16} />
          Edit
        </Button>
        <Button
          variant="destructive"
          className="
            flex items-center gap-2
            bg-red-600 hover:bg-red-700
            text-white cursor-pointer
            transition-all duration-200
          "
          onClick={() => deleteFormHandler(form.id)}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormList;
