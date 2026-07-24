import { Cta } from "@/components/shared/cta";
import { Features } from "@/components/shared/features";
import { Hero } from "@/components/shared/hero";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
