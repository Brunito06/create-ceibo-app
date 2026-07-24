import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { applyTokens, copyLayer } from "./generator/copy-layer.js";
import { mergePackageJson } from "./generator/merge-package-json.js";
import { findTemplatesRoot } from "./generator/template-root.js";
import { EXTRAS } from "./registry/index.js";
import type { ExtraDefinition } from "./registry/extras.js";
import type { ExtraId } from "./types.js";
import { loadConfigFile, type SavedConfig } from "./utils/config-file.js";
import { logError, logStep, logWarn, outroSuccess } from "./utils/logger.js";
import { toTitleCase } from "./utils/title-case.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = findTemplatesRoot(__dirname);
const EXTRA_IDS = EXTRAS.map((e) => e.id);

/**
 * Applies a single extra's layer onto an already-generated project instead
 * of a fresh one. Reuses the same `copyLayer`/`mergePackageJson` machinery
 * as `generateProject`, but merges the extra's package.json fragment into
 * the project's *existing* package.json rather than an in-memory one built
 * up from scratch.
 *
 * Known limitation: extras with a `layoutInjection` (pwa, analytics) can
 * only splice into `src/app/layout.tsx` via the markers left there by
 * `generateProject` — those markers are consumed at generation time, so
 * they no longer exist in an already-generated project. For those extras
 * this command still copies every other file, but prints the snippet you'd
 * need to paste into `layout.tsx` by hand instead of injecting it.
 */
export async function runAddExtra(argv: string[]): Promise<void> {
  const program = new Command();

  program
    .name("create-ceibo-app add")
    .description("Add an extra to an already-generated create-ceibo-app project.")
    .argument("<extra>", EXTRA_IDS.join(" | "))
    .option("--dir <path>", "target project directory", ".");

  program.parse(argv, { from: "user" });

  const [extraId] = program.args as [string];
  const { dir } = program.opts<{ dir: string }>();
  const targetDir = path.resolve(process.cwd(), dir);

  const extra = EXTRAS.find((e) => e.id === extraId) as ExtraDefinition | undefined;
  if (!extra) {
    logError(`Unknown extra "${extraId}". Expected one of: ${EXTRA_IDS.join(", ")}.`);
    process.exitCode = 1;
    return;
  }

  const configPath = path.join(targetDir, "ceibo.config.json");
  let config: SavedConfig = {};
  let hasConfig = false;

  try {
    config = await loadConfigFile(configPath);
    hasConfig = true;
  } catch {
    logWarn(`No ceibo.config.json found in ${targetDir} — skipping dependency/conflict checks.`);
  }

  if (hasConfig) {
    const dependsOn = extra.dependsOn as ExtraId | undefined;
    if (dependsOn && !config[dependsOn]) {
      logError(`"${extra.id}" requires "${dependsOn}" — run "add ${dependsOn}" first.`);
      process.exitCode = 1;
      return;
    }

    const conflictsWith = extra.conflictsWith as ExtraId | undefined;
    if (conflictsWith && config[conflictsWith]) {
      logError(`"${extra.id}" conflicts with "${conflictsWith}", which is already enabled.`);
      process.exitCode = 1;
      return;
    }

    if (config[extra.id as ExtraId]) {
      logWarn(`"${extra.id}" already appears to be enabled — continuing anyway.`);
    }
  }

  const pkgPath = path.join(targetDir, "package.json");
  let existingPkgRaw: string;
  try {
    existingPkgRaw = await readFile(pkgPath, "utf8");
  } catch {
    logError(`No package.json found in ${targetDir} — is this a create-ceibo-app project?`);
    process.exitCode = 1;
    return;
  }

  const existingPkg = JSON.parse(existingPkgRaw) as Record<string, unknown> & {
    name?: string;
    author?: string;
    description?: string;
  };

  const appName = typeof existingPkg.name === "string" ? existingPkg.name : path.basename(targetDir);

  const tokens = {
    __APP_NAME__: appName,
    __APP_TITLE__: toTitleCase(appName),
    __AUTHOR__: config.author ?? (typeof existingPkg.author === "string" ? existingPkg.author : ""),
    __DESCRIPTION__:
      config.description ?? (typeof existingPkg.description === "string" ? existingPkg.description : ""),
    __YEAR__: String(new Date().getFullYear()),
  };

  let pkgFragment: Record<string, unknown> = {};
  await copyLayer(path.join(TEMPLATES_ROOT, extra.layer), targetDir, {
    tokens,
    onPackageJson: (fragment) => {
      pkgFragment = mergePackageJson(pkgFragment, fragment);
    },
  });

  const mergedPkg = mergePackageJson(existingPkg, pkgFragment);
  await writeFile(pkgPath, `${JSON.stringify(mergedPkg, null, 2)}\n`, "utf8");

  if (extra.layoutInjection) {
    logWarn(
      "This extra normally also wires into src/app/layout.tsx, but that only happens during initial generation. Add this to your layout.tsx by hand:",
    );
    const { imports = [], exports: layoutExports = [], body } = extra.layoutInjection;
    for (const line of [...imports, ...layoutExports, ...(body ? [body] : [])]) {
      console.log(`  ${applyTokens(line, tokens)}`);
    }
  }

  const updatedConfig: SavedConfig = { ...config, [extra.id]: true };
  await writeFile(configPath, `${JSON.stringify(updatedConfig, null, 2)}\n`, "utf8");

  logStep(`Added "${extra.id}" to ${targetDir}`);
  outroSuccess("Run your package manager's install command to pick up any new dependencies.");
}
