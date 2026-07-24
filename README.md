# create-ceibo-app

Scaffold a new **Next.js + Supabase + Tailwind CSS + shadcn/ui** project, pre-wired with [Ceibo Labs](https://github.com/ceibolabs)' conventions, in one command.

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

Answer the prompts (project type, Supabase, auth, PWA, package manager) and you're done. Prefer a one-liner? Pass everything as flags instead:

```bash
npx create-ceibo-app my-app --template dashboard --supabase --auth --pwa --pm pnpm
```

### Flags

| Flag                    | Description                                              | Default                    |
| ------------------------ | ---------------------------------------------------------- | ---------------------------- |
| `[project-name]`         | Project name / target directory. Prompted if omitted.      | —                             |
| `-t, --template <name>`  | `landing` \| `dashboard` \| `blank`                        | prompted                     |
| `--supabase`             | Include Supabase client setup                              | prompted                     |
| `--no-supabase`          | Skip Supabase                                               | —                             |
| `--auth`                 | Include email/password auth (requires Supabase)            | prompted                     |
| `--no-auth`              | Skip auth                                                   | —                             |
| `--pwa`                  | Configure as a PWA (manifest, service worker, icons)        | prompted                     |
| `--no-pwa`               | Skip PWA setup                                              | —                             |
| `--pm <manager>`         | `npm` \| `pnpm`                                             | detected from how you ran it |
| `--skip-install`         | Don't run the package manager install step                 | `false`                       |
| `--no-git`               | Don't run `git init` / initial commit                      | —                             |
| `-y, --yes`              | Use defaults for anything not passed as a flag              | `false`                       |

With `--yes`, unset options default to: `dashboard` template, Supabase **on**, auth **on**, PWA **off**.

## What each template includes

Every project gets the same foundation regardless of template:

- Next.js 15 (App Router), TypeScript in strict mode, `src/` directory.
- Tailwind CSS v4 + shadcn/ui (`new-york` style), with `button`, `card`, `input`, `label`, `dialog`, `dropdown-menu` and `sonner` (toasts) already installed.
- Dark mode via `next-themes`, with a toggle wired into the UI.
- Inter, loaded via `next/font`.
- ESLint + Prettier, configured to agree with each other.
- A real, project-specific `CLAUDE.md` and `README.md` — not boilerplate placeholders.

| Template    | Adds                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `landing`    | Marketing home page: header, hero, features grid, call-to-action, footer. |
| `dashboard`  | App shell: responsive sidebar + header, an example dashboard page and a settings page. |
| `blank`      | The shared foundation only — a single minimal page.                     |

| Extra        | Adds                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `--supabase`  | `src/lib/supabase/{client,server,middleware}.ts`, session-refresh middleware, `.env.example`. |
| `--auth`      | Login/register pages, a protected `/profile` page, and route-protection middleware (requires `--supabase`). |
| `--pwa`       | Web app manifest, a hand-written service worker, placeholder icons.      |

## Local development

```bash
git clone https://github.com/ceibolabs/create-ceibo-app.git
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

MIT © [Ceibo Labs](https://github.com/ceibolabs)
