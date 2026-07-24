## Stripe

- `src/lib/stripe/server.ts` creates the server-side Stripe client from `STRIPE_SECRET_KEY` — never import it from a Client Component.
- `src/lib/stripe/actions.ts`'s `createCheckoutSession` is a Server Action that creates a Checkout Session for `STRIPE_PRICE_ID` and redirects to Stripe's hosted checkout page — no `@stripe/stripe-js` or client-side Elements needed for this flow.
- `src/app/pricing/page.tsx` is a single pricing/checkout page wired to that action; edit the price and copy in the Stripe dashboard, not in code.
- Env vars are documented in `.env.example`; actual values go in `.env.local` (gitignored).
