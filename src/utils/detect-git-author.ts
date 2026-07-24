import { execa } from "execa";

/** Reads `git config user.name` as a prompt default. Never throws — returns undefined if git or the config entry is unavailable. */
export async function detectGitAuthor(): Promise<string | undefined> {
  try {
    const { stdout } = await execa("git", ["config", "--get", "user.name"]);
    const name = stdout.trim();
    return name.length > 0 ? name : undefined;
  } catch {
    return undefined;
  }
}
