export interface FrameworkDefinition {
  id: string;
  label: string;
  hint: string;
}

export const FRAMEWORKS = [
  { id: "nextjs", label: "Next.js", hint: "App Router, full-stack, all extras available" },
  { id: "astro", label: "Astro", hint: "content-focused, minimal client-side JS, no extras yet" },
] as const satisfies readonly FrameworkDefinition[];

export type FrameworkId = (typeof FRAMEWORKS)[number]["id"];

export const DEFAULT_FRAMEWORK: FrameworkId = "nextjs";
