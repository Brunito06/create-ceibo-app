"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether a CSS media query currently matches. Useful for conditional
 * rendering that depends on viewport size without relying on Tailwind's
 * class-based breakpoints (e.g. driving JS behaviour, not just styles).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    listener();
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
