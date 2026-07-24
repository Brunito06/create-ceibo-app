import { existsSync } from "node:fs";
import path from "node:path";

const KEBAB_CASE_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validates a project name: must be kebab-case (npm package name friendly)
 * and must not collide with an existing directory in `cwd`.
 */
export function validateProjectName(name: string, cwd = process.cwd()): ValidationResult {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: "Project name cannot be empty." };
  }

  if (/\s/.test(trimmed)) {
    return { valid: false, reason: "Project name cannot contain spaces." };
  }

  if (!KEBAB_CASE_RE.test(trimmed)) {
    return {
      valid: false,
      reason: "Use kebab-case: lowercase letters, numbers and hyphens only (e.g. my-app).",
    };
  }

  const targetDir = path.join(cwd, trimmed);
  if (existsSync(targetDir)) {
    return { valid: false, reason: `A directory named "${trimmed}" already exists.` };
  }

  return { valid: true };
}
