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

Answer the prompts (template, extras, author, description, license, package manager) and you're done. Prefer a one-liner? Pass everything as flags instead:

```bash
npx create-ceibo-app my-app --template dashboard --supabase --auth --pwa --pm pnpm
```

### Flags

| Flag                    | Description                                              | Default                    |
| ------------------------ | ---------------------------------------------------------- | ---------------------------- |
| `[project-name]`         | Project name / target directory. Prompted if omitted.      | —                             |
| `-t, --template <name>`  | `landing` \| `dashboard` \| `blank` \| `blog` \| `ecommerce` | prompted                    |
| `--supabase`             | Include Supabase client setup                              | prompted                     |
| `--no-supabase`          | Skip Supabase                                               | —                             |
| `--auth`                 | Include email/password auth (requires Supabase)            | prompted                     |
| `--no-auth`              | Skip auth                                                   | —                             |
| `--pwa`                  | Configure as a PWA (manifest, service worker, icons)        | prompted                     |
| `--no-pwa`               | Skip PWA setup                                              | —                             |
| `--stripe`               | Include Stripe checkout + pricing page                      | prompted                     |
| `--no-stripe`            | Skip Stripe                                                  | —                             |
| `--drizzle`              | Include Drizzle ORM (requires Supabase)                      | prompted                     |
| `--no-drizzle`           | Skip Drizzle                                                 | —                             |
| `--analytics`            | Include Vercel Analytics                                    | prompted                     |
| `--no-analytics`         | Skip Vercel Analytics                                       | —                             |
| `--author <name>`        | Author name, written to `package.json` and `LICENSE`        | prompted (from `git config user.name` if available) |
| `--description <text>`   | Short project description, written to `package.json`        | prompted                     |
| `--license <id>`         | `MIT` \| `Apache-2.0` \| `None`                              | prompted                     |
| `--pm <manager>`         | `npm` \| `pnpm`                                             | detected from how you ran it |
| `--skip-install`         | Don't run the package manager install step                 | `false`                       |
| `--no-git`               | Don't run `git init` / initial commit                      | —                             |
| `-y, --yes`              | Use defaults for anything not passed as a flag              | `false`                       |

With `--yes`, unset options default to: `dashboard` template, Supabase **on**, auth **on**, PWA/Stripe/Drizzle/Analytics **off**, MIT license.

## What each template includes

Every project gets the same foundation regardless of template:

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

| Extra         | Adds                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `--supabase`  | `src/lib/supabase/{client,server,middleware}.ts`, session-refresh middleware, `.env.example`. |
| `--auth`      | Login/register pages, a protected `/profile` page, and route-protection middleware (requires `--supabase`). |
| `--pwa`       | Web app manifest, a hand-written service worker, placeholder icons.      |
| `--stripe`    | A single pricing/checkout page wired to a Stripe Checkout Session (server action + hosted redirect, no `@stripe/stripe-js`). |
| `--drizzle`   | Drizzle ORM schema + client against Supabase's Postgres connection string, plus `db:push`/`db:studio` scripts (requires `--supabase`). |
| `--analytics` | `@vercel/analytics` wired into the root layout.                         |

`--pwa` and `--analytics` both need to add something to `src/app/layout.tsx`; they compose safely together via a small marker-based injection step in `generateProject` rather than one overwriting the other's file.

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

Templates live under `templates/` and are copied as-is (with `__APP_NAME__` / `__APP_TITLE__` token replacement) — they're not compiled, so you can edit them directly and re-run the CLI to see the result. Generation works in layers: `base` → the chosen template → each chosen extra, applied in that order; `package.json` fragments are deep-merged rather than overwritten, and `CLAUDE.md` / `README.md` sections are appended.

## Contributing

Issues and pull requests are welcome. Please run `npm run lint`, `npm run typecheck` and `npm test` before opening a PR.

## Licence

MIT © [Brunito06](https://github.com/Brunito06)
