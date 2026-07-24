# __APP_TITLE__

Built with [create-ceibo-app](https://github.com/Brunito06/create-ceibo-app) — Vite + React + Tailwind CSS v4.

## Getting started

Install dependencies (already done for you if you didn't pass `--skip-install`):

```bash
npm install
```

Then start the dev server:

```bash
npm run dev
```

Open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

## Scripts

| Script            | Description                                  |
| ------------------ | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Type-check, then build for production (`dist/`) |
| `npm run preview`   | Preview the production build locally          |
| `npm run typecheck` | Type-check with `tsc --noEmit`                |

## Project structure

```
src/
  main.tsx      # entry point
  App.tsx       # root component
  index.css     # Tailwind entry point
```

See [`CLAUDE.md`](./CLAUDE.md) for the full set of project conventions.
