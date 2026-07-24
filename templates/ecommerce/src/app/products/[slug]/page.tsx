import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import { StoreHeader } from "@/components/shared/store-header";
import { getProductBySlug, PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-svh flex-col">
      <StoreHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
        <p className="text-muted-foreground mt-2 text-sm">{product.description}</p>
        <ul className="text-muted-foreground mt-6 list-disc space-y-1 pl-5 text-sm">
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="mt-8 flex items-center gap-4">
          <span className="text-2xl font-semibold">${product.price}</span>
          <AddToCartButton product={product} />
        </div>
      </main>
    </div>
  );
}
