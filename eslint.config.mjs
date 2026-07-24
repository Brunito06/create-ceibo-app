// @ts-check
import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // TypeScript already catches genuine undefined references (and understands
      // ambient/type-only globals like `NodeJS`), so the core JS rule just produces
      // false positives here — this is typescript-eslint's own recommendation.
      "no-undef": "off",
    },
  },
  eslintConfigPrettier,
  {
    ignores: ["dist/**", "templates/**", "node_modules/**", "coverage/**"],
  },
];
