import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Locates the package's `templates/` directory by walking up from `startDir`.
 * This is deliberately search-based rather than a fixed relative offset
 * because the distance to the package root differs between running the
 * bundled `dist/index.js` (one level up) and running source files directly
 * under `src/generator` during tests (two levels up).
 */
export function findTemplatesRoot(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(dir, "templates");
    if (existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new Error(`Could not locate the "templates" directory starting from ${startDir}`);
}
