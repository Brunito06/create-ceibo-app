# create-ceibo-app

Scaffold a new **Next.js + Supabase + Tailwind CSS + shadcn/ui** project, pre-wired with [Brunito06](https://github.com/Brunito06)'s conventions, in one command.

```bash
npx create-ceibo-app my-app
```

No manual `shadcn init`, no wiring up dark mode, no copy-pasting a Supabase client — you get a working app, ready to `npm run dev`.

## Demo

<!-- TODO(bruno): record a GIF of `npx create-ceibo-app` running end to end and embed it here, e.g.:
![create-ceibo-app demo](./docs/demo.gif) -->

## Installation & usage

You don't need to install anything globally — run it with your package manager of choice:

```bash
npx create-ceibo-app my-app
# or
pnpm create ceibo-app my-app
```

Answer the prompts (framework, template, extras, author, description, license, package manager) and you're done. Prefer a one-liner? Pass everything as flags instead:

```bash
npx create-ceibo-app my-app --template dashboard --supabase --auth --pwa --pm pnpm
```

### Flags

| Flag                    | Description                                              | Default                    |
| ------------------------ | ---------------------------------------------------------- | ---------------------------- |
| `[project-name]`         | Project name / target directory. Prompted if omitted.      | —                             |
| `-f, --framework <name>` | `nextjs` \| `astro` \| `vite-react`                          | prompted                     |
| `-t, --template <name>`  | Depends on `--framework` — see the tables below             | prompted                     |
| `--supabase`             | Include Supabase client setup (Next.js only)                | prompted                     |
| `--no-supabase`          | Skip Supabase                                               | —                             |
| `--auth`                 | Include email/password auth (requires Supabase)            | prompted                     |
| `--no-auth`              | Skip auth                                                   | —                             |
| `--authjs`               | Include Auth.js/NextAuth GitHub OAuth (conflicts with `--auth`) | prompted                 |
| `--no-authjs`            | Skip Auth.js                                                | —                             |
| `--forms`                | Include a react-hook-form + zod example contact form        | prompted                     |
| `--no-forms`             | Skip the forms extra                                        | —                             |
| `--pwa`                  | Configure as a PWA (manifest, service worker, icons)        | prompted                     |
| `--no-pwa`               | Skip PWA setup                                              | —                             |
| `--stripe`               | Include Stripe checkout + pricing page                      | prompted                     |
| `--no-stripe`            | Skip Stripe                                                  | —                             |
| `--drizzle`              | Include Drizzle ORM (any Postgres provider)                  | prompted                     |
| `--no-drizzle`           | Skip Drizzle                                                 | —                             |
| `--analytics`            | Include Vercel Analytics                                    | prompted                     |
| `--no-analytics`         | Skip Vercel Analytics                                       | —                             |
| `--testing`              | Include a component testing setup (Vitest + Testing Library) | prompted                    |
| `--no-testing`           | Skip the testing setup                                      | —                             |
| `--i18n`                 | Include i18n (next-intl)                                    | prompted                     |
| `--no-i18n`              | Skip i18n                                                    | —                             |
| `--email`                | Include transactional email (Resend)                        | prompted                     |
| `--no-email`             | Skip the email extra                                         | —                             |
| `--sentry`               | Include Sentry error tracking (client-side)                  | prompted                     |
| `--no-sentry`            | Skip Sentry                                                  | —                             |
| `--author <name>`        | Author name, written to `package.json` and `LICENSE`        | prompted (from `git config user.name` if available) |
| `--description <text>`   | Short project description, written to `package.json`        | prompted                     |
| `--license <id>`         | `MIT` \| `Apache-2.0` \| `None`                              | prompted                     |
| `--pm <manager>`         | `npm` \| `pnpm`                                             | detected from how you ran it |
| `--config <path>`        | Load defaults from a previously saved `ceibo.config.json`   | —                             |
| `--no-save-config`       | Don't write `ceibo.config.json` into the generated project  | —                             |
| `--skip-install`         | Don't run the package manager install step                 | `false`                       |
| `--no-git`               | Don't run `git init` / initial commit                      | —                             |
| `-y, --yes`              | Use defaults for anything not passed as a flag              | `false`                       |

With `--yes`, unset options default to: `nextjs` framework, `dashboard` template, Supabase **on**, auth **on**, everything else **off**, MIT license.

An explicit `--template` pins the framework automatically (e.g. `--template astro-blog` implies `--framework astro`) — passing a conflicting `--framework`/`--template` pair is an error.

## What each template includes

### Next.js (`--framework nextjs`, the default)

Every Next.js project gets the same foundation regardless of template:

- Next.js 15 (App Router), TypeScript in strict mode, `src/` directory.
- Tailwind CSS v4 + shadcn/ui (`new-york` style), with `button`, `card`, `input`, `label`, `dialog`, `dropdown-menu` and `sonner` (toasts) already installed.
- Dark mode via `next-themes`, with a toggle wired into the UI.
- Inter, loaded via `next/font`.
- ESLint + Prettier, configured to agree with each other.
- A real, project-specific `CLAUDE.md` and `README.md` — not boilerplate placeholders.
- A `LICENSE` file (unless you pick `--license None`) and `author`/`description`/`license` filled in on `package.json`.

| Template    | Adds                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `landing`    | Marketing home page: header, hero, features grid, call-to-action, footer. |
| `dashboard`  | App shell: responsive sidebar + header, an example dashboard page and a settings page. |
| `blank`      | The shared foundation only — a single minimal page.                     |
| `blog`       | Post list + post detail pages, backed by a static sample array (no CMS/MDX). |
| `ecommerce`  | Product grid, product detail, and a cart page backed by a `localStorage` cart hook. |
| `portfolio`  | Single-page site: hero, projects grid, experience timeline, contact.    |
| `waitlist`   | Email-capture landing page with a working Server Action (no email/DB provider wired up by default). |
| `docs`       | Sidebar navigation + content pages, defined as a plain array (no MDX).  |
| `admin`      | A searchable, sortable customers table over mock data.                 |

| Extra         | Adds                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `--supabase`  | `src/lib/supabase/{client,server,middleware}.ts`, session-refresh middleware, `.env.example`. |
| `--auth`      | Login/register pages, a protected `/profile` page, and route-protection middleware (requires `--supabase`). |
| `--authjs`    | GitHub OAuth via Auth.js/NextAuth, a protected `/authjs-demo` page (conflicts with `--auth` — pick one). |
| `--forms`     | A `/contact` page using react-hook-form + zod, ready to reuse for other forms. |
| `--pwa`       | Web app manifest, a hand-written service worker, placeholder icons.      |
| `--stripe`    | A single pricing/checkout page wired to a Stripe Checkout Session (server action + hosted redirect, no `@stripe/stripe-js`). |
| `--drizzle`   | Drizzle ORM schema + client, plus `db:push`/`db:studio` scripts. Works with any Postgres connection string — Neon, Supabase, Railway, local. |
| `--analytics` | `@vercel/analytics` wired into the root layout.                         |
| `--testing`   | Vitest + React Testing Library, configured for the shadcn/ui setup, with an example component test. |
| `--i18n`      | next-intl with a cookie-based locale, English/Spanish message files, and a server-translated `/i18n-demo` page. |
| `--email`     | A `/email` page with a working react-hook-form + zod contact form that actually sends via Resend (server action). |
| `--sentry`    | `@sentry/nextjs` client-side error tracking, initialized from the root layout (no-op without a DSN). |

`--pwa`, `--analytics` and `--sentry` all need to add something to `src/app/layout.tsx`; they compose safely together via a small marker-based injection step in `generateProject` rather than one overwriting the other's file.

### Astro (`--framework astro`)

A separate, minimal foundation — no shadcn/ui, no extras (all extras above are Next.js-specific):

- Astro 5 with the Content Layer API, TypeScript strict mode.
- Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js`).
- CSS-only dark mode (`prefers-color-scheme`, no toggle component).

| Template      | Adds                                                    |
| -------------- | -------------------------------------------------------- |
| `astro-blank`  | A single minimal page.                                  |
| `astro-blog`   | Post list + post detail, content defined as Markdown files under `src/content/posts/`. |

### Vite + React (`--framework vite-react`)

Another separate, minimal foundation — a pure client-side SPA (no SSR, no shadcn/ui, no extras):

- Vite 6 + React 19, TypeScript strict mode (`npm run build` type-checks first).
- Tailwind CSS v4 via `@tailwindcss/vite`.

| Template       | Adds                                                    |
| --------------- | -------------------------------------------------------- |
| `vite-blank`    | A single minimal page.                                  |
| `vite-router`   | Multi-page SPA using react-router (`createBrowserRouter`), with a shared layout and two example pages. |

## Replaying the same setup

Every generated project gets a `ceibo.config.json` recording the resolved framework/template/extras/author/description/license (unless you pass `--no-save-config`). Reuse it on a future run to skip every prompt:

```bash
npx create-ceibo-app another-app --config ./my-app/ceibo.config.json -y
```

An explicit CLI flag always overrides the config file, which in turn overrides interactive prompting.

## Adding an extra later

Extras aren't locked in at generation time — `add <extra>` applies one to an already-generated project:

```bash
cd my-app
npx create-ceibo-app add stripe
```

It merges the extra's `package.json` fragment into your existing one, respects `dependsOn`/`conflictsWith` (reading them from `ceibo.config.json` if present), and updates that config file afterward. One caveat: extras that inject into `src/app/layout.tsx` (`pwa`, `analytics`) can only do that automatically during initial generation — added later, the command prints the exact snippet to paste in by hand.

## Local development

```bash
git clone https://github.com/Brunito06/create-ceibo-app.git
cd create-ceibo-app
npm install
npm run build
node dist/index.js test-app --yes --skip-install --no-git
```

| Script              | Description                              |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Build in watch mode (`tsup --watch`)        |
| `npm run build`       | Build the CLI to `dist/`                    |
| `npm run lint`        | Lint the CLI's own source                   |
| `npm run typecheck`   | Type-check with `tsc --noEmit`              |
| `npm test`            | Run the test suite (Vitest)                 |

Templates live under `templates/` and are copied as-is (with `__APP_NAME__`, `__APP_TITLE__`, `__AUTHOR__`, `__DESCRIPTION__` and `__YEAR__` token replacement) — they're not compiled, so you can edit them directly and re-run the CLI to see the result. For Next.js, generation works in layers: `base` → the chosen template → each chosen extra, applied in that order; `package.json` fragments are deep-merged rather than overwritten, `CLAUDE.md`/`README.md`/`.env.example` sections are appended, and extras that touch `src/app/layout.tsx` splice into markers left there rather than overwriting the file. Other frameworks (Astro) just use their own `<framework>-base` + template layer — no extras yet.

Templates, extras, frameworks and licenses are all defined in `src/registry/` — adding a new one is "add a `templates/<id>` folder + one registry entry," not a change to the CLI's parsing/prompting/generation code.

## Contributing

Issues and pull requests are welcome. Please run `npm run lint`, `npm run typecheck` and `npm test` before opening a PR.

## Licence

MIT © [Brunito06](https://github.com/Brunito06)
