## Drizzle

- Schema lives in `src/lib/db/schema.ts` — add tables there, then run `npm run db:push` to sync them to the database (no migration files by default; switch to `drizzle-kit generate` + `drizzle-kit migrate` if you need versioned migrations later).
- `src/lib/db/index.ts` exports the `db` client, built from `DATABASE_URL` — reuse it everywhere instead of creating new `postgres()` connections.
- `DATABASE_URL` works with any Postgres provider (Neon, Supabase, Railway, a local instance, ...) — see `.env.example` for provider-specific notes. If you're also using the Supabase extra, point it at Supabase's pooled ("Transaction" mode) connection string rather than the direct one, to avoid exhausting the connection limit under serverless functions.
- `npm run db:studio` opens Drizzle Studio, a local GUI for browsing/editing rows.
