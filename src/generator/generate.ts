import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { EXTRAS, LICENSES } from "../registry/index.js";
import type { ExtraDefinition } from "../registry/extras.js";
import type { LicenseDefinition } from "../registry/licenses.js";
import type { ExtraId, ProjectOptions } from "../types.js";
import { toTitleCase } from "../utils/title-case.js";
import { applyTokens, copyLayer } from "./copy-layer.js";
import { mergePackageJson } from "./merge-package-json.js";
import { findTemplatesRoot } from "./template-root.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = findTemplatesRoot(__dirname);

/**
 * Resolves the ordered list of template layers to apply for a given set of
 * options: base -> chosen template -> chosen extras, in registry order.
 * Later layers may overwrite files from earlier ones, and package.json
 * fragments are merged rather than replaced. Re-checks `dependsOn` here (not
 * just in prompts.ts) because `generateProject` is also called directly by
 * tests, bypassing the interactive gating.
 */
export function resolveLayers(options: ProjectOptions): string[] {
  if (options.framework !== "nextjs") {
    // Every extra shipped so far is Next.js-specific (layout.tsx injection,
    // Server Actions, App Router middleware), so other frameworks only ever
    // get their own base + template layer.
    return [`${options.framework}-base`, options.template];
  }

  const layers = ["base", options.template];

  for (const extra of EXTRAS as readonly ExtraDefinition[]) {
    const dependsOn = extra.dependsOn as ExtraId | undefined;
    const conflictsWith = extra.conflictsWith as ExtraId | undefined;
    const dependencyOk = !dependsOn || options[dependsOn];
    const conflictOk = !conflictsWith || !options[conflictsWith];
    if (options[extra.id as ExtraId] && dependencyOk && conflictOk) {
      layers.push(extra.layer);
    }
  }

  return layers;
}

export async function generateProject(options: ProjectOptions): Promise<void> {
  await mkdir(options.targetDir, { recursive: true });

  const tokens = {
    __APP_NAME__: options.projectName,
    __APP_TITLE__: toTitleCase(options.projectName),
    __AUTHOR__: options.author,
    __DESCRIPTION__: options.description,
    __YEAR__: String(new Date().getFullYear()),
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

  pkg = {
    ...pkg,
    description: options.description,
    author: options.author,
    license: options.license === "None" ? undefined : options.license,
  };

  const pkgPath = path.join(options.targetDir, "package.json");
  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");

  await writeLicenseFile(options, tokens);
  await applyLayoutInjections(options);
}

/**
 * Splices each chosen extra's layout snippets (imports/exports/body) into
 * the three markers left in templates/base/src/app/layout.tsx, so extras
 * that both need to touch the root layout (e.g. pwa and analytics) compose
 * instead of one overwriting the other's file wholesale. Markers are always
 * replaced, even with an empty string, so none ever survive into output.
 */
async function applyLayoutInjections(options: ProjectOptions): Promise<void> {
  if (options.framework !== "nextjs") {
    return;
  }

  const layoutPath = path.join(options.targetDir, "src", "app", "layout.tsx");

  const chosen = (EXTRAS as readonly ExtraDefinition[]).filter(
    (extra) => options[extra.id as ExtraId] && extra.layoutInjection,
  );

  const imports = chosen.flatMap((extra) => extra.layoutInjection?.imports ?? []).join("\n");
  const exports = chosen.flatMap((extra) => extra.layoutInjection?.exports ?? []).join("\n\n");
  const body = chosen.flatMap((extra) => (extra.layoutInjection?.body ? [extra.layoutInjection.body] : [])).join("\n");

  const raw = await readFile(layoutPath, "utf8");
  const injected = raw
    .replace("// __LAYOUT_IMPORTS__", imports)
    .replace("// __LAYOUT_EXPORTS__", exports)
    .replace("{/* __BODY_EXTRAS__ */}", body);

  await writeFile(layoutPath, injected, "utf8");
}

async function writeLicenseFile(
  options: ProjectOptions,
  tokens: Record<string, string>,
): Promise<void> {
  const licenseDef = (LICENSES as readonly LicenseDefinition[]).find((l) => l.id === options.license);
  if (!licenseDef?.file) {
    return;
  }

  const raw = await readFile(path.join(TEMPLATES_ROOT, "licenses", licenseDef.file), "utf8");
  await writeFile(path.join(options.targetDir, "LICENSE"), applyTokens(raw, tokens), "utf8");
}
