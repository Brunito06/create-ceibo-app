export interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "notebook",
    name: "Notebook",
    price: 12,
    description: "A dot-grid notebook for sketching ideas.",
    details: ["192 pages", "Dot-grid, 5mm spacing", "Elastic closure"],
  },
  {
    slug: "ceramic-mug",
    name: "Ceramic Mug",
    price: 18,
    description: "A sturdy 350ml mug for your morning coffee.",
    details: ["350ml capacity", "Dishwasher safe", "Matte finish"],
  },
  {
    slug: "canvas-tote-bag",
    name: "Canvas Tote Bag",
    price: 22,
    description: "A durable canvas tote for everyday errands.",
    details: ["100% cotton canvas", "Reinforced handles", "Machine washable"],
  },
  {
    slug: "sticker-pack",
    name: "Sticker Pack",
    price: 8,
    description: "A pack of 10 vinyl stickers.",
    details: ["10 stickers", "Weatherproof vinyl", "Fits laptops and bottles"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
