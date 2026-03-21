"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick?: () => void;
};

const NavItem: React.FC<Props> = ({ title, url, icon: Icon, isActive, onClick }) => (
  <Link
    href={url}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
      isActive
        ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-gray-100"
    )}
  >
    <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500")} />
    {title}
  </Link>
);

export default NavItem;
