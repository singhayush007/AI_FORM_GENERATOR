"use client";
import React from "react";
import Header from "@/components/Header";
import DashboardSidebar from "@/components/Sidebar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-700 dark:bg-black dark:text-white">
      {" "}
      {/* Sidebar */} <DashboardSidebar /> {/* Main content */}{" "}
      <div className="flex-1 flex flex-col">
        {" "}
        <Header /> <main className="p-6">{children}</main>{" "}
      </div>{" "}
    </div>
  );
};
export default DashboardLayout;




