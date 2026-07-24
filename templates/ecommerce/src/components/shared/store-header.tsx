"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export function StoreHeader() {
  const { count } = useCart();

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          __APP_TITLE__
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="relative">
            <Link href="/cart">
              <ShoppingCartIcon />
              Cart
              {count > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full text-xs">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
