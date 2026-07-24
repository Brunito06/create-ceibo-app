# __APP_TITLE__

Built with [create-ceibo-app](https://github.com/Brunito06/create-ceibo-app) — Astro + Tailwind CSS v4.

## Getting started

Install dependencies (already done for you if you didn't pass `--skip-install`):

```bash
npm install
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Scripts

| Script            | Description                          |
| ------------------ | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Build for production (outputs to `dist/`) |
| `npm run preview`   | Preview the production build locally  |
| `npm run typecheck` | Type-check `.astro` files (`astro check`) |

## Project structure

```
src/
  pages/        # file-based routing
  layouts/      # shared page shells
  styles/       # global.css (Tailwind entry point)
```

See [`CLAUDE.md`](./CLAUDE.md) for the full set of project conventions.
