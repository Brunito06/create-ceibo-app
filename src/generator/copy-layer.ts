import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Docs that compose across layers instead of being overwritten: each layer
 * that ships one of these appends its section rather than replacing the
 * file, so e.g. the Supabase extra's "## Supabase" section survives
 * alongside the base template's CLAUDE.md.
 */
const APPENDABLE_FILES = new Set(["CLAUDE.md", "README.md", ".env.example"]);

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".css",
  ".yml",
  ".yaml",
  ".txt",
  ".html",
  ".astro",
]);

export interface CopyLayerOptions {
  tokens: Record<string, string>;
  /** package.json files are never written directly; they're handed off for merging. */
  onPackageJson: (pkg: Record<string, unknown>) => void;
}

/**
 * Recursively copies a template layer into the target directory, applying
 * `__TOKEN__` replacement to text files. `gitignore` files (stored without a
 * leading dot so npm doesn't mangle them on publish) are renamed to
 * `.gitignore`. `package.json` files are parsed and handed to `onPackageJson`
 * instead of being written, so the caller can deep-merge layers.
 */
export async function copyLayer(
  layerDir: string,
  targetDir: string,
  options: CopyLayerOptions,
): Promise<void> {
  const entries = await readdir(layerDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(layerDir, entry.name);
    const destName = entry.name === "gitignore" ? ".gitignore" : entry.name;
    const destPath = path.join(targetDir, destName);

    if (entry.isDirectory()) {
      await mkdir(destPath, { recursive: true });
      await copyLayer(srcPath, destPath, options);
      continue;
    }

    if (destName === "package.json") {
      const raw = await readFile(srcPath, "utf8");
      options.onPackageJson(JSON.parse(applyTokens(raw, options.tokens)));
      continue;
    }

    await mkdir(path.dirname(destPath), { recursive: true });

    if (APPENDABLE_FILES.has(destName)) {
      const raw = await readFile(srcPath, "utf8");
      const section = applyTokens(raw, options.tokens);
      const existing = await readExistingIfAny(destPath);
      const combined = existing ? `${existing.trimEnd()}\n\n${section}` : section;
      await writeFile(destPath, combined, "utf8");
      continue;
    }

    const ext = path.extname(entry.name);
    if (TEXT_EXTENSIONS.has(ext) || entry.name === "gitignore") {
      const raw = await readFile(srcPath, "utf8");
      await writeFile(destPath, applyTokens(raw, options.tokens), "utf8");
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function readExistingIfAny(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}

export function applyTokens(content: string, tokens: Record<string, string>): string {
  let result = content;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.split(token).join(value);
  }
  return result;
}
