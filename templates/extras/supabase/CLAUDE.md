## Supabase

- **Server Components / Server Actions / Route Handlers**: use `createClient()` from `@/lib/supabase/server` (async — it reads request cookies).
- **Client Components**: use `createClient()` from `@/lib/supabase/client`.
- Never import the server client from a Client Component or vice versa — the two wrap different cookie APIs and aren't interchangeable.
- `src/middleware.ts` + `src/lib/supabase/middleware.ts` refresh the auth session on every request. Don't remove this — Server Components can't write cookies themselves, so without it sessions silently expire.
- Env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are documented in `.env.example`; actual values go in `.env.local` (gitignored).
