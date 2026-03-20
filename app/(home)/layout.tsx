import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import DarkMode from "@/components/DarkMode";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Link from "next/link";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 py-3">
          <Logo />

          <div className="flex items-center gap-3">
            <DarkMode />

            {user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer font-medium border-gray-300 dark:border-neutral-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    Get started free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {children}
    </div>
  );
};

export default layout;
