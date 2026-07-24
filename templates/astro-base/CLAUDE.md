# CLAUDE.md

Conventions for working on **__APP_TITLE__** with Claude Code. Read this before making changes.

## Stack

- **Astro** (not Next.js/React) — pages render to static HTML with zero client-side JS by default. Only reach for a client framework island (`@astrojs/react`, `@astrojs/vue`, ...) if a piece of UI genuinely needs interactivity; don't add one just out of habit.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin — no `astro.config` integration, no `tailwind.config.js`. CSS-first config lives in `src/styles/global.css`, imported once from `src/layouts/BaseLayout.astro`.
- TypeScript in strict mode (`astro/tsconfigs/strict`). Run `npm run typecheck` (`astro check`) to type-check `.astro` files — `tsc` alone does not check template markup.
- Dark mode is CSS-only (`dark:` Tailwind variants following the OS's `prefers-color-scheme`) — there's no toggle component or theme persistence, unlike the Next.js templates in this generator.

## Folder structure

```
src/
  pages/        # file-based routing — each .astro file here is a route
  layouts/      # shared page shells (BaseLayout.astro)
  components/   # reusable .astro components (create as needed)
  styles/       # global.css (Tailwind entry point)
  content/      # content collections, if this template uses them (see its own CLAUDE.md notes)
```

## Conventions

- Prefer `.astro` components for anything static; they ship no JS to the client.
- Use the semantic Tailwind utility classes already used in the shipped pages (`text-neutral-*`, `dark:*` pairs) rather than introducing a separate design system.
- Frontmatter (the `---` fenced block at the top of a `.astro` file) is server-only — never put secrets there that shouldn't be inlined into the page unless you're certain they aren't referenced in the template body.
