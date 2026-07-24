import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findOwnPackageJson(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 6; i++) {
    const candidate = path.join(dir, "package.json");
    if (existsSync(candidate)) {
      const pkg = JSON.parse(readFileSync(candidate, "utf8")) as { name?: string };
      if (pkg.name === "create-ceibo-app") {
        return candidate;
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new Error("Could not locate create-ceibo-app's own package.json");
}

export function getCliVersion(): string {
  const pkgPath = findOwnPackageJson(__dirname);
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as { version: string };
  return pkg.version;
}
