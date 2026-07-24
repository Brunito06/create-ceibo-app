import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { EXTRAS } from "../registry/index.js";
import type { CliFlags, ExtraId, ProjectOptions } from "../types.js";

export const CONFIG_FILENAME = "ceibo.config.json";

/**
 * Everything from a resolved project worth replaying on a future run.
 * `projectName`/`targetDir`/`skipInstall`/`skipGit` are per-invocation, not
 * reusable settings, so they're deliberately left out.
 */
export type SavedConfig = Partial<
  Pick<ProjectOptions, "framework" | "template" | "packageManager" | "author" | "description" | "license"> &
    Record<ExtraId, boolean>
>;

export function toSavedConfig(options: ProjectOptions): SavedConfig {
  return {
    framework: options.framework,
    template: options.template,
    packageManager: options.packageManager,
    author: options.author,
    description: options.description,
    license: options.license,
    ...(Object.fromEntries(EXTRAS.map((extra) => [extra.id, options[extra.id]])) as Record<
      ExtraId,
      boolean
    >),
  };
}

export async function saveConfigFile(options: ProjectOptions): Promise<void> {
  const configPath = path.join(options.targetDir, CONFIG_FILENAME);
  await writeFile(configPath, `${JSON.stringify(toSavedConfig(options), null, 2)}\n`, "utf8");
}

export async function loadConfigFile(configPath: string): Promise<SavedConfig> {
  const raw = await readFile(configPath, "utf8");
  return JSON.parse(raw) as SavedConfig;
}

/**
 * Fills in any flag the user didn't pass on the command line with the
 * matching value from a loaded config file — an explicit CLI flag always
 * wins over the config file, which in turn wins over interactive prompting.
 */
export function applyConfigDefaults(flags: CliFlags, config: SavedConfig): CliFlags {
  return {
    ...flags,
    framework: flags.framework ?? config.framework,
    template: flags.template ?? config.template,
    packageManager: flags.packageManager ?? config.packageManager,
    author: flags.author ?? config.author,
    description: flags.description ?? config.description,
    license: flags.license ?? config.license,
    ...(Object.fromEntries(
      EXTRAS.map((extra) => [extra.id, flags[extra.id] ?? config[extra.id]]),
    ) as Partial<Record<ExtraId, boolean>>),
  };
}
