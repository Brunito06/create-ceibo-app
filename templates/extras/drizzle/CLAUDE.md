## Drizzle

- Schema lives in `src/lib/db/schema.ts` — add tables there, then run `npm run db:push` to sync them to the database (no migration files by default; switch to `drizzle-kit generate` + `drizzle-kit migrate` if you need versioned migrations later).
- `src/lib/db/index.ts` exports the `db` client, built from `DATABASE_URL` — reuse it everywhere instead of creating new `postgres()` connections.
- `DATABASE_URL` should point at Supabase's pooled connection string (Project settings -> Database -> Connection string, "Transaction" mode) — the direct connection string will exhaust Supabase's connection limit under serverless functions.
- `npm run db:studio` opens Drizzle Studio, a local GUI for browsing/editing rows.
