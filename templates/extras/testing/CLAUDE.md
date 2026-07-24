## Testing

- Component tests use Vitest + React Testing Library (`vitest.config.ts`, jsdom environment). Colocate test files next to what they test (`button.tsx` -> `button.test.tsx`).
- `npm test` runs the suite once; `npm run test:watch` re-runs on change.
- This is a separate test runner from Next's own dev/build — it doesn't spin up a real Next.js server or App Router request pipeline, so anything that needs Server Components, Server Actions, route handlers, or middleware isn't testable this way. Test client components, hooks and plain functions here; reach for Playwright (not installed) if you need real end-to-end coverage.
