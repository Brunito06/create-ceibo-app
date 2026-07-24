## Email (Resend)

- `src/lib/email/client.ts` creates the Resend client lazily from `RESEND_API_KEY` — never import it from a Client Component.
- `src/lib/email/actions.ts`'s `sendContactEmail` is a Server Action that validates input with `src/lib/validations/email.ts`'s schema and sends via Resend using `EMAIL_FROM` as the sender.
- `src/app/email/page.tsx` + `src/components/shared/email-form.tsx` are a working demo wired to that action — unlike the Forms extra's contact form, this one actually sends.
- Env vars are documented in `.env.example`; actual values go in `.env.local` (gitignored).
