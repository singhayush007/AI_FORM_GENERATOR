"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Lock, Sparkles } from "lucide-react";
import { generateForm } from "@/actions/generatorForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MAX_FREE_FORM } from "@/lib/utils";

type Props = {
  text?: string;
  totalForms?: number;
  isSubscribed?: boolean;
};

const GenerateFormInput: React.FC<Props> = ({
  text,
  totalForms = 0,
  isSubscribed = true,
}) => {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => setDescription(text || ""), [text]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("description", description);

    const result = await generateForm(null, formData);

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      // Clear input
      setDescription("");
      // Redirect to edit page
      router.push(`/dashboard/forms/edit/${result.data.id}`);
    } else {
      toast.error(result.message || "Error generating form");
    }
  };

  const canGenerate = isSubscribed && totalForms <= MAX_FREE_FORM;

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 my-8">
      <Input
        id="description"
        name="description"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        type="text"
        placeholder="Write a prompt to generate form..."
        required
      />
      {canGenerate ? (
        <Button
          type="submit"
          disabled={loading}
          className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Sparkles className="mr-2" />
          {loading ? "Generating..." : "Generate Form"}
        </Button>
      ) : (
        <Button
          disabled
          className="h-12 flex items-center gap-2 bg-gray-400 cursor-not-allowed hover:bg-gray-400"
        >
          <Lock />
          Upgrade Plan
        </Button>
      )}
    </form>
  );
};

export default GenerateFormInput;
