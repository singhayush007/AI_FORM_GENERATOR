"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChartSpline, ClipboardList, Home, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { title: "Home", url: "/dashboard", icon: Home, exact: true },
  { title: "My Forms", url: "/dashboard/forms", icon: ClipboardList, exact: false },
  { title: "Analytics", url: "/dashboard/analytics", icon: ChartSpline, exact: false },
  { title: "Upgrade", url: "/dashboard/upgrade", icon: CreditCard, exact: false },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden shrink-0">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-neutral-950">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100 dark:border-neutral-800">
          <Link href="/" onClick={() => setOpen(false)}>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
              Formify.ai
            </span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 px-3 py-4">
          {sidebarItems.map((item) => {
            const isActive = item.exact ? pathname === item.url : pathname.startsWith(item.url);
            const Icon = item.icon;
            return (
              <Link
                key={item.url}
                href={item.url}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
                )}
              >
                <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400")} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-gray-100 dark:border-neutral-800">
          <p className="text-xs text-gray-400 dark:text-gray-600">Formify.ai &copy; {new Date().getFullYear()}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
