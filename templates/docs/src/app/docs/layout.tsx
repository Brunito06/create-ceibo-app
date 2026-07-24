import type { ReactNode } from "react";

import { DocsSidebar } from "@/components/shared/docs-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-5xl gap-8 px-6 py-10">
      <DocsSidebar />
      <main className="min-w-0 flex-1">
        <div className="mb-6 flex justify-end">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
