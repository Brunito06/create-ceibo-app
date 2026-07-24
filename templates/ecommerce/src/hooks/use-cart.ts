"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "__APP_NAME__-cart";
const CART_EVENT = "cartchange";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

/**
 * A localStorage-backed cart with no Context/Provider: components read and
 * mutate the same key directly and stay in sync via a custom window event,
 * so the cart badge, product pages and the cart page never need a shared
 * ancestor or a change to the root layout.
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());

    const onChange = () => setItems(readCart());
    window.addEventListener(CART_EVENT, onChange);
    window.addEventListener("storage", onChange);

    return () => {
      window.removeEventListener(CART_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    const current = readCart();
    const existing = current.find((i) => i.slug === item.slug);

    const next = existing
      ? current.map((i) => (i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i))
      : [...current, { ...item, quantity: 1 }];

    writeCart(next);
  }, []);

  const removeItem = useCallback((slug: string) => {
    writeCart(readCart().filter((i) => i.slug !== slug));
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addItem, removeItem, total, count };
}
