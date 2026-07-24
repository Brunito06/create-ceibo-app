import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <Card className="hover:border-primary/50 h-full transition-colors">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.tags.join(" · ")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{project.description}</p>
      </CardContent>
    </Card>
  );

  if (!project.url) {
    return content;
  }

  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="block">
      {content}
    </a>
  );
}
