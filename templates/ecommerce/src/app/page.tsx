import { ProductCard } from "@/components/shared/product-card";
import { StoreHeader } from "@/components/shared/store-header";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <StoreHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">__APP_TITLE__</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
