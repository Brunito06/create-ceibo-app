## Supabase setup

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Go to **Project settings -> API** and copy the **Project URL** and **anon public** key.
3. Copy the example env file and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   ```

4. Restart the dev server so Next.js picks up the new env vars.

- Server-side data access: `createClient()` from `src/lib/supabase/server.ts`.
- Client-side data access: `createClient()` from `src/lib/supabase/client.ts`.
- Session refresh runs automatically via `src/middleware.ts` on every request.
