import { execa } from "execa";
import type { PackageManager } from "../types.js";

export async function installDependencies(
  targetDir: string,
  packageManager: PackageManager,
): Promise<void> {
  await execa(packageManager, ["install"], {
    cwd: targetDir,
    stdio: "pipe",
  });
}
