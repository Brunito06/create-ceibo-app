import { redirect } from "next/navigation";

import { DOC_SECTIONS } from "@/lib/docs";

export default function DocsIndex() {
  const firstPage = DOC_SECTIONS[0]?.pages[0];
  redirect(firstPage ? `/docs/${firstPage.slug}` : "/docs/introduction");
}
