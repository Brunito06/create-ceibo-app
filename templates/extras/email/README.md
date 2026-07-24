## Email (Resend)

This project has transactional email wired up via [Resend](https://resend.com):

- `/email` — a working demo form that sends a real email through a Server Action.
- Set `RESEND_API_KEY` and `EMAIL_FROM` in `.env.local` (see `.env.example`) — verify a sending domain in the Resend dashboard, or use `onboarding@resend.dev` while testing.
