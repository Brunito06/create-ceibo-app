"use client";

import Link from "next/link";

import { StoreHeader } from "@/components/shared/store-header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  return (
    <div className="flex min-h-svh flex-col">
      <StoreHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">Your cart</h1>

        {items.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Your cart is empty.{" "}
            <Link href="/" className="underline underline-offset-4">
              Keep browsing
            </Link>
            .
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.quantity} &times; ${item.price}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(item.slug)}>
                  Remove
                </Button>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <span className="text-lg font-semibold">Total: ${total}</span>
              <Button disabled title="Connect a payment provider to enable checkout">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
