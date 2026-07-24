export interface DocPage {
  slug: string;
  title: string;
  content: string[];
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting Started",
    pages: [
      {
        slug: "introduction",
        title: "Introduction",
        content: [
          "Welcome to the __APP_TITLE__ docs. This is a good place to explain what your project does and who it's for.",
          "Docs are defined as a plain array in src/lib/docs.ts — add a page by adding an entry, no routing config needed.",
        ],
      },
      {
        slug: "installation",
        title: "Installation",
        content: ["Describe how someone installs or sets up your project here."],
      },
    ],
  },
  {
    title: "Guides",
    pages: [
      {
        slug: "configuration",
        title: "Configuration",
        content: ["Describe the configuration options your project exposes here."],
      },
    ],
  },
];

export function getAllDocPages(): DocPage[] {
  return DOC_SECTIONS.flatMap((section) => section.pages);
}

export function getDocPageBySlug(slug: string): DocPage | undefined {
  return getAllDocPages().find((page) => page.slug === slug);
}
