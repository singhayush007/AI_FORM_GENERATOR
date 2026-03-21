import React from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock } from "lucide-react";

type Props = { published: boolean };

const FormStatusBadge: React.FC<Props> = ({ published }) => (
  <Badge
    className={
      published
        ? "shrink-0 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0"
        : "shrink-0 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 border-0"
    }
  >
    {published ? (
      <><Globe className="w-3 h-3 mr-1" />Live</>
    ) : (
      <><Lock className="w-3 h-3 mr-1" />Draft</>
    )}
  </Badge>
);

export default FormStatusBadge;
