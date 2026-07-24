import { describe, expect, it } from "vitest";

import { parseCli } from "../src/cli.js";
import { EXTRAS } from "../src/registry/index.js";

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

  it("parses --author, --description and --license", () => {
    const flags = parseCli(
      argv("my-app", "--author", "Ada Lovelace", "--description", "A lovely app.", "--license", "MIT"),
    );

    expect(flags.author).toBe("Ada Lovelace");
    expect(flags.description).toBe("A lovely app.");
    expect(flags.license).toBe("MIT");
  });

  it.each(EXTRAS)("maps --$id and --no-$id for every registered extra", (extra) => {
    expect(parseCli(argv("my-app", `--${extra.id}`))[extra.id]).toBe(true);
    expect(parseCli(argv("my-app", `--no-${extra.id}`))[extra.id]).toBe(false);
    expect(parseCli(argv("my-app"))[extra.id]).toBeUndefined();
  });
});
