"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  ChartSpline,
  ClipboardList,
  Home,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { title: "Home", url: "/dashboard", icon: Home, exact: true },
  { title: "My Forms", url: "/dashboard/forms", icon: ClipboardList, exact: false },
  { title: "Analytics", url: "/dashboard/analytics", icon: ChartSpline, exact: false },
  { title: "Upgrade", url: "/dashboard/upgrade", icon: CreditCard, exact: false },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 dark:border-neutral-800">
        <Link href="/">
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 cursor-pointer">
            Formify.ai
          </span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {sidebarItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.url
            : pathname.startsWith(item.url);
          const Icon = item.icon;
          return (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                )}
              />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Bottom hint */}
      <div className="px-5 py-4 border-t border-gray-100 dark:border-neutral-800">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Formify.ai &copy; {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
