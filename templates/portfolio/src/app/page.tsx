import { ProjectCard } from "@/components/shared/project-card";
import { SiteHeader } from "@/components/shared/site-header";
import { EXPERIENCE } from "@/lib/experience";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <section className="mb-20">
          <h1 className="text-4xl font-semibold tracking-tight">__APP_TITLE__</h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg">
            A short one-liner about who you are and what you do. Edit this in{" "}
            <code>src/app/page.tsx</code>.
          </p>
        </section>

        <section id="projects" className="mb-20 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        <section id="experience" className="mb-20 scroll-mt-20">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Experience</h2>
          <div className="space-y-6">
            {EXPERIENCE.map((item) => (
              <div key={`${item.role}-${item.organization}`} className="border-b pb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium">
                    {item.role} · {item.organization}
                  </h3>
                  <span className="text-muted-foreground text-sm">{item.period}</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-20">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="text-muted-foreground text-sm">
            Reach out at{" "}
            <a href="mailto:hello@example.com" className="underline underline-offset-4">
              hello@example.com
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
