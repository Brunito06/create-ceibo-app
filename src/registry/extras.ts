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
    hint: "schema, db client, migrations config — any Postgres provider",
    layer: "extras/drizzle",
    promptMessage: "Include Drizzle ORM (works with any Postgres connection string)?",
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
  {
    id: "testing",
    label: "Testing",
    hint: "Vitest + React Testing Library, example component test",
    layer: "extras/testing",
    promptMessage: "Include a component testing setup (Vitest + Testing Library)?",
    yesDefault: false,
  },
  {
    id: "i18n",
    label: "i18n",
    hint: "next-intl, cookie-based locale, server-translated demo page",
    layer: "extras/i18n",
    promptMessage: "Include i18n (next-intl)?",
    yesDefault: false,
  },
  {
    id: "email",
    label: "Email (Resend)",
    hint: "transactional email, working send action + demo form",
    layer: "extras/email",
    promptMessage: "Include transactional email (Resend)?",
    yesDefault: false,
  },
  {
    id: "sentry",
    label: "Sentry",
    hint: "client-side error tracking",
    layer: "extras/sentry",
    promptMessage: "Include Sentry error tracking (client-side)?",
    yesDefault: false,
    layoutInjection: {
      imports: ['import { SentryInit } from "@/components/shared/sentry-init";'],
      body: "<SentryInit />",
    },
  },
] as const satisfies readonly ExtraDefinition[];

export type ExtraId = (typeof EXTRAS)[number]["id"];
