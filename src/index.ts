import path from "node:path";
import pc from "picocolors";
import { runAddExtra } from "./add-extra.js";
import { parseCli } from "./cli.js";
import { generateProject } from "./generator/generate.js";
import { PromptCancelledError, resolveOptions } from "./prompts.js";
import { initGit } from "./steps/init-git.js";
import { installDependencies } from "./steps/install-dependencies.js";
import { rollback } from "./steps/rollback.js";
import type { CliFlags, ProjectOptions } from "./types.js";
import { applyConfigDefaults, loadConfigFile, saveConfigFile } from "./utils/config-file.js";
import { intro, logError, logStep, logWarn, outroFail, outroSuccess, printNextSteps, spinner } from "./utils/logger.js";

async function main(): Promise<void> {
  if (process.argv[2] === "add") {
    await runAddExtra(process.argv.slice(3));
    return;
  }

  intro();

  let flags: CliFlags = parseCli(process.argv);

  if (flags.configPath) {
    const saved = await loadConfigFile(path.resolve(process.cwd(), flags.configPath));
    flags = applyConfigDefaults(flags, saved);
  }

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
    if (flags.saveConfig) {
      await saveConfigFile(options);
    }
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
