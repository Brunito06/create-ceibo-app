import { Command } from "commander";
import { EXTRAS, LICENSES, TEMPLATES } from "./registry/index.js";
import type { CliFlags, ExtraId, LicenseId, PackageManager, Template } from "./types.js";
import { getCliVersion } from "./utils/package-info.js";

const TEMPLATE_IDS = TEMPLATES.map((t) => t.id);
const LICENSE_IDS = LICENSES.map((l) => l.id);
const PACKAGE_MANAGERS: PackageManager[] = ["npm", "pnpm"];

export function parseCli(argv: string[]): CliFlags {
  const program = new Command();

  program
    .name("create-ceibo-app")
    .description(
      "Scaffold a new Next.js + Supabase + Tailwind + shadcn/ui project with Brunito06 conventions.",
    )
    .version(getCliVersion())
    .argument("[project-name]", "name of the project / target directory")
    .option("-t, --template <template>", TEMPLATE_IDS.join(" | "))
    .option("--pm <manager>", "npm | pnpm")
    .option("--author <name>", "author name, written to package.json and the LICENSE file")
    .option("--description <text>", "short project description, written to package.json")
    .option("--license <id>", LICENSE_IDS.join(" | "))
    .option("--skip-install", "skip installing dependencies", false)
    .option("--no-git", "skip git initialisation")
    .option("-y, --yes", "use defaults for anything not specified via flags", false);

  for (const extra of EXTRAS) {
    program.option(`--${extra.id}`, `include ${extra.label}`);
    program.option(`--no-${extra.id}`, `skip ${extra.label}`);
  }

  program.parse(argv);

  const opts = program.opts();
  const [projectName] = program.args as [string | undefined];

  if (opts.template && !TEMPLATE_IDS.includes(opts.template)) {
    program.error(`Invalid --template "${opts.template}". Expected one of: ${TEMPLATE_IDS.join(", ")}.`);
  }

  if (opts.pm && !PACKAGE_MANAGERS.includes(opts.pm)) {
    program.error(`Invalid --pm "${opts.pm}". Expected one of: ${PACKAGE_MANAGERS.join(", ")}.`);
  }

  if (opts.license && !LICENSE_IDS.includes(opts.license)) {
    program.error(`Invalid --license "${opts.license}". Expected one of: ${LICENSE_IDS.join(", ")}.`);
  }

  const extraFlags = Object.fromEntries(
    EXTRAS.map((extra) => [extra.id, opts[extra.id] as boolean | undefined]),
  ) as Partial<Record<ExtraId, boolean>>;

  return {
    projectName,
    template: opts.template as Template | undefined,
    packageManager: opts.pm as PackageManager | undefined,
    author: opts.author as string | undefined,
    description: opts.description as string | undefined,
    license: opts.license as LicenseId | undefined,
    skipInstall: Boolean(opts.skipInstall),
    skipGit: opts.git === false,
    yes: Boolean(opts.yes),
    ...extraFlags,
  };
}
