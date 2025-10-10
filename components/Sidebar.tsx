"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChartSpline, ClipboardList } from "lucide-react";
import { useTheme } from "next-themes";

const sidebarItems = [
  { title: "Analytics", url: "/dashboard/analytics", icon: <ChartSpline /> },
  { title: "My Forms", url: "/dashboard/forms", icon: <ClipboardList /> },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <aside
      className={`w-60 p-4 flex-shrink-0 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-neutral-900 text-gray-200"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Logo */}
      <Link href="/">
        <h2
          className="text-2xl font-extrabold mb-4 cursor-pointer
                     bg-clip-text text-transparent
                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                     hover:scale-105 transition-transform duration-300"
        >
          Formify.ai
        </h2>
      </Link>

      {/* Sidebar Items */}
      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item, index) => {
          const isActive = pathname?.startsWith(item.url);
          return (
            <Link
              key={index}
              href={item.url}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                isActive
                  ? theme === "dark"
                    ? "bg-gray-800 text-white font-semibold shadow-inner hover:brightness-110"
                    : "bg-gray-100 text-gray-800 font-semibold shadow-sm hover:brightness-105"
                  : theme === "dark"
                  ? "text-gray-200 hover:bg-gray-700 hover:text-white hover:brightness-105"
                  : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 hover:brightness-105"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
