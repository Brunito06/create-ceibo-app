import type { FrameworkId } from "./frameworks.js";

export interface TemplateDefinition {
  id: string;
  label: string;
  hint: string;
  framework: FrameworkId;
}

export const TEMPLATES = [
  { id: "landing", label: "Landing page", hint: "hero, features, CTA, footer", framework: "nextjs" },
  { id: "dashboard", label: "Dashboard", hint: "sidebar, header, example pages", framework: "nextjs" },
  { id: "blank", label: "Blank", hint: "minimal structure", framework: "nextjs" },
  {
    id: "blog",
    label: "Blog",
    hint: "post list + post detail, static sample content",
    framework: "nextjs",
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    hint: "product grid, product detail, cart",
    framework: "nextjs",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    hint: "single-page: projects, experience, contact",
    framework: "nextjs",
  },
  {
    id: "waitlist",
    label: "Waitlist / Coming soon",
    hint: "email capture form, no backend wired by default",
    framework: "nextjs",
  },
  {
    id: "docs",
    label: "Docs site",
    hint: "sidebar navigation + static content pages",
    framework: "nextjs",
  },
  {
    id: "admin",
    label: "Admin / CRM",
    hint: "searchable, sortable customers table",
    framework: "nextjs",
  },
  {
    id: "astro-blank",
    label: "Blank",
    hint: "minimal structure",
    framework: "astro",
  },
  {
    id: "astro-blog",
    label: "Blog",
    hint: "post list + post detail via Astro content collections",
    framework: "astro",
  },
] as const satisfies readonly TemplateDefinition[];

export type Template = (typeof TEMPLATES)[number]["id"];

export const DEFAULT_TEMPLATE: Template = "dashboard";
