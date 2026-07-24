"use server";

import { redirect } from "next/navigation";

import { getStripe } from "@/lib/stripe/server";

export async function createCheckoutSession(): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${siteUrl}/pricing?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=canceled`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout session URL.");
  }

  redirect(session.url);
}
