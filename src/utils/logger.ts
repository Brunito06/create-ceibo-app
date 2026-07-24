import * as clack from "@clack/prompts";
import pc from "picocolors";
import type { ProjectOptions } from "../types.js";

export const intro = () => clack.intro(pc.bgGreen(pc.black(" create-ceibo-app ")));

export const outroSuccess = (message: string) => clack.outro(pc.green(message));

export const outroFail = (message: string) => clack.outro(pc.red(message));

export const spinner = () => clack.spinner();

export const logInfo = (message: string) => clack.log.info(message);
export const logWarn = (message: string) => clack.log.warn(message);
export const logError = (message: string) => clack.log.error(message);
export const logStep = (message: string) => clack.log.step(message);

export function printNextSteps(options: ProjectOptions): void {
  const lines: string[] = [pc.bold("Next steps:"), "", `  cd ${options.projectName}`];

  if (options.skipInstall) {
    lines.push(`  ${options.packageManager} install`);
  }

  if (options.supabase) {
    lines.push("  cp .env.example .env.local", "  # then fill in your Supabase project keys");
  }

  lines.push(`  ${options.packageManager} run dev`);

  if (options.supabase) {
    lines.push("", pc.dim("Need a Supabase project? https://supabase.com/dashboard"));
  }

  clack.note(lines.join("\n"), "Ready to build");
}
