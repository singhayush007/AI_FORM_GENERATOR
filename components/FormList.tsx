"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Edit2, Trash2, Users, Globe, Lock, Eye, Loader2 } from "lucide-react";
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
  const [deleting, setDeleting] = useState(false);

  const deleteFormHandler = async () => {
    setDeleting(true);
    const data = await deleteForm(form.id);
    setDeleting(false);
    if (data.success) toast.success(data.message);
    else toast.error(data.message);
  };

  return (
    <Card className="w-full max-w-[380px] bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 flex flex-col justify-between group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate leading-snug">
            {form.content.formTitle || "Untitled Form"}
          </CardTitle>
          <Badge
            className={
              form.published
                ? "shrink-0 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0"
                : "shrink-0 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-0"
            }
          >
            {form.published ? (
              <><Globe className="w-3 h-3 mr-1" />Live</>
            ) : (
              <><Lock className="w-3 h-3 mr-1" />Draft</>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-0">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{form.submissions} submission{form.submissions !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-4 mt-2 border-t border-gray-100 dark:border-neutral-800">
        <Link href={`/dashboard/forms/${form.id}/submissions`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer gap-1.5 text-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            Responses
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-400 cursor-pointer text-xs transition-colors"
            onClick={() => router.push(`/dashboard/forms/edit/${form.id}`)}
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={deleting}
                className="gap-1.5 bg-red-500 hover:bg-red-600 text-white cursor-pointer text-xs transition-colors"
              >
                {deleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this form?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete &ldquo;{form.content.formTitle || "Untitled Form"}&rdquo; and all its submissions. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={deleteFormHandler}
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                >
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormList;
