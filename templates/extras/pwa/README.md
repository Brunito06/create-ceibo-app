## PWA

This project is set up as an installable PWA:

- `src/app/manifest.ts` — web app manifest (name, icons, theme colour).
- `public/sw.js` — a minimal stale-while-revalidate service worker, registered on mount.
- `public/icons/icon.svg` and `src/app/icon.svg` — placeholder icons. Replace them with your own artwork before shipping.

The service worker only activates in a production build (`npm run build && npm run start`) — during `next dev` your changes should always be fresh, so it's not registered against the dev server's live-reloading assets in a way that would fight it.
