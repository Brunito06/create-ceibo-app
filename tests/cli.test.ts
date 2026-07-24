import { describe, expect, it } from "vitest";

import { parseCli } from "../src/cli.js";

function argv(...args: string[]): string[] {
  return ["node", "create-ceibo-app", ...args];
}

describe("parseCli", () => {
  it("leaves unspecified boolean flags undefined", () => {
    const flags = parseCli(argv("my-app"));

    expect(flags.projectName).toBe("my-app");
    expect(flags.supabase).toBeUndefined();
    expect(flags.auth).toBeUndefined();
    expect(flags.pwa).toBeUndefined();
    expect(flags.template).toBeUndefined();
    expect(flags.packageManager).toBeUndefined();
    expect(flags.skipInstall).toBe(false);
    expect(flags.skipGit).toBe(false);
    expect(flags.yes).toBe(false);
  });

  it("parses the full non-interactive flag set", () => {
    const flags = parseCli(
      argv(
        "my-app",
        "--template",
        "dashboard",
        "--supabase",
        "--auth",
        "--pwa",
        "--pm",
        "pnpm",
        "--skip-install",
        "--no-git",
      ),
    );

    expect(flags).toMatchObject({
      projectName: "my-app",
      template: "dashboard",
      supabase: true,
      auth: true,
      pwa: true,
      packageManager: "pnpm",
      skipInstall: true,
      skipGit: true,
    });
  });

  it("resolves negated flags to false", () => {
    const flags = parseCli(argv("my-app", "--no-supabase", "--no-pwa"));

    expect(flags.supabase).toBe(false);
    expect(flags.pwa).toBe(false);
  });

  it("parses --yes", () => {
    const flags = parseCli(argv("my-app", "-y"));
    expect(flags.yes).toBe(true);
  });
});
