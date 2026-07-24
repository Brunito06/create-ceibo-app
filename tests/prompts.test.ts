import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { resolveOptions } from "../src/prompts.js";
import type { CliFlags } from "../src/types.js";

function baseFlags(overrides: Partial<CliFlags>): CliFlags {
  return {
    projectName: "test-app",
    skipInstall: true,
    skipGit: true,
    yes: true,
    saveConfig: true,
    ...overrides,
  };
}

describe("resolveOptions", () => {
  let cwd: string;

  beforeEach(() => {
    cwd = mkdtempSync(path.join(tmpdir(), "ceibo-prompts-"));
  });

  afterEach(() => {
    rmSync(cwd, { recursive: true, force: true });
  });

  it("derives the framework from an explicit --template", async () => {
    const options = await resolveOptions(baseFlags({ template: "astro-blank" }), cwd);
    expect(options.framework).toBe("astro");
    expect(options.template).toBe("astro-blank");
  });

  it("throws when --framework and --template disagree", async () => {
    await expect(
      resolveOptions(baseFlags({ framework: "astro", template: "dashboard" }), cwd),
    ).rejects.toThrow(/conflicts with --framework/);
  });

  it("turns off every extra when framework is astro, even under --yes", async () => {
    const options = await resolveOptions(baseFlags({ framework: "astro" }), cwd);
    expect(options.supabase).toBe(false);
    expect(options.auth).toBe(false);
    expect(options.pwa).toBe(false);
    expect(options.stripe).toBe(false);
    expect(options.drizzle).toBe(false);
    expect(options.analytics).toBe(false);
  });

  it("keeps nextjs as the default framework and resolves supabase/auth defaults under --yes", async () => {
    const options = await resolveOptions(baseFlags({}), cwd);
    expect(options.framework).toBe("nextjs");
    expect(options.supabase).toBe(true);
    expect(options.auth).toBe(true);
  });
});
