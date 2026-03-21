"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/features/dashboard/constants/navItems";
import NavItem from "@/features/dashboard/components/NavItem";

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

        <div className="px-5 py-5 border-b border-gray-100 dark:border-neutral-800">
          <Link href="/" onClick={() => setOpen(false)}>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
              Formify.ai
            </span>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? pathname === item.url : pathname.startsWith(item.url);
            return (
              <NavItem
                key={item.url}
                {...item}
                isActive={isActive}
                onClick={() => setOpen(false)}
              />
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
