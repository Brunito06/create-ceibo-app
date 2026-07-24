"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DOC_SECTIONS } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 space-y-6">
      {DOC_SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
            {section.title}
          </p>
          <ul className="space-y-1">
            {section.pages.map((page) => {
              const href = `/docs/${page.slug}`;
              const active = pathname === href;
              return (
                <li key={page.slug}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-md px-2 py-1 text-sm",
                      active
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
