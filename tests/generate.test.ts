import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { generateProject } from "../src/generator/generate.js";
import type { ProjectOptions } from "../src/types.js";

function baseOptions(overrides: Partial<ProjectOptions>): ProjectOptions {
  return {
    projectName: "test-app",
    targetDir: "",
    framework: "nextjs",
    template: "blank",
    supabase: false,
    auth: false,
    authjs: false,
    forms: false,
    pwa: false,
    stripe: false,
    drizzle: false,
    analytics: false,
    packageManager: "npm",
    skipInstall: true,
    skipGit: true,
    author: "Test Author",
    description: "A test project.",
    license: "MIT",
    ...overrides,
  };
}

describe("generateProject", () => {
  let workDir: string;

  beforeEach(() => {
    workDir = mkdtempSync(path.join(tmpdir(), "ceibo-generate-"));
  });

  afterEach(() => {
    rmSync(workDir, { recursive: true, force: true });
  });

  function file(targetDir: string, ...segments: string[]): string {
    return path.join(targetDir, ...segments);
  }

  it("generates a blank project with no extras", async () => {
    const targetDir = path.join(workDir, "blank-app");
    const options = baseOptions({ targetDir, template: "blank" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "package.json"))).toBe(true);
    expect(existsSync(file(targetDir, "CLAUDE.md"))).toBe(true);
    expect(existsSync(file(targetDir, "README.md"))).toBe(true);
    expect(existsSync(file(targetDir, ".gitignore"))).toBe(true);
    expect(existsSync(file(targetDir, "gitignore"))).toBe(false);
    expect(existsSync(file(targetDir, "src", "app", "layout.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "components", "ui", "button.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "middleware.ts"))).toBe(false);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.name).toBe("test-app");
    expect(pkg.dependencies.next).toBeDefined();
    expect(pkg.dependencies["@supabase/ssr"]).toBeUndefined();

    const layout = readFileSync(file(targetDir, "src", "app", "layout.tsx"), "utf8");
    expect(layout).not.toContain("__APP_TITLE__");
  });

  it("generates a dashboard project with supabase + auth", async () => {
    const targetDir = path.join(workDir, "dashboard-app");
    const options = baseOptions({
      targetDir,
      template: "dashboard",
      supabase: true,
      auth: true,
    });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "app", "(dashboard)", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "(dashboard)", "settings", "page.tsx"))).toBe(
      true,
    );
    expect(existsSync(file(targetDir, "src", "app", "login", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "register", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "profile", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "middleware.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "supabase", "client.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "supabase", "server.ts"))).toBe(true);
    expect(existsSync(file(targetDir, ".env.example"))).toBe(true);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["@supabase/ssr"]).toBeDefined();
    expect(pkg.dependencies["@supabase/supabase-js"]).toBeDefined();

    const claude = readFileSync(file(targetDir, "CLAUDE.md"), "utf8");
    expect(claude).toContain("## Supabase");
    expect(claude).toContain("## Authentication");

    const middleware = readFileSync(file(targetDir, "src", "middleware.ts"), "utf8");
    expect(middleware).toContain("PUBLIC_PATHS");
  });

  it("generates a landing project with pwa but no supabase", async () => {
    const targetDir = path.join(workDir, "landing-app");
    const options = baseOptions({
      targetDir,
      template: "landing",
      pwa: true,
    });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "components", "shared", "hero.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "manifest.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "public", "sw.js"))).toBe(true);
    expect(existsSync(file(targetDir, "public", "icons", "icon.svg"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "middleware.ts"))).toBe(false);
    expect(existsSync(file(targetDir, "src", "lib", "supabase"))).toBe(false);

    const layout = readFileSync(file(targetDir, "src", "app", "layout.tsx"), "utf8");
    expect(layout).toContain("RegisterServiceWorker");

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["@supabase/ssr"]).toBeUndefined();
  });

  it("generates an astro-blank project with no Next.js files and every extra off", async () => {
    const targetDir = path.join(workDir, "astro-blank-app");
    const options = baseOptions({
      targetDir,
      framework: "astro",
      template: "astro-blank",
    });

    await generateProject(options);

    expect(existsSync(file(targetDir, "astro.config.mjs"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "pages", "index.astro"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "layouts", "BaseLayout.astro"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app"))).toBe(false);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies.astro).toBeDefined();
    expect(pkg.dependencies.next).toBeUndefined();

    const page = readFileSync(file(targetDir, "src", "pages", "index.astro"), "utf8");
    expect(page).not.toContain("__APP_TITLE__");
    expect(page).toContain("Test App");
  });

  it("generates an astro-blog project with sample posts and no Next.js extras applied", async () => {
    const targetDir = path.join(workDir, "astro-blog-app");
    const options = baseOptions({
      targetDir,
      framework: "astro",
      template: "astro-blog",
      supabase: true, // ignored entirely for non-nextjs frameworks
    });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "content.config.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "content", "posts", "hello-world.md"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "pages", "posts", "[id].astro"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "supabase"))).toBe(false);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["@supabase/ssr"]).toBeUndefined();

    const post = readFileSync(file(targetDir, "src", "content", "posts", "hello-world.md"), "utf8");
    expect(post).not.toContain("__APP_TITLE__");
  });

  it("generates a portfolio project with projects and experience content", async () => {
    const targetDir = path.join(workDir, "portfolio-app");
    const options = baseOptions({ targetDir, template: "portfolio" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "projects.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "experience.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "components", "shared", "project-card.tsx"))).toBe(
      true,
    );

    const page = readFileSync(file(targetDir, "src", "app", "page.tsx"), "utf8");
    expect(page).not.toContain("__APP_TITLE__");
  });

  it("generates a waitlist project with a working email-capture action", async () => {
    const targetDir = path.join(workDir, "waitlist-app");
    const options = baseOptions({ targetDir, template: "waitlist" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "waitlist-actions.ts"))).toBe(true);
    expect(
      existsSync(file(targetDir, "src", "components", "shared", "waitlist-form.tsx")),
    ).toBe(true);

    const actions = readFileSync(file(targetDir, "src", "lib", "waitlist-actions.ts"), "utf8");
    expect(actions).toContain('"use server"');
  });

  it("generates a docs project with sidebar navigation and content pages", async () => {
    const targetDir = path.join(workDir, "docs-app");
    const options = baseOptions({ targetDir, template: "docs" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "docs.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "components", "shared", "docs-sidebar.tsx"))).toBe(
      true,
    );
    expect(existsSync(file(targetDir, "src", "app", "docs", "layout.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "docs", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "docs", "[slug]", "page.tsx"))).toBe(true);

    const docs = readFileSync(file(targetDir, "src", "lib", "docs.ts"), "utf8");
    expect(docs).not.toContain("__APP_TITLE__");
  });

  it("generates an admin project with a customers table", async () => {
    const targetDir = path.join(workDir, "admin-app");
    const options = baseOptions({ targetDir, template: "admin" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "customers.ts"))).toBe(true);
    expect(
      existsSync(file(targetDir, "src", "components", "shared", "customers-table.tsx")),
    ).toBe(true);
  });

  it("generates a project with authjs standalone (no supabase required)", async () => {
    const targetDir = path.join(workDir, "authjs-app");
    const options = baseOptions({ targetDir, authjs: true });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "auth.ts"))).toBe(true);
    expect(
      existsSync(file(targetDir, "src", "app", "api", "auth", "[...nextauth]", "route.ts")),
    ).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "authjs-demo", "page.tsx"))).toBe(true);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["next-auth"]).toBeDefined();
  });

  it("does not apply authjs when supabase auth is already selected (conflictsWith)", async () => {
    const targetDir = path.join(workDir, "auth-conflict-app");
    const options = baseOptions({ targetDir, supabase: true, auth: true, authjs: true });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "auth.ts"))).toBe(false);
    expect(existsSync(file(targetDir, "src", "app", "login", "page.tsx"))).toBe(true);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["next-auth"]).toBeUndefined();
  });

  it("generates a project with the forms extra (react-hook-form + zod contact form)", async () => {
    const targetDir = path.join(workDir, "forms-app");
    const options = baseOptions({ targetDir, forms: true });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "validations", "contact.ts"))).toBe(true);
    expect(
      existsSync(file(targetDir, "src", "components", "shared", "contact-form.tsx")),
    ).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "contact", "page.tsx"))).toBe(true);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["react-hook-form"]).toBeDefined();
    expect(pkg.dependencies.zod).toBeDefined();
  });

  it("generates a project with stripe standalone (no supabase required)", async () => {
    const targetDir = path.join(workDir, "stripe-app");
    const options = baseOptions({ targetDir, stripe: true });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "stripe", "server.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "stripe", "actions.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "pricing", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, ".env.example"))).toBe(true);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies.stripe).toBeDefined();
  });

  it("forces drizzle off when supabase is not selected, even if requested", async () => {
    const targetDir = path.join(workDir, "drizzle-no-supabase-app");
    const options = baseOptions({ targetDir, drizzle: true, supabase: false });

    await generateProject(options);

    expect(existsSync(file(targetDir, "drizzle.config.ts"))).toBe(false);
    expect(existsSync(file(targetDir, "src", "lib", "db"))).toBe(false);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["drizzle-orm"]).toBeUndefined();
  });

  it("generates a project with supabase + drizzle, merging both .env.example blocks", async () => {
    const targetDir = path.join(workDir, "supabase-drizzle-app");
    const options = baseOptions({ targetDir, supabase: true, drizzle: true });

    await generateProject(options);

    expect(existsSync(file(targetDir, "drizzle.config.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "lib", "db", "schema.ts"))).toBe(true);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["drizzle-orm"]).toBeDefined();
    expect(pkg.dependencies["@supabase/ssr"]).toBeDefined();

    const env = readFileSync(file(targetDir, ".env.example"), "utf8");
    expect(env).toContain("NEXT_PUBLIC_SUPABASE_URL");
    expect(env).toContain("DATABASE_URL");
  });

  it("generates a project with analytics wired into layout.tsx", async () => {
    const targetDir = path.join(workDir, "analytics-app");
    const options = baseOptions({ targetDir, analytics: true });

    await generateProject(options);

    const layout = readFileSync(file(targetDir, "src", "app", "layout.tsx"), "utf8");
    expect(layout).toContain('import { Analytics } from "@vercel/analytics/next";');
    expect(layout).toContain("<Analytics />");
    expect(layout).not.toContain("__LAYOUT_IMPORTS__");
    expect(layout).not.toContain("__LAYOUT_EXPORTS__");
    expect(layout).not.toContain("__BODY_EXTRAS__");

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.dependencies["@vercel/analytics"]).toBeDefined();
  });

  it("composes pwa + analytics layout injections instead of one overwriting the other", async () => {
    const targetDir = path.join(workDir, "pwa-analytics-app");
    const options = baseOptions({ targetDir, pwa: true, analytics: true });

    await generateProject(options);

    const layout = readFileSync(file(targetDir, "src", "app", "layout.tsx"), "utf8");
    expect(layout).toContain("RegisterServiceWorker");
    expect(layout).toContain("<Analytics />");
    expect(layout).not.toContain("__LAYOUT_IMPORTS__");
    expect(layout).not.toContain("__LAYOUT_EXPORTS__");
    expect(layout).not.toContain("__BODY_EXTRAS__");
  });

  it("generates a blog project with sample posts and a working slug page", async () => {
    const targetDir = path.join(workDir, "blog-app");
    const options = baseOptions({ targetDir, template: "blog" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "posts.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "components", "shared", "post-card.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "posts", "[slug]", "page.tsx"))).toBe(true);

    const posts = readFileSync(file(targetDir, "src", "lib", "posts.ts"), "utf8");
    expect(posts).not.toContain("__APP_TITLE__");
    expect(posts).not.toContain("__AUTHOR__");
    expect(posts).toContain(options.author);
  });

  it("generates an ecommerce project with products, cart hook and cart page", async () => {
    const targetDir = path.join(workDir, "ecommerce-app");
    const options = baseOptions({ targetDir, template: "ecommerce" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "src", "lib", "products.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "hooks", "use-cart.ts"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "components", "shared", "store-header.tsx"))).toBe(true);
    expect(
      existsSync(file(targetDir, "src", "components", "shared", "add-to-cart-button.tsx")),
    ).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "products", "[slug]", "page.tsx"))).toBe(true);
    expect(existsSync(file(targetDir, "src", "app", "cart", "page.tsx"))).toBe(true);

    const cartHook = readFileSync(file(targetDir, "src", "hooks", "use-cart.ts"), "utf8");
    expect(cartHook).not.toContain("__APP_NAME__");
    expect(cartHook).toContain(options.projectName);
  });

  it("writes author/description into package.json and a LICENSE file for MIT", async () => {
    const targetDir = path.join(workDir, "mit-app");
    const options = baseOptions({
      targetDir,
      author: "Ada Lovelace",
      description: "A lovely app.",
      license: "MIT",
    });

    await generateProject(options);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.author).toBe("Ada Lovelace");
    expect(pkg.description).toBe("A lovely app.");
    expect(pkg.license).toBe("MIT");

    expect(existsSync(file(targetDir, "LICENSE"))).toBe(true);
    const license = readFileSync(file(targetDir, "LICENSE"), "utf8");
    expect(license).toContain("MIT License");
    expect(license).toContain("Ada Lovelace");
    expect(license).not.toContain("__AUTHOR__");
    expect(license).not.toContain("__YEAR__");
  });

  it("writes an Apache-2.0 LICENSE file when selected", async () => {
    const targetDir = path.join(workDir, "apache-app");
    const options = baseOptions({ targetDir, license: "Apache-2.0", author: "Grace Hopper" });

    await generateProject(options);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.license).toBe("Apache-2.0");

    const license = readFileSync(file(targetDir, "LICENSE"), "utf8");
    expect(license).toContain("Apache License");
    expect(license).toContain("Grace Hopper");
  });

  it("omits the LICENSE file and package.json license field when license is None", async () => {
    const targetDir = path.join(workDir, "no-license-app");
    const options = baseOptions({ targetDir, license: "None" });

    await generateProject(options);

    expect(existsSync(file(targetDir, "LICENSE"))).toBe(false);

    const pkg = JSON.parse(readFileSync(file(targetDir, "package.json"), "utf8"));
    expect(pkg.license).toBeUndefined();
  });
});
