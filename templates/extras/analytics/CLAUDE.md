## Analytics

- `<Analytics />` from `@vercel/analytics/next` is mounted in `src/app/layout.tsx` — it only reports page views when deployed on Vercel; it's a harmless no-op everywhere else, including `next dev`.
- No further setup needed: Vercel starts collecting data automatically once the project is deployed there.
