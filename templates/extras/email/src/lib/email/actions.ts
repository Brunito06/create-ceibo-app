"use server";

import { getResend } from "@/lib/email/client";
import { emailFormSchema, type EmailFormValues } from "@/lib/validations/email";

export async function sendContactEmail(
  values: EmailFormValues,
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = emailFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  const { name, email, message } = parsed.data;
  const from = process.env.EMAIL_FROM!;

  const { error } = await getResend().emails.send({
    from,
    to: from,
    replyTo: email,
    subject: `New message from ${name}`,
    text: message,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
