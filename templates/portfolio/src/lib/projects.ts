export interface Project {
  name: string;
  description: string;
  url?: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    name: "Project One",
    description: "A short description of what this project does and why it matters.",
    url: "https://example.com",
    tags: ["Next.js", "TypeScript"],
  },
  {
    name: "Project Two",
    description: "Another project — swap this content for your own work.",
    tags: ["React", "Tailwind"],
  },
  {
    name: "Project Three",
    description: "A third example project, so the grid shows more than two items.",
    url: "https://example.com",
    tags: ["Node.js", "PostgreSQL"],
  },
];
