import React from "react";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, Loader2 } from "lucide-react";

type Props = {
  isHero: boolean;
  isSubmitting: boolean;
  canGenerate: boolean;
};

const GenerateButton: React.FC<Props> = ({ isHero, isSubmitting, canGenerate }) => {
  if (!canGenerate) {
    return (
      <Button
        disabled
        className="h-11 px-5 flex items-center gap-2 bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl shrink-0"
      >
        <Lock className="w-4 h-4" />
        Upgrade
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className={`h-11 px-5 cursor-pointer transition-all flex items-center gap-2 font-semibold rounded-xl shrink-0 ${
        isHero
          ? "bg-white text-blue-700 hover:bg-blue-50"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {isSubmitting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      {isSubmitting ? "Generating..." : "Generate"}
    </Button>
  );
};

export default GenerateButton;
