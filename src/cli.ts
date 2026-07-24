import { Command } from "commander";
import type { CliFlags, PackageManager, Template } from "./types.js";
import { getCliVersion } from "./utils/package-info.js";

const TEMPLATES: Template[] = ["landing", "dashboard", "blank"];
const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm"];

export function parseCli(argv: string[]): CliFlags {
  const program = new Command();

  program
    .name("create-ceibo-app")
    .description(
      "Scaffold a new Next.js + Supabase + Tailwind + shadcn/ui project with Ceibo Labs conventions.",
    )
    .version(getCliVersion())
    .argument("[project-name]", "name of the project / target directory")
    .option("-t, --template <template>", "landing | dashboard | blank")
    .option("--supabase", "include Supabase")
    .option("--no-supabase", "skip Supabase")
    .option("--auth", "include Supabase email/password auth")
    .option("--no-auth", "skip auth")
    .option("--pwa", "configure as a PWA")
    .option("--no-pwa", "skip PWA setup")
    .option("--pm <manager>", "npm | pnpm")
    .option("--skip-install", "skip installing dependencies", false)
    .option("--no-git", "skip git initialisation")
    .option("-y, --yes", "use defaults for anything not specified via flags", false);

  program.parse(argv);

  const opts = program.opts();
  const [projectName] = program.args as [string | undefined];

  if (opts.template && !TEMPLATES.includes(opts.template)) {
    program.error(`Invalid --template "${opts.template}". Expected one of: ${TEMPLATES.join(", ")}.`);
  }

  if (opts.pm && !PACKAGE_MANAGERS.includes(opts.pm)) {
    program.error(`Invalid --pm "${opts.pm}". Expected one of: ${PACKAGE_MANAGERS.join(", ")}.`);
  }

  return {
    projectName,
    template: opts.template as Template | undefined,
    supabase: opts.supabase as boolean | undefined,
    auth: opts.auth as boolean | undefined,
    pwa: opts.pwa as boolean | undefined,
    packageManager: opts.pm as PackageManager | undefined,
    skipInstall: Boolean(opts.skipInstall),
    skipGit: opts.git === false,
    yes: Boolean(opts.yes),
  };
}
