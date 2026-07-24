import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ProjectOptions } from "../types.js";
import { copyLayer } from "./copy-layer.js";
import { mergePackageJson } from "./merge-package-json.js";
import { findTemplatesRoot } from "./template-root.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = findTemplatesRoot(__dirname);

/**
 * Resolves the ordered list of template layers to apply for a given set of
 * options: base -> chosen template -> chosen extras. Later layers may
 * overwrite files from earlier ones, and package.json fragments are merged
 * rather than replaced.
 */
export function resolveLayers(options: ProjectOptions): string[] {
  const layers = ["base", options.template];

  if (options.supabase) {
    layers.push("extras/supabase");
  }
  if (options.supabase && options.auth) {
    layers.push("extras/auth");
  }
  if (options.pwa) {
    layers.push("extras/pwa");
  }

  return layers;
}

export async function generateProject(options: ProjectOptions): Promise<void> {
  await mkdir(options.targetDir, { recursive: true });

  const tokens = {
    __APP_NAME__: options.projectName,
    __APP_TITLE__: toTitleCase(options.projectName),
  };

  let pkg: Record<string, unknown> = {};

  for (const layer of resolveLayers(options)) {
    const layerDir = path.join(TEMPLATES_ROOT, layer);
    await copyLayer(layerDir, options.targetDir, {
      tokens,
      onPackageJson: (fragment) => {
        pkg = mergePackageJson(pkg, fragment);
      },
    });
  }

  const pkgPath = path.join(options.targetDir, "package.json");
  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

function toTitleCase(kebabCase: string): string {
  return kebabCase
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
