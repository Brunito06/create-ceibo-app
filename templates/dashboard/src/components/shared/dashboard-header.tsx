"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { DashboardSidebarNav } from "@/components/shared/dashboard-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function DashboardHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileNavOpen(true)}
      >
        <MenuIcon />
        <span className="sr-only">Open navigation</span>
      </Button>

      <div className="flex-1" />

      <ThemeToggle />

      <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <DialogContent className="top-0 left-0 max-w-none translate-x-0 translate-y-0 rounded-none p-0 sm:max-w-xs">
          <DialogTitle className="px-4 pt-4">__APP_TITLE__</DialogTitle>
          <DashboardSidebarNav onNavigate={() => setMobileNavOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
