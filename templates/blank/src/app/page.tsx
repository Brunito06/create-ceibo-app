import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">__APP_TITLE__</h1>
      <p className="text-muted-foreground max-w-md text-center text-sm">
        A blank canvas. Start building in <code>src/app/page.tsx</code>.
      </p>
    </main>
  );
}
