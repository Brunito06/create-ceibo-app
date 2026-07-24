## Authentication

Email/password auth is wired up with Supabase Auth:

- `/login` and `/register` — public pages.
- `/profile` — protected, shows the signed-in user's email and a sign-out button.
- Everything else is protected by `src/middleware.ts` by default; edit `PUBLIC_PATHS` there to expose more pages.

By default, Supabase requires email confirmation before a new account can log in. During local development you can disable that under **Authentication -> Providers -> Email** in the Supabase dashboard, or check your inbox for the confirmation link.
