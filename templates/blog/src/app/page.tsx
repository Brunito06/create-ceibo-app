import { PostCard } from "@/components/shared/post-card";
import { SiteHeader } from "@/components/shared/site-header";
import { POSTS } from "@/lib/posts";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight">__APP_TITLE__</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {POSTS.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
