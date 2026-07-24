export type Template = "landing" | "dashboard" | "blank";

export type PackageManager = "npm" | "pnpm";

export interface ProjectOptions {
  projectName: string;
  targetDir: string;
  template: Template;
  supabase: boolean;
  auth: boolean;
  pwa: boolean;
  packageManager: PackageManager;
  skipInstall: boolean;
  skipGit: boolean;
}

/**
 * What the user passed on the command line, before prompts fill in the gaps.
 * Undefined means "not specified, ask (or use --yes defaults)".
 */
export interface CliFlags {
  projectName?: string;
  template?: Template;
  supabase?: boolean;
  auth?: boolean;
  pwa?: boolean;
  packageManager?: PackageManager;
  skipInstall: boolean;
  skipGit: boolean;
  yes: boolean;
}
