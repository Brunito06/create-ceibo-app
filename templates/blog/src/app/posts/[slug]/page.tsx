import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/shared/site-header";
import { getPostBySlug, POSTS } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <p className="text-muted-foreground text-sm">
          {post.date} &middot; {post.author}
        </p>
        <h1 className="mt-2 mb-6 text-3xl font-semibold tracking-tight">{post.title}</h1>
        <div className="space-y-4 text-sm leading-relaxed">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </main>
    </div>
  );
}
