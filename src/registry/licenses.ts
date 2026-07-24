export interface LicenseDefinition {
  id: string;
  label: string;
  /** Filename under templates/licenses/, token-substituted and written as LICENSE. Absent for "no license". */
  file?: string;
}

export const LICENSES = [
  { id: "MIT", label: "MIT", file: "mit.txt" },
  { id: "Apache-2.0", label: "Apache License 2.0", file: "apache-2.0.txt" },
  { id: "None", label: "None" },
] as const satisfies readonly LicenseDefinition[];

export type LicenseId = (typeof LICENSES)[number]["id"];

export const DEFAULT_LICENSE: LicenseId = "MIT";
