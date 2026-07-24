# CLAUDE.md

Conventions for working on **__APP_TITLE__** with Claude Code. Read this before making changes.

## Stack

- **Next.js 15** (App Router), TypeScript in strict mode, `src/` directory.
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.ts`. Theme tokens live in `src/app/globals.css` under `@theme inline` and the `:root` / `.dark` blocks.
- **shadcn/ui** (`new-york` style, `neutral` base colour) for primitives, built on Radix UI.
- **next-themes** for dark mode (class strategy, `system` default).
- **Inter** via `next/font/google`, exposed as the `--font-inter` CSS variable and wired into Tailwind as `font-sans`.

## Folder structure

```
src/
  app/            # routes, layouts, route handlers (App Router)
  components/
    ui/           # shadcn primitives — generated/managed via the shadcn CLI, avoid hand-editing structure
    shared/       # your own reusable components (ThemeToggle, ThemeProvider, page sections, etc.)
  lib/            # framework-agnostic helpers (e.g. lib/utils.ts's cn())
  hooks/          # custom React hooks
  types/          # shared TypeScript types
```

Route-specific components that are only ever used by one page can live next to that route under `src/app/**`; anything reused across routes belongs in `src/components/shared`.

## Naming conventions

- Files and folders: `kebab-case` (`theme-toggle.tsx`, `use-media-query.ts`).
- Components: `PascalCase` exported names, one primary component per file, filename matches the component in kebab-case.
- Hooks: `use-*.ts`, exporting a `use*` function.
- Prefer named exports over default exports, except for `page.tsx`, `layout.tsx` and other Next.js file conventions, which Next requires to be default exports.

## Adding shadcn/ui components

This project already has `components.json` configured (`new-york`, Tailwind v4, path aliases). To add another component, run:

```bash
npx shadcn@latest add <component>
```

It will land in `src/components/ui/` matching the existing components' style. Don't hand-roll a component that shadcn already provides — add it instead so it stays consistent with the rest of `ui/`.

## Styling

- Always compose class names with `cn()` from `@/lib/utils` (merges Tailwind classes correctly, avoiding specificity/order bugs) instead of template-string concatenation.
- Use the semantic colour tokens (`bg-background`, `text-foreground`, `bg-card`, `border`, `text-muted-foreground`, etc.) instead of raw Tailwind colours (`gray-100`, `slate-900`) — they automatically adapt to dark mode.
- New shared UI belongs in `src/components/shared`; keep `src/components/ui` limited to shadcn-managed primitives.

## Path aliases

`@/*` maps to `src/*` (see `tsconfig.json`). Always import via `@/...`, never relative paths that climb out of a feature folder (`../../../lib/utils`).
