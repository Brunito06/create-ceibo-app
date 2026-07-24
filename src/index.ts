import pc from "picocolors";
import { parseCli } from "./cli.js";
import { generateProject } from "./generator/generate.js";
import { PromptCancelledError, resolveOptions } from "./prompts.js";
import { initGit } from "./steps/init-git.js";
import { installDependencies } from "./steps/install-dependencies.js";
import { rollback } from "./steps/rollback.js";
import type { ProjectOptions } from "./types.js";
import { intro, logError, logStep, logWarn, outroFail, outroSuccess, printNextSteps, spinner } from "./utils/logger.js";

async function main(): Promise<void> {
  intro();

  const flags = parseCli(process.argv);
  let options: ProjectOptions;

  try {
    options = await resolveOptions(flags, process.cwd());
  } catch (error) {
    if (error instanceof PromptCancelledError) {
      outroFail("Cancelled.");
      process.exit(0);
    }
    throw error;
  }

  const s = spinner();

  try {
    s.start("Generating project files");
    await generateProject(options);
    s.stop("Project files generated");

    if (options.skipInstall) {
      logStep(`Skipped dependency install (run "${options.packageManager} install" yourself)`);
    } else {
      s.start(`Installing dependencies with ${options.packageManager}`);
      await installDependencies(options.targetDir, options.packageManager);
      s.stop("Dependencies installed");
    }

    if (options.skipGit) {
      logStep("Skipped git initialisation");
    } else {
      s.start("Initialising git repository");
      await initGit(options.targetDir);
      s.stop("Git repository initialised");
    }
  } catch (error) {
    s.stop("Something went wrong", 1);
    logError(error instanceof Error ? error.message : String(error));
    logWarn(`Cleaning up ${options.targetDir}`);
    await rollback(options.targetDir);
    outroFail("Project generation failed. The partially created directory was removed.");
    process.exitCode = 1;
    return;
  }

  printNextSteps(options);
  outroSuccess(`${pc.bold(options.projectName)} is ready.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
