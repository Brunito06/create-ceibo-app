import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { generateProject } from "../src/generator/generate.js";
import type { ProjectOptions } from "../src/types.js";

function baseOptions(overrides: Partial<ProjectOptions>): ProjectOptions {
  return {
    projectName: "test-app",
    targetDir: "",
    template: "blank",
    supabase: false,
    auth: false,
    pwa: false,
    packageManager: "npm",
    skipInstall: true,
    skipGit: true,
    ...overrides,
  };
}

describe("generateProject", () => {
  let workDir: string;

  beforeEach(() => {
    workDir = mkdtempSync(path.join(tmpdir(), "ceibo-generate-"));
  });

  afterEach(() => {
    rmSync(workDir, { recursive: true, force: true });
  });

  function file(targetDir: string, ...segments: string[]): string {
    return path.join(targetDir, ...segments);
  }

  it("generates a blank project with no extras", async () => {
    const targetDir = path.join(workDir, "blank-app");
    const options = baseOptions({ targetDir, template: "blank" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "package.json"))).toBe(true);
    expect(existsSync(file(targetDir, "CLAUDE.md"))).toBe(true);
    expect(existsSync(file(targetDir, "README.md"))).toBe(true);
    expect(existsSync(file(targetDir, ".gitignore"))).toBe(true);
    expect(existsSync(file(targetDir, "gitignore"))).toBe(false);
    expect(existsSync(file(targetDir, "src", "app", "layout.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "components", "ui", "button.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "middleware.ts"))).toBe(false);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.name).toBe("test-app");
    expect(pkg.dependencies.next).toBeDefined();
    expect(pkg.dependencies["@supabase/ssr"]).toBeUndefined();

    const layout = readFileSync(file(targetDir, "src", "app", "layout.tsx"), "utf8");
    expect(layout).not.toContain("__APP_TITLE__");
  });

  it("generates a dashboard project with supabase + auth", async () => {
    const targetDir = path.join(workDir, "dashboard-app");
    const options = baseOptions({
      targetDir,
      template: "dashboard",
      supabase: true,
      auth: true,
    });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "app", "(dashboard)", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "(dashboard)", "settings", "page.tsx"))).toBe(
      true,
    );
    expect(existsSync(file(targetDir, "src", "app", "login", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "register", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "profile", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "middleware.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "supabase", "client.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "supabase", "server.ts"))).toBe(true);
    expect(existsSync(file(targetDir, ".env.example"))).toBe(true);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["@supabase/ssr"]).toBeDefined();
    expect(pkg.dependencies["@supabase/supabase-js"]).toBeDefined();

    const claude = readFileSync(file(targetDir, "CLAUDE.md"), "utf8");
    expect(claude).toContain("## Supabase");
    expect(claude).toContain("## Authentication");

    const middleware = readFileSync(file(targetDir, "src", "middleware.ts"), "utf8");
    expect(middleware).toContain("PUBLIC_PATHS");
  });

  it("generates a landing project with pwa but no supabase", async () => {
    const targetDir = path.join(workDir, "landing-app");
    const options = baseOptions({
      targetDir,
      template: "landing",
      pwa: true,
    });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "components", "shared", "hero.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "manifest.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "public", "sw.js"))).toBe(true);
    expect(existsSync(file(targetDir, "public", "icons", "icon.svg"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "middleware.ts"))).toBe(false);
    expect(existsSync(file(targetDir, "src", "lib", "supabase"))).toBe(false);

    const layout = readFileSync(file(targetDir, "src", "app", "layout.tsx"), "utf8");
    expect(layout).toContain("RegisterServiceWorker");

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["@supabase/ssr"]).toBeUndefined();
  });
});
