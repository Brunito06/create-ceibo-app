## Sentry

Client-side error tracking is wired up via [Sentry](https://sentry.io):

- Set `NEXT_PUBLIC_SENTRY_DSN` in `.env.local` (see `.env.example`) — create a project in the Sentry dashboard to get one.
- Without a DSN set, initialization is skipped and nothing is sent.
