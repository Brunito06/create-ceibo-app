"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

/** Initializes client-side Sentry error tracking once the app has mounted, if a DSN is configured. */
export function SentryInit() {
  useEffect(() => {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (dsn) {
      Sentry.init({ dsn, tracesSampleRate: 1.0 });
    }
  }, []);

  return null;
}
