import { EmailForm } from "@/components/shared/email-form";

export default function EmailPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          This form sends a real email via Resend — set{" "}
          <code>RESEND_API_KEY</code> and <code>EMAIL_FROM</code> in{" "}
          <code>.env.local</code>.
        </p>
      </div>
      <EmailForm />
    </main>
  );
}
