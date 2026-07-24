# __APP_TITLE__

Built with [create-ceibo-app](https://github.com/ceibolabs/create-ceibo-app) — Next.js, Tailwind CSS v4 and shadcn/ui.

## Getting started

Install dependencies (already done for you if you didn't pass `--skip-install`):

```bash
npm install
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script             | Description                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack)          |
| `npm run build`     | Build for production                      |
| `npm run start`     | Run the production build                  |
| `npm run lint`       | Lint with ESLint                          |
| `npm run typecheck`  | Type-check with `tsc --noEmit`            |

Swap `npm run` for `pnpm` commands if you generated this project with pnpm.

## Project structure

```
src/
  app/            # routes, layouts (App Router)
  components/
    ui/           # shadcn/ui primitives
    shared/       # your own reusable components
  lib/            # helpers (cn(), etc.)
  hooks/          # custom hooks
  types/          # shared types
```

See [`CLAUDE.md`](./CLAUDE.md) for the full set of project conventions.

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
```
