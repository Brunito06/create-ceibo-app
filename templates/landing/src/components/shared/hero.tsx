import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        __APP_TITLE__
      </h1>
      <p className="text-muted-foreground max-w-xl text-lg text-balance">
        A crisp, no-nonsense starting point. Replace this copy with what you actually do — the
        rest of the page is already wired up.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" asChild>
          <Link href="#cta">Get started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#features">See features</Link>
        </Button>
      </div>
    </section>
  );
}
