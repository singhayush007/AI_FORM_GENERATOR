import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  sub: string;
};

const MetricCard: React.FC<Props> = ({ title, value, icon: Icon, color, bg, border, sub }) => (
  <Card className={`border ${border} bg-white dark:bg-neutral-900`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </CardTitle>
      <div className={`p-2 rounded-lg ${bg}`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
    </CardContent>
  </Card>
);

export default MetricCard;
