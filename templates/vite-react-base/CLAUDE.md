# CLAUDE.md

Conventions for working on **__APP_TITLE__** with Claude Code. Read this before making changes.

## Stack

- **Vite + React** — a client-side SPA, not Next.js. There's no server, no API routes, no Server Actions, no SSR.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin — no `tailwind.config.js`, CSS-first config in `src/index.css`.
- TypeScript in strict mode.

## Folder structure

```
src/
  main.tsx      # entry point — mounts <App /> into #root, never put UI logic here
  App.tsx       # root component (routes live here if this template uses react-router)
  index.css     # Tailwind entry point
```

## Conventions

- This is a pure client-side app: any data fetching happens in the browser (fetch, React Query, SWR, etc. — bring your own; none is installed by default).
- `npm run build` runs `tsc --noEmit` before `vite build`, so a type error fails the build the same way it would in the Next.js templates.
