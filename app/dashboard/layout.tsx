import React from "react";
import Header from "@/components/Header";
import DashboardSidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-700 dark:text-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
