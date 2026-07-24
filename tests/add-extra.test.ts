import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runAddExtra } from "../src/add-extra.js";
import { generateProject } from "../src/generator/generate.js";
import type { ProjectOptions } from "../src/types.js";
import { saveConfigFile } from "../src/utils/config-file.js";

function baseOptions(overrides: Partial<ProjectOptions>): ProjectOptions {
  return {
    projectName: "test-app",
    targetDir: "",
    framework: "nextjs",
    template: "blank",
    supabase: false,
    auth: false,
    authjs: false,
    forms: false,
    pwa: false,
    stripe: false,
    drizzle: false,
    analytics: false,
    testing: false,
    i18n: false,
    email: false,
    sentry: false,
    packageManager: "npm",
    skipInstall: true,
    skipGit: true,
    author: "Test Author",
    description: "A test project.",
    license: "MIT",
    ...overrides,
  };
}

/** Mirrors what index.ts's main() does: generate, then save the config — matching a real CLI run. */
async function generateWithConfig(overrides: Partial<ProjectOptions>): Promise<ProjectOptions> {
  const options = baseOptions(overrides);
  await generateProject(options);
  await saveConfigFile(options);
  return options;
}

describe("runAddExtra", () => {
  let workDir: string;

  beforeEach(() => {
    workDir = mkdtempSync(path.join(tmpdir(), "ceibo-add-extra-"));
  });

  afterEach(() => {
    process.exitCode = undefined;
    rmSync(workDir, { recursive: true, force: true });
  });

  it("adds a standalone extra (stripe) to an existing project", async () => {
    const targetDir = path.join(workDir, "my-app");
    await generateWithConfig({ targetDir });

    await runAddExtra(["stripe", "--dir", targetDir]);

    expect(existsSync(path.join(targetDir, "src", "lib", "stripe", "server.ts"))).toBe(true);
    expect(existsSync(path.join(targetDir, "src", "app", "pricing", "page.tsx"))).toBe(true);

    const pkg = JSON.parse(readFileSync(path.join(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies.stripe).toBeDefined();
    // pre-existing package.json fields survive the merge
    expect(pkg.name).toBe("test-app");

    const config = JSON.parse(readFileSync(path.join(targetDir, "ceibo.config.json"), "utf8"));
    expect(config.stripe).toBe(true);
  });

  it("refuses to add an extra whose dependency isn't enabled yet", async () => {
    const targetDir = path.join(workDir, "my-app");
    await generateWithConfig({ targetDir });

    await runAddExtra(["auth", "--dir", targetDir]);

    expect(process.exitCode).toBe(1);
    expect(existsSync(path.join(targetDir, "src", "app", "login", "page.tsx"))).toBe(false);
  });

  it("adds auth once its dependency (supabase) is already enabled", async () => {
    const targetDir = path.join(workDir, "my-app");
    await generateWithConfig({ targetDir, supabase: true });

    await runAddExtra(["auth", "--dir", targetDir]);

    expect(process.exitCode).toBeUndefined();
    expect(existsSync(path.join(targetDir, "src", "app", "login", "page.tsx"))).toBe(true);

    const config = JSON.parse(readFileSync(path.join(targetDir, "ceibo.config.json"), "utf8"));
    expect(config.auth).toBe(true);
    expect(config.supabase).toBe(true);
  });

  it("adds drizzle standalone without needing supabase", async () => {
    const targetDir = path.join(workDir, "my-app");
    await generateWithConfig({ targetDir });

    await runAddExtra(["drizzle", "--dir", targetDir]);

    expect(process.exitCode).toBeUndefined();
    expect(existsSync(path.join(targetDir, "drizzle.config.ts"))).toBe(true);

    const config = JSON.parse(readFileSync(path.join(targetDir, "ceibo.config.json"), "utf8"));
    expect(config.drizzle).toBe(true);
  });

  it("refuses to add an extra that conflicts with one already enabled", async () => {
    const targetDir = path.join(workDir, "my-app");
    await generateWithConfig({ targetDir, supabase: true, auth: true });

    await runAddExtra(["authjs", "--dir", targetDir]);

    expect(process.exitCode).toBe(1);
    expect(existsSync(path.join(targetDir, "src", "auth.ts"))).toBe(false);
  });

  it("rejects an unknown extra id without touching the project", async () => {
    const targetDir = path.join(workDir, "my-app");
    await generateWithConfig({ targetDir });

    await runAddExtra(["not-a-real-extra", "--dir", targetDir]);

    expect(process.exitCode).toBe(1);
  });

  it("still applies the extra (best-effort) when there's no ceibo.config.json to check", async () => {
    const targetDir = path.join(workDir, "my-app");
    await generateProject(baseOptions({ targetDir })); // no saveConfigFile call

    await runAddExtra(["stripe", "--dir", targetDir]);

    expect(process.exitCode).toBeUndefined();
    expect(existsSync(path.join(targetDir, "src", "lib", "stripe", "server.ts"))).toBe(true);
  });
});
