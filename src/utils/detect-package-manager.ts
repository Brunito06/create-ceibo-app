import type { PackageManager } from "../types.js";

/**
 * Detects the package manager used to invoke this CLI (e.g. via `npm create`
 * or `pnpm create`) by reading the `npm_config_user_agent` env var that both
 * npm and pnpm set. Falls back to npm.
 */
export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent?.startsWith("pnpm")) {
    return "pnpm";
  }
  return "npm";
}
