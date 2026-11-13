/**
 * Indexing and base-URL rules (src/lib/seo.ts) under each deploy environment.
 * The values are computed once at import, so each case runs in a fresh Node
 * process with its own environment.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

const seo = pathToFileURL("src/lib/seo.ts").href;

function resolve(env: Record<string, string>) {
  const clean = Object.fromEntries(
    Object.entries(process.env).filter(([k]) => !k.startsWith("VERCEL") && !k.startsWith("NEXT_PUBLIC_")),
  );
  const out = execFileSync(
    process.execPath,
    [
      "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON",
      "--input-type=module",
      "-e",
      `const m = await import(${JSON.stringify(seo)}); console.log(JSON.stringify({ base: m.BASE_URL, index: m.ALLOW_INDEXING }));`,
    ],
    { env: { ...clean, ...env } as NodeJS.ProcessEnv, encoding: "utf8" as const },
  );
  return JSON.parse(String(out)) as { base: string; index: boolean };
}

const WWW = "https://www.callacornelectric.com";
const FLAG = { NEXT_PUBLIC_ALLOW_INDEXING: "true" };

test("local builds use the canonical origin and stay noindex without the flag", () => {
  assert.deepEqual(resolve({}), { base: WWW, index: false });
});

test("Vercel previews use their own URL and can never be indexed", () => {
  assert.deepEqual(resolve({ VERCEL_ENV: "preview", VERCEL_BRANCH_URL: "acorn-git-x.vercel.app", ...FLAG }), {
    base: "https://acorn-git-x.vercel.app",
    index: false,
  });
  assert.equal(resolve({ VERCEL_ENV: "preview", NEXT_PUBLIC_SITE_URL: WWW, ...FLAG }).index, false);
});

test("pre-launch production on vercel.app resolves share images there and stays noindex", () => {
  assert.deepEqual(resolve({ VERCEL_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "acornelectric.vercel.app", ...FLAG }), {
    base: "https://acornelectric.vercel.app",
    index: false,
  });
});

test("the launch build on the www domain is indexable", () => {
  assert.deepEqual(resolve({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: WWW, ...FLAG }), { base: WWW, index: true });
  assert.equal(resolve({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://callacornelectric.com", ...FLAG }).index, false);
});
