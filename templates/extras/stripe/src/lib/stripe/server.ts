import Stripe from "stripe";

let client: Stripe | undefined;

/**
 * Server-only Stripe client, created lazily on first use rather than at
 * module scope — so importing this file doesn't throw during `next build`'s
 * page-data collection when STRIPE_SECRET_KEY isn't set yet. Never import
 * this from a Client Component.
 */
export function getStripe(): Stripe {
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY!);
  return client;
}
