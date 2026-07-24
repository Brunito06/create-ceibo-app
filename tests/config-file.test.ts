import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { CliFlags, ProjectOptions } from "../src/types.js";
import { applyConfigDefaults, saveConfigFile, toSavedConfig } from "../src/utils/config-file.js";

function fullOptions(overrides: Partial<ProjectOptions> = {}): ProjectOptions {
  return {
    projectName: "test-app",
    targetDir: "",
    framework: "nextjs",
    template: "blank",
    supabase: true,
    auth: true,
    authjs: false,
    forms: false,
    pwa: false,
    stripe: false,
    drizzle: false,
    analytics: false,
    packageManager: "npm",
    skipInstall: true,
    skipGit: true,
    author: "Bruno",
    description: "A test project.",
    license: "MIT",
    ...overrides,
  };
}

describe("toSavedConfig", () => {
  it("omits per-invocation fields and keeps reusable settings", () => {
    const config = toSavedConfig(fullOptions());

    expect(config).not.toHaveProperty("projectName");
    expect(config).not.toHaveProperty("targetDir");
    expect(config).not.toHaveProperty("skipInstall");
    expect(config).not.toHaveProperty("skipGit");
    expect(config.template).toBe("blank");
    expect(config.supabase).toBe(true);
    expect(config.author).toBe("Bruno");
  });
});

describe("applyConfigDefaults", () => {
  const baseFlags: CliFlags = {
    skipInstall: false,
    skipGit: false,
    yes: false,
    saveConfig: true,
  };

  it("fills unset flags from the saved config", () => {
    const flags = applyConfigDefaults(baseFlags, { template: "dashboard", supabase: true });
    expect(flags.template).toBe("dashboard");
    expect(flags.supabase).toBe(true);
  });

  it("lets an explicit CLI flag win over the saved config", () => {
    const flags = applyConfigDefaults(
      { ...baseFlags, template: "blank" },
      { template: "dashboard" },
    );
    expect(flags.template).toBe("blank");
  });
});

describe("saveConfigFile", () => {
  let workDir: string;

  beforeEach(() => {
    workDir = mkdtempSync(path.join(tmpdir(), "ceibo-config-"));
  });

  afterEach(() => {
    rmSync(workDir, { recursive: true, force: true });
  });

  it("writes ceibo.config.json into the target directory", async () => {
    const options = fullOptions({ targetDir: workDir });
    await saveConfigFile(options);

    const configPath = path.join(workDir, "ceibo.config.json");
    expect(existsSync(configPath)).toBe(true);

    const saved = JSON.parse(readFileSync(configPath, "utf8"));
    expect(saved.template).toBe("blank");
    expect(saved.supabase).toBe(true);
    expect(saved).not.toHaveProperty("projectName");
  });
});
