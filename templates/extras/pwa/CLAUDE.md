## PWA

- `src/app/manifest.ts` uses Next's file-based manifest convention — edit it directly, don't add a static `public/manifest.json`.
- `public/sw.js` is a hand-written stale-while-revalidate service worker (no `next-pwa`/webpack plugin, so it works the same under Turbopack dev and a production build). It's registered client-side by `src/components/shared/register-service-worker.tsx`, mounted from `src/app/layout.tsx`.
- Icons are placeholder SVGs at `public/icons/icon.svg` and `src/app/icon.svg` (browser tab favicon, via Next's file convention) — swap both for real artwork before shipping.
- Bump `CACHE_NAME` in `public/sw.js` whenever you change what gets precached, so old clients don't get stuck serving stale assets.
