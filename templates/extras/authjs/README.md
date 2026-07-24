## Auth.js (NextAuth)

GitHub OAuth via [Auth.js](https://authjs.dev) is wired up:

- Visit `/authjs-demo` to see a protected page — you'll be redirected to sign in first.
- Create a GitHub OAuth app (https://github.com/settings/developers) with callback URL `http://localhost:3000/api/auth/callback/github`, then fill in `AUTH_GITHUB_ID`/`AUTH_GITHUB_SECRET` in `.env.local` (see `.env.example`).
- Generate `AUTH_SECRET` with `npx auth secret`.
