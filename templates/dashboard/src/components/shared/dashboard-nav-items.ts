import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Settings } from "lucide-react";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Settings", href: "/settings", icon: Settings },
];
