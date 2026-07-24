import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          __APP_TITLE__
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
