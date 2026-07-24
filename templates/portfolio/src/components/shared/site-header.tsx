import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          __APP_TITLE__
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="#projects">Projects</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#experience">Experience</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
