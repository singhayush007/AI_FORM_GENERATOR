"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Users, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteForm } from "@/features/forms/actions/deleteForm";
import toast from "react-hot-toast";
import FormStatusBadge from "@/features/forms/components/FormStatusBadge";
import DeleteFormDialog from "@/features/forms/components/DeleteFormDialog";
import type { Form } from "@/features/forms/types";

type Props = { form: Form };

const FormList: React.FC<Props> = ({ form }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const data = await deleteForm(form.id);
    setDeleting(false);
    if (data.success) toast.success(data.message);
    else toast.error(data.message);
  };

  const formTitle = form.content.formTitle || "Untitled Form";

  return (
    <Card className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 flex flex-col justify-between group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate leading-snug">
            {formTitle}
          </CardTitle>
          <FormStatusBadge published={form.published} />
        </div>
      </CardHeader>

      <CardContent className="py-0">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span>{form.submissions} submission{form.submissions !== 1 ? "s" : ""}</span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-4 mt-2 border-t border-gray-100 dark:border-neutral-800">
        <Link href={`/dashboard/forms/${form.id}/submissions`}>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer gap-1.5 text-xs">
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
          <DeleteFormDialog formTitle={formTitle} deleting={deleting} onConfirm={handleDelete} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormList;
