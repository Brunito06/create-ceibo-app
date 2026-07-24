import { Resend } from "resend";

let client: Resend | undefined;

/**
 * Server-only Resend client, created lazily on first use rather than at
 * module scope — so importing this file doesn't throw during `next build`'s
 * page-data collection when RESEND_API_KEY isn't set yet. Never import this
 * from a Client Component.
 */
export function getResend(): Resend {
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}
