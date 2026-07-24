export interface TemplateDefinition {
  id: string;
  label: string;
  hint: string;
}

export const TEMPLATES = [
  { id: "landing", label: "Landing page", hint: "hero, features, CTA, footer" },
  { id: "dashboard", label: "Dashboard", hint: "sidebar, header, example pages" },
  { id: "blank", label: "Blank", hint: "minimal structure" },
  { id: "blog", label: "Blog", hint: "post list + post detail, static sample content" },
  { id: "ecommerce", label: "Ecommerce", hint: "product grid, product detail, cart" },
] as const satisfies readonly TemplateDefinition[];

export type Template = (typeof TEMPLATES)[number]["id"];

export const DEFAULT_TEMPLATE: Template = "dashboard";
