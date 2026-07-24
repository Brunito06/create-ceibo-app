## Auth.js (NextAuth)

- `src/auth.ts` configures Auth.js — exports `{ handlers, auth, signIn, signOut }`. This is a standalone auth system; it's mutually exclusive with the Supabase `auth` extra (the CLI won't let you pick both).
- `src/app/api/auth/[...nextauth]/route.ts` wires Auth.js's handlers into the App Router.
- Only a GitHub OAuth provider is configured by default — add more under `providers` in `src/auth.ts` (see https://authjs.dev/getting-started/providers).
- `src/app/authjs-demo/page.tsx` is a minimal example of reading the session server-side (`await auth()`) and redirecting unauthenticated users to Auth.js's built-in sign-in page.
- Env vars are documented in `.env.example`; generate `AUTH_SECRET` with `npx auth secret`.
