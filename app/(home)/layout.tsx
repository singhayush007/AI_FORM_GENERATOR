import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import DarkMode from "@/components/DarkMode";
import React from "react";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="border-b">
        {/* Navbar  */}
        <nav className="flex items-center justify-between max-w-7xl mx-auto py-2">
          <Logo />
          <div className="flex items-center gap-2">
            <DarkMode />
            <Link href="/dashboard">
              <span className="text-lg font-bold cursor-pointer hover:text-blue-500">
                Dashboard
              </span>
            </Link>

            <UserButton />
          </div>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default layout;



