import * as clack from "@clack/prompts";
import path from "node:path";
import { detectPackageManager } from "./utils/detect-package-manager.js";
import type { CliFlags, PackageManager, ProjectOptions, Template } from "./types.js";
import { validateProjectName } from "./validate-project-name.js";

const YES_DEFAULTS = {
  template: "dashboard" as Template,
  supabase: true,
  auth: true,
  pwa: false,
};

/** Thrown when the user cancels an interactive prompt (Ctrl+C). */
export class PromptCancelledError extends Error {
  constructor() {
    super("Operation cancelled.");
    this.name = "PromptCancelledError";
  }
}

function unwrap<T>(value: T | symbol): T {
  if (clack.isCancel(value)) {
    throw new PromptCancelledError();
  }
  return value;
}

/**
 * Merges CLI flags with interactive prompts: any option already provided via
 * a flag is used as-is and never asked about. With `--yes`, every remaining
 * unanswered option falls back to the documented defaults instead of
 * prompting.
 */
export async function resolveOptions(flags: CliFlags, cwd: string): Promise<ProjectOptions> {
  const projectName = await resolveProjectName(flags, cwd);
  const targetDir = path.resolve(cwd, projectName);

  const template = flags.template ?? (await resolveTemplate(flags));
  const supabase = flags.supabase ?? (await resolveSupabase(flags));
  const auth = supabase ? (flags.auth ?? (await resolveAuth(flags))) : false;
  const pwa = flags.pwa ?? (await resolvePwa(flags));
  const packageManager = flags.packageManager ?? (await resolvePackageManager(flags));

  return {
    projectName,
    targetDir,
    template,
    supabase,
    auth,
    pwa,
    packageManager,
    skipInstall: flags.skipInstall,
    skipGit: flags.skipGit,
  };
}

async function resolveProjectName(flags: CliFlags, cwd: string): Promise<string> {
  if (flags.projectName) {
    const result = validateProjectName(flags.projectName, cwd);
    if (!result.valid) {
      throw new Error(result.reason);
    }
    return flags.projectName;
  }

  const answer = unwrap(
    await clack.text({
      message: "What's your project named?",
      placeholder: "my-app",
      validate: (value) => {
        const result = validateProjectName(value, cwd);
        return result.valid ? undefined : result.reason;
      },
    }),
  );

  return answer;
}

async function resolveTemplate(flags: CliFlags): Promise<Template> {
  if (flags.yes) {
    return YES_DEFAULTS.template;
  }

  return unwrap(
    await clack.select<Template>({
      message: "Which template do you want to start from?",
      options: [
        { value: "landing", label: "Landing page", hint: "hero, features, CTA, footer" },
        { value: "dashboard", label: "Dashboard", hint: "sidebar, header, example pages" },
        { value: "blank", label: "Blank", hint: "minimal structure" },
      ],
      initialValue: YES_DEFAULTS.template,
    }),
  );
}

async function resolveSupabase(flags: CliFlags): Promise<boolean> {
  if (flags.yes) {
    return YES_DEFAULTS.supabase;
  }

  return unwrap(
    await clack.confirm({
      message: "Include Supabase?",
      initialValue: YES_DEFAULTS.supabase,
    }),
  );
}

async function resolveAuth(flags: CliFlags): Promise<boolean> {
  if (flags.yes) {
    return YES_DEFAULTS.auth;
  }

  return unwrap(
    await clack.confirm({
      message: "Include email/password auth (login, register, protected routes)?",
      initialValue: YES_DEFAULTS.auth,
    }),
  );
}

async function resolvePwa(flags: CliFlags): Promise<boolean> {
  if (flags.yes) {
    return YES_DEFAULTS.pwa;
  }

  return unwrap(
    await clack.confirm({
      message: "Set up as a PWA (manifest, service worker, placeholder icons)?",
      initialValue: YES_DEFAULTS.pwa,
    }),
  );
}

async function resolvePackageManager(flags: CliFlags): Promise<PackageManager> {
  const detected = detectPackageManager();

  if (flags.yes) {
    return detected;
  }

  return unwrap(
    await clack.select<PackageManager>({
      message: "Which package manager do you want to use?",
      options: [
        { value: "npm", label: "npm" },
        { value: "pnpm", label: "pnpm" },
      ],
      initialValue: detected,
    }),
  );
}
