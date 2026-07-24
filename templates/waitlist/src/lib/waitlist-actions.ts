"use server";

export interface WaitlistState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * No email/database provider wired up by default — this is the single place
 * to call whatever you actually use (Resend, a Supabase table, a Google
 * Sheet...). Left as a `console.log` so the form works out of the box.
 */
export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  console.log(`Waitlist signup: ${email}`);

  return { status: "success", message: "You're on the list!" };
}
