import { ThemeToggle } from "@/components/shared/theme-toggle";
import { WaitlistForm } from "@/components/shared/waitlist-form";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">__APP_TITLE__</h1>
      <p className="text-muted-foreground max-w-md text-lg">
        We&apos;re putting the finishing touches on something new. Leave your email and we&apos;ll
        let you know when it&apos;s ready.
      </p>
      <WaitlistForm />
    </main>
  );
}
