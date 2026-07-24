/**
 * Snippets an extra contributes to the base layout instead of overriding the
 * whole file, so two extras that both need to touch layout.tsx (e.g. pwa and
 * analytics) compose instead of one silently clobbering the other.
 */
export interface LayoutInjection {
  imports?: string[];
  exports?: string[];
  body?: string;
}

export interface ExtraDefinition {
  id: string;
  label: string;
  hint: string;
  layer: string;
  /** If set, this extra is forced off (never prompted) unless the named extra is also on. */
  dependsOn?: string;
  /** If set, this extra is forced off (never prompted) if the named extra is already on. Must appear after it in this list. */
  conflictsWith?: string;
  promptMessage: string;
  yesDefault: boolean;
  layoutInjection?: LayoutInjection;
}

export const EXTRAS = [
  {
    id: "supabase",
    label: "Supabase",
    hint: "client setup, session-refresh middleware",
    layer: "extras/supabase",
    promptMessage: "Include Supabase?",
    yesDefault: true,
  },
  {
    id: "auth",
    label: "Auth",
    hint: "email/password login, register, protected routes",
    layer: "extras/auth",
    dependsOn: "supabase",
    promptMessage: "Include email/password auth (login, register, protected routes)?",
    yesDefault: true,
  },
  {
    id: "authjs",
    label: "Auth.js (NextAuth)",
    hint: "GitHub OAuth, alternative to the Supabase auth extra",
    layer: "extras/authjs",
    conflictsWith: "auth",
    promptMessage: "Include Auth.js / NextAuth (GitHub OAuth, alternative to Supabase auth)?",
    yesDefault: false,
  },
  {
    id: "forms",
    label: "Forms",
    hint: "react-hook-form + zod example contact form",
    layer: "extras/forms",
    promptMessage: "Include a react-hook-form + zod example form?",
    yesDefault: false,
  },
  {
    id: "pwa",
    label: "PWA",
    hint: "manifest, service worker, icons",
    layer: "extras/pwa",
    promptMessage: "Set up as a PWA (manifest, service worker, placeholder icons)?",
    yesDefault: false,
    layoutInjection: {
      imports: [
        'import type { Viewport } from "next";',
        'import { RegisterServiceWorker } from "@/components/shared/register-service-worker";',
      ],
      exports: ['export const viewport: Viewport = {\n  themeColor: "#ffffff",\n};'],
      body: "<RegisterServiceWorker />",
    },
  },
  {
    id: "stripe",
    label: "Stripe",
    hint: "checkout session action, pricing page",
    layer: "extras/stripe",
    promptMessage: "Include Stripe (checkout + pricing page)?",
    yesDefault: false,
  },
  {
    id: "drizzle",
    label: "Drizzle",
    hint: "schema, db client, migrations config",
    layer: "extras/drizzle",
    dependsOn: "supabase",
    promptMessage: "Include Drizzle ORM (uses the Supabase connection string)?",
    yesDefault: false,
  },
  {
    id: "analytics",
    label: "Vercel Analytics",
    hint: "@vercel/analytics wired into the root layout",
    layer: "extras/analytics",
    promptMessage: "Include Vercel Analytics?",
    yesDefault: false,
    layoutInjection: {
      imports: ['import { Analytics } from "@vercel/analytics/next";'],
      body: "<Analytics />",
    },
  },
] as const satisfies readonly ExtraDefinition[];

export type ExtraId = (typeof EXTRAS)[number]["id"];
