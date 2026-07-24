"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DASHBOARD_NAV_ITEMS } from "@/components/shared/dashboard-nav-items";
import { cn } from "@/lib/utils";

export function DashboardSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4">
      {DASHBOARD_NAV_ITEMS.map(({ title, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="size-4" />
            {title}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar() {
  return (
    <aside className="border-border/40 hidden w-56 shrink-0 border-r md:flex md:flex-col">
      <div className="flex h-16 items-center px-4 font-semibold tracking-tight">
        __APP_TITLE__
      </div>
      <DashboardSidebarNav />
    </aside>
  );
}
