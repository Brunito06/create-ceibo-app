"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <Button
      onClick={() => {
        addItem({ slug: product.slug, name: product.name, price: product.price });
        setAdded(true);
        toast.success(`${product.name} added to cart`);
      }}
    >
      {added ? "Added" : "Add to cart"}
    </Button>
  );
}
