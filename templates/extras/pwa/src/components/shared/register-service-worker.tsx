"use client";

import { useEffect } from "react";

/** Registers the service worker at `public/sw.js` once the app has mounted. */
export function RegisterServiceWorker() {
  useEffect(() => {
    // Skip in dev: a caching service worker fights hot reloading.
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
        console.error("Service worker registration failed:", error);
      });
    }
  }, []);

  return null;
}
