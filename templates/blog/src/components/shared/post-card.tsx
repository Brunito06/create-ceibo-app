import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="hover:border-primary/50 h-full transition-colors">
        <CardHeader>
          <CardDescription>{post.date}</CardDescription>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
