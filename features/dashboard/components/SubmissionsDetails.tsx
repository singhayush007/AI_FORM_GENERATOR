import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submission: { content: any };
  index: number;
};

const SubmissionsDetails: React.FC<Props> = ({ submission, index }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">Response - {index + 1}</h2>
      <div className="overflow-x-auto rounded-lg">
      <Table className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-w-[400px]">
        <TableHeader className="bg-gray-100 dark:bg-gray-800">
          <TableRow>
            <TableHead className="text-gray-900 dark:text-gray-100">Questions</TableHead>
            <TableHead className="text-gray-900 dark:text-gray-100">Answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white dark:bg-gray-900">
          {Object.entries(submission?.content).map(([key, value], idx: number) => (
            <TableRow key={idx} className="border-t border-gray-200 dark:border-gray-700">
              <TableCell className="text-gray-900 dark:text-gray-100">{key}</TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100">
                {Array.isArray(value) ? value.join(", ") : String(value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default SubmissionsDetails;
