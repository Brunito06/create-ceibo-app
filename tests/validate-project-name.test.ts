import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { validateProjectName } from "../src/validate-project-name.js";

describe("validateProjectName", () => {
  let cwd: string;

  beforeEach(() => {
    cwd = mkdtempSync(path.join(tmpdir(), "ceibo-validate-"));
  });

  afterEach(() => {
    rmSync(cwd, { recursive: true, force: true });
  });

  it.each(["my-app", "app", "my-app-2", "a1-b2"])("accepts kebab-case name %s", (name) => {
    expect(validateProjectName(name, cwd)).toEqual({ valid: true });
  });

  it("rejects an empty name", () => {
    expect(validateProjectName("", cwd).valid).toBe(false);
  });

  it("rejects names with spaces", () => {
    expect(validateProjectName("my app", cwd).valid).toBe(false);
  });

  it.each(["MyApp", "my_app", "-my-app", "my-app-", "my--app", "1-app"])(
    "rejects non kebab-case name %s",
    (name) => {
      expect(validateProjectName(name, cwd).valid).toBe(false);
    },
  );

  it("rejects a name that collides with an existing directory", () => {
    mkdirSync(path.join(cwd, "taken"));
    const result = validateProjectName("taken", cwd);
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/already exists/);
  });
});
