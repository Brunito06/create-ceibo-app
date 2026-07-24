import { Rocket, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Rocket,
    title: "Fast by default",
    description: "App Router, Turbopack dev server and a Tailwind v4 setup ready to ship.",
  },
  {
    icon: ShieldCheck,
    title: "Typed end to end",
    description: "Strict TypeScript, ESLint and Prettier configured and kept in sync.",
  },
  {
    icon: Sparkles,
    title: "Consistent UI",
    description: "shadcn/ui primitives with dark mode baked in from the first commit.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="text-primary mb-2 size-6" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </section>
  );
}
