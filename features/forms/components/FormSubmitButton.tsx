import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Globe } from "lucide-react";

type Props = {
  isEditMode: boolean;
  isSubmitting: boolean;
  published: boolean;
};

const FormSubmitButton: React.FC<Props> = ({ isEditMode, isSubmitting, published }) => {
  if (isEditMode) {
    return (
      <Button
        type="submit"
        disabled={isSubmitting || published}
        className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
        {published ? "Already Published" : isSubmitting ? "Publishing..." : "Publish Form"}
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
    >
      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
      {isSubmitting ? "Submitting..." : "Submit Response"}
    </Button>
  );
};

export default FormSubmitButton;
