import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { EXTRAS, FRAMEWORKS, LICENSES, TEMPLATES } from "../src/registry/index.js";
import type { ExtraDefinition } from "../src/registry/extras.js";
import type { LicenseDefinition } from "../src/registry/licenses.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.resolve(__dirname, "..", "templates");

describe("registry", () => {
  it("has a unique id per template, with a matching templates/<id> directory", () => {
    const ids = TEMPLATES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const template of TEMPLATES) {
      expect(existsSync(path.join(TEMPLATES_ROOT, template.id))).toBe(true);
    }
  });

  it("has a unique id per framework, and every template references a real framework", () => {
    const frameworkIds = new Set(FRAMEWORKS.map((f) => f.id));
    expect(frameworkIds.size).toBe(FRAMEWORKS.length);

    for (const template of TEMPLATES) {
      expect(frameworkIds.has(template.framework)).toBe(true);
    }
  });

  it("has at least one template per framework, with a base layer directory", () => {
    for (const framework of FRAMEWORKS) {
      const templatesForFramework = TEMPLATES.filter((t) => t.framework === framework.id);
      expect(templatesForFramework.length).toBeGreaterThan(0);

      const baseDir = framework.id === "nextjs" ? "base" : `${framework.id}-base`;
      expect(existsSync(path.join(TEMPLATES_ROOT, baseDir))).toBe(true);
    }
  });

  it("has a unique id per extra, with a matching layer directory", () => {
    const ids = EXTRAS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const extra of EXTRAS) {
      expect(existsSync(path.join(TEMPLATES_ROOT, extra.layer))).toBe(true);
    }
  });

  it("only references dependsOn/conflictsWith ids that exist and appear earlier in the list", () => {
    const seen = new Set<string>();

    for (const extra of EXTRAS as readonly ExtraDefinition[]) {
      if (extra.dependsOn) {
        expect(seen.has(extra.dependsOn)).toBe(true);
      }
      if (extra.conflictsWith) {
        expect(seen.has(extra.conflictsWith)).toBe(true);
      }
      seen.add(extra.id);
    }
  });

  it("has a unique id per license, and a templates/licenses/<file> for every non-None license", () => {
    const ids = LICENSES.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const license of LICENSES as readonly LicenseDefinition[]) {
      if (license.file) {
        expect(existsSync(path.join(TEMPLATES_ROOT, "licenses", license.file))).toBe(true);
      }
    }
  });
});
