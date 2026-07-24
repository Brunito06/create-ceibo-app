type PackageJson = Record<string, unknown>;

const MERGED_RECORD_FIELDS = ["dependencies", "devDependencies", "scripts"] as const;

/**
 * Merges a template layer's package.json fragment into the accumulated
 * result. Scalar fields (name, version, ...) from `next` win when present;
 * `dependencies` / `devDependencies` / `scripts` are merged key-by-key
 * instead of being replaced wholesale.
 */
export function mergePackageJson(base: PackageJson, next: PackageJson): PackageJson {
  const merged: PackageJson = { ...base, ...next };

  for (const field of MERGED_RECORD_FIELDS) {
    const baseRecord = asRecord(base[field]);
    const nextRecord = asRecord(next[field]);
    if (baseRecord || nextRecord) {
      merged[field] = sortByKey({ ...baseRecord, ...nextRecord });
    }
  }

  return merged;
}

function asRecord(value: unknown): Record<string, string> | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, string>;
  }
  return undefined;
}

function sortByKey(record: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)));
}
