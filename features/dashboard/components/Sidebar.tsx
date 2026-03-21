"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NAV_ITEMS } from "@/features/dashboard/constants/navItems";
import NavItem from "@/features/dashboard/components/NavItem";

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 min-h-screen">
      <div className="px-5 py-5 border-b border-gray-100 dark:border-neutral-800">
        <Link href="/">
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 cursor-pointer">
            Formify.ai
          </span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact ? pathname === item.url : pathname.startsWith(item.url);
          return <NavItem key={item.url} {...item} isActive={isActive} />;
        })}
      </nav>

      <div className="px-5 py-4 border-t border-gray-100 dark:border-neutral-800">
        <p className="text-xs text-gray-400 dark:text-gray-600">Formify.ai &copy; {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
