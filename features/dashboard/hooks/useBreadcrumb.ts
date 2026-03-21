"use client";
import { usePathname } from "next/navigation";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/forms": "My Forms",
  "/dashboard/analytics": "Analytics",
  "/dashboard/upgrade": "Upgrade Plan",
};

function resolveBreadcrumb(pathname: string): string {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];
  if (pathname.includes("/submissions")) return "Submissions";
  if (pathname.includes("/edit")) return "Edit Form";
  if (pathname.includes("/forms/")) return "Form Details";
  return "Dashboard";
}

/** Returns the human-readable breadcrumb label for the current route */
export function useBreadcrumb(): string {
  const pathname = usePathname();
  return resolveBreadcrumb(pathname);
}
