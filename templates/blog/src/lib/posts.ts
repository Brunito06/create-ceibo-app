export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
}

export const POSTS: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    excerpt: "The first post on __APP_TITLE__ — a good place to start writing.",
    content: [
      "Welcome to __APP_TITLE__. This post is here to show what a post page looks like — replace it with your own writing whenever you're ready.",
      "Posts live in src/lib/posts.ts as a plain array, so you can add, edit or remove them without touching any other file.",
    ],
    date: "2026-01-01",
    author: "__AUTHOR__",
  },
  {
    slug: "building-with-nextjs",
    title: "Building with Next.js",
    excerpt: "A quick look at the App Router conventions this project follows.",
    content: [
      "Every route lives under src/app, and every page in this blog is a plain server component — no client-side data fetching needed for static content like this.",
      "When you're ready to move posts to a CMS or Markdown files, swap out src/lib/posts.ts for a function that reads from wherever your content actually lives; the rest of the pages stay the same.",
    ],
    date: "2026-01-08",
    author: "__AUTHOR__",
  },
  {
    slug: "shipping-fast",
    title: "Shipping fast without cutting corners",
    excerpt: "Dark mode, shadcn/ui and Tailwind v4 — ready on day one.",
    content: [
      "This template already wires up dark mode, a handful of shadcn/ui primitives, and Tailwind CSS v4 so you can focus on writing instead of setting up tooling.",
      "Add more shadcn components with `npx shadcn@latest add <component>` whenever you need one that isn't included yet.",
    ],
    date: "2026-01-15",
    author: "__AUTHOR__",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
