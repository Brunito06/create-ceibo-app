## Drizzle

This project uses [Drizzle ORM](https://orm.drizzle.team) against the same Postgres database as Supabase:

- Define tables in `src/lib/db/schema.ts`.
- Set `DATABASE_URL` in `.env.local` (see `.env.example`) — use Supabase's pooled ("Transaction" mode) connection string.
- `npm run db:push` syncs your schema to the database; `npm run db:studio` opens a local GUI for browsing data.
