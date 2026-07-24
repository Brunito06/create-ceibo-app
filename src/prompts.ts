import * as clack from "@clack/prompts";
import path from "node:path";
import { DEFAULT_LICENSE, DEFAULT_TEMPLATE, EXTRAS, LICENSES, TEMPLATES } from "./registry/index.js";
import type { ExtraDefinition } from "./registry/extras.js";
import type { CliFlags, ExtraId, LicenseId, PackageManager, ProjectOptions, Template } from "./types.js";
import { detectGitAuthor } from "./utils/detect-git-author.js";
import { detectPackageManager } from "./utils/detect-package-manager.js";
import { validateProjectName } from "./validate-project-name.js";

const DEFAULT_DESCRIPTION = "Built with create-ceibo-app.";

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
 * unanswered option falls back to the registry's documented defaults instead
 * of prompting.
 */
export async function resolveOptions(flags: CliFlags, cwd: string): Promise<ProjectOptions> {
  const projectName = await resolveProjectName(flags, cwd);
  const targetDir = path.resolve(cwd, projectName);

  const template = flags.template ?? (await resolveTemplate(flags));
  const extras = await resolveExtras(flags);
  const author = flags.author ?? (await resolveAuthor(flags));
  const description = flags.description ?? (await resolveDescription(flags));
  const license = flags.license ?? (await resolveLicense(flags));
  const packageManager = flags.packageManager ?? (await resolvePackageManager(flags));

  return {
    projectName,
    targetDir,
    template,
    packageManager,
    author,
    description,
    license,
    skipInstall: flags.skipInstall,
    skipGit: flags.skipGit,
    ...extras,
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
    return DEFAULT_TEMPLATE;
  }

  return unwrap(
    await clack.select<Template>({
      message: "Which template do you want to start from?",
      options: TEMPLATES.map((t) => ({ value: t.id, label: t.label, hint: t.hint })),
      initialValue: DEFAULT_TEMPLATE,
    }),
  );
}

/**
 * Resolves every registered extra in registry order, gating each on its
 * `dependsOn` (forced off, never prompted, if the dependency ended up off) —
 * relies on the registry listing a dependency before anything that depends
 * on it.
 */
async function resolveExtras(flags: CliFlags): Promise<Record<ExtraId, boolean>> {
  const extras = {} as Record<ExtraId, boolean>;

  for (const extra of EXTRAS as readonly ExtraDefinition[]) {
    const id = extra.id as ExtraId;
    const dependsOn = extra.dependsOn as ExtraId | undefined;

    if (dependsOn && !extras[dependsOn]) {
      extras[id] = false;
      continue;
    }

    extras[id] = flags[id] ?? (await resolveExtra(extra, flags));
  }

  return extras;
}

async function resolveExtra(extra: ExtraDefinition, flags: CliFlags): Promise<boolean> {
  if (flags.yes) {
    return extra.yesDefault;
  }

  return unwrap(
    await clack.confirm({
      message: extra.promptMessage,
      initialValue: extra.yesDefault,
    }),
  );
}

async function resolveAuthor(flags: CliFlags): Promise<string> {
  const detected = await detectGitAuthor();

  if (flags.yes) {
    return detected ?? "";
  }

  return unwrap(
    await clack.text({
      message: "What's your name (used as the package author)?",
      placeholder: detected ?? "Jane Doe",
      initialValue: detected ?? "",
    }),
  );
}

async function resolveDescription(flags: CliFlags): Promise<string> {
  if (flags.yes) {
    return DEFAULT_DESCRIPTION;
  }

  return unwrap(
    await clack.text({
      message: "Short project description?",
      placeholder: DEFAULT_DESCRIPTION,
      initialValue: DEFAULT_DESCRIPTION,
    }),
  );
}

async function resolveLicense(flags: CliFlags): Promise<LicenseId> {
  if (flags.yes) {
    return DEFAULT_LICENSE;
  }

  return unwrap(
    await clack.select<LicenseId>({
      message: "Which license do you want to use?",
      options: LICENSES.map((l) => ({ value: l.id, label: l.label })),
      initialValue: DEFAULT_LICENSE,
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
