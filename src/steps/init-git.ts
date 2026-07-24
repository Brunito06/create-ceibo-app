import { execa } from "execa";

export async function initGit(targetDir: string): Promise<void> {
  await execa("git", ["init"], { cwd: targetDir, stdio: "pipe" });
  await execa("git", ["add", "-A"], { cwd: targetDir, stdio: "pipe" });
  await execa(
    "git",
    ["commit", "-m", "chore: initial commit from create-ceibo-app"],
    {
      cwd: targetDir,
      stdio: "pipe",
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: "create-ceibo-app",
        GIT_AUTHOR_EMAIL: "noreply@ceibolabs.dev",
        GIT_COMMITTER_NAME: "create-ceibo-app",
        GIT_COMMITTER_EMAIL: "noreply@ceibolabs.dev",
      },
    },
  );
}
