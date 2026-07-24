## Drizzle

This project uses [Drizzle ORM](https://orm.drizzle.team), which works with any Postgres provider:

- Define tables in `src/lib/db/schema.ts`.
- Set `DATABASE_URL` in `.env.local` (see `.env.example`) — Neon, Supabase, Railway, a local Postgres instance, or anything else that speaks the Postgres wire protocol.
- `npm run db:push` syncs your schema to the database; `npm run db:studio` opens a local GUI for browsing data.
