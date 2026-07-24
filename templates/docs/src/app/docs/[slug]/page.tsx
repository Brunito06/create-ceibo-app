import { notFound } from "next/navigation";

import { DOC_SECTIONS, getDocPageBySlug } from "@/lib/docs";

export function generateStaticParams() {
  return DOC_SECTIONS.flatMap((section) => section.pages.map((page) => ({ slug: page.slug })));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getDocPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
      <div className="space-y-4 text-sm leading-relaxed">
        {page.content.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
