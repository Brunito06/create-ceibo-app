import Link from "next/link";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="font-semibold">${product.price}</span>
        <Link href={`/products/${product.slug}`} className="text-sm underline underline-offset-4">
          View product
        </Link>
      </CardFooter>
    </Card>
  );
}
