"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import DarkMode from "@/components/DarkMode";
import { usePathname } from "next/navigation";

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/forms": "My Forms",
  "/dashboard/analytics": "Analytics",
  "/dashboard/upgrade": "Upgrade Plan",
};

function getBreadcrumb(pathname: string): string {
  if (routeLabels[pathname]) return routeLabels[pathname];
  if (pathname.includes("/submissions")) return "Submissions";
  if (pathname.includes("/edit")) return "Edit Form";
  if (pathname.includes("/forms/")) return "Form Details";
  return "Dashboard";
}

const Header = () => {
  const pathname = usePathname();
  const label = getBreadcrumb(pathname);

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800">
      <div>
        <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">{label}</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500">Manage your forms and data</p>
      </div>
      <div className="flex items-center gap-3">
        <DarkMode />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

export default Header;
