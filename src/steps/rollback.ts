import { rm } from "node:fs/promises";

/** Removes a partially-generated project directory after a failure. */
export async function rollback(targetDir: string): Promise<void> {
  await rm(targetDir, { recursive: true, force: true });
}
