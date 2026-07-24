import { ContactForm } from "@/components/shared/contact-form";

export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Fill out the form below and we&apos;ll get back to you.
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
