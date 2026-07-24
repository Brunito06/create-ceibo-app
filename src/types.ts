import type { ExtraId } from "./registry/extras.js";
import type { LicenseId } from "./registry/licenses.js";
import type { Template } from "./registry/templates.js";

export type { Template } from "./registry/templates.js";
export type { ExtraId } from "./registry/extras.js";
export type { LicenseId } from "./registry/licenses.js";

export type PackageManager = "npm" | "pnpm";

export interface ProjectOptions extends Record<ExtraId, boolean> {
  projectName: string;
  targetDir: string;
  template: Template;
  packageManager: PackageManager;
  skipInstall: boolean;
  skipGit: boolean;
  author: string;
  description: string;
  license: LicenseId;
}

/**
 * What the user passed on the command line, before prompts fill in the gaps.
 * Undefined means "not specified, ask (or use --yes defaults)".
 */
export interface CliFlags extends Partial<Record<ExtraId, boolean>> {
  projectName?: string;
  template?: Template;
  packageManager?: PackageManager;
  author?: string;
  description?: string;
  license?: LicenseId;
  skipInstall: boolean;
  skipGit: boolean;
  yes: boolean;
}
