## Sentry

- `src/components/shared/sentry-init.tsx` calls `Sentry.init()` client-side once `NEXT_PUBLIC_SENTRY_DSN` is set, and is mounted from `src/app/layout.tsx`. It's a no-op with no DSN, so it's safe to leave in place in environments without one.
- This is client-side error tracking only — no `instrumentation.ts`, server/edge configs, or `next.config` source-map upload wizard. Add those yourself if you also need server-side error capture.
- Env vars are documented in `.env.example`; actual values go in `.env.local` (gitignored).
