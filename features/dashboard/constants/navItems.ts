import { ChartSpline, ClipboardList, Home, CreditCard } from "lucide-react";

export const NAV_ITEMS = [
  { title: "Home", url: "/dashboard", icon: Home, exact: true },
  { title: "My Forms", url: "/dashboard/forms", icon: ClipboardList, exact: false },
  { title: "Analytics", url: "/dashboard/analytics", icon: ChartSpline, exact: false },
  { title: "Upgrade", url: "/dashboard/upgrade", icon: CreditCard, exact: false },
] as const;
