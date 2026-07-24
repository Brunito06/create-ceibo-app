## Stripe

This project has a Stripe-powered checkout wired up:

- `/pricing` — a single pricing page with a "Subscribe" button.
- Set `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` in `.env.local` (see `.env.example`) — create a Product with a recurring Price in the Stripe dashboard first.
- Checkout redirects to Stripe's hosted page; no Stripe Elements/`@stripe/stripe-js` involved.
