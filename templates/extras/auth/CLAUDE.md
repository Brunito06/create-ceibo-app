## Authentication

- Email/password auth via Supabase Auth. Server Actions live in `src/lib/supabase/actions.ts` (`login`, `signup`, `signOut`) — forms call them directly via `<form action={login}>`, no client-side fetch needed.
- `src/middleware.ts` protects every route except `/login` and `/register` (see `PUBLIC_PATHS`). Add a path there before building new unauthenticated pages, otherwise the middleware will redirect to `/login`.
- `/profile` is a Server Component that reads the current user with `createClient()` from `@/lib/supabase/server` and redirects to `/login` if there's none — treat this pattern as the template for any other page that needs the logged-in user.
- There's no nav link to `/profile` wired up yet by design (works the same whichever template you picked) — add one where it makes sense once you have real navigation.
