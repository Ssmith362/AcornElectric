/**
 * Case-sensitivity audit.
 *
 * Windows and macOS have case-insensitive filesystems; Hostinger's Linux
 * container does not. An import written as "@/components/UI" that resolves to
 * "ui.tsx" builds fine here and dies on deploy. Same for asset paths.
 *
 * This walks the real on-disk names and compares them byte-for-byte against
 * every import specifier and every /public asset reference in the source.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative, sep } from "node:path";

// Must be absolute: every path this script compares is absolute, and a
// relative root would make identical paths look different.
const ROOT = resolve(process.argv[2] ?? process.cwd());
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

const problems = [];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** Real on-disk path with exact casing, or null if it does not exist. */
function realCasedPath(target) {
  const rel = relative(ROOT, target);
  let current = ROOT;
  for (const segment of rel.split(sep)) {
    if (!segment) continue;
    let entries;
    try {
      entries = readdirSync(current);
    } catch {
      return null;
    }
    const exact = entries.find((e) => e === segment);
    if (!exact) {
      const insensitive = entries.find((e) => e.toLowerCase() === segment.toLowerCase());
      return insensitive ? join(current, insensitive) : null;
    }
    current = join(current, exact);
  }
  return current;
}

const EXTS = [".tsx", ".ts", ".jsx", ".js", ".mjs", ".css"];

function resolveImport(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null; // bare package import

  const candidates = [
    base,
    ...EXTS.map((e) => base + e),
    ...EXTS.map((e) => join(base, "index" + e)),
  ];
  for (const c of candidates) {
    const real = realCasedPath(c);
    if (real && existsSync(real) && statSync(real).isFile()) {
      return { requested: c, real };
    }
  }
  return { requested: base, real: null };
}

const sourceFiles = walk(SRC).filter((f) => /\.(tsx?|jsx?|mjs)$/.test(f));

for (const file of sourceFiles) {
  const code = readFileSync(file, "utf8");

  // --- module imports ---
  const importRe = /(?:from|import)\s+["']([^"']+)["']/g;
  for (const m of code.matchAll(importRe)) {
    const spec = m[1];
    const res = resolveImport(spec, file);
    if (!res) continue;
    if (!res.real) {
      problems.push(`UNRESOLVED  ${relative(ROOT, file)}  ->  "${spec}"`);
    } else if (res.real !== res.requested) {
      problems.push(
        `CASE        ${relative(ROOT, file)}  ->  "${spec}"\n            on disk: ${relative(ROOT, res.real)}`,
      );
    }
  }

  // --- /public asset references ---
  const assetRe = /["'](\/(?!\/)[A-Za-z0-9_\-./]+\.(?:png|jpe?g|webp|avif|svg|ico|woff2?|txt|xml))["']/g;
  for (const m of code.matchAll(assetRe)) {
    const url = m[1];
    const onDisk = join(PUBLIC, url.replace(/^\//, "").split("/").join(sep));
    const real = realCasedPath(onDisk);
    // Files served from src/app (icon.svg, favicon.ico, apple-icon.png,
    // sitemap.xml, robots.txt) are generated, not in /public.
    const generated = /^\/(icon\.svg|favicon\.ico|apple-icon\.png|sitemap\.xml|robots\.txt)$/.test(url);
    if (generated) continue;
    if (!real || !existsSync(real)) {
      problems.push(`MISSING ASSET  ${relative(ROOT, file)}  ->  "${url}"`);
    } else if (real !== onDisk) {
      problems.push(
        `ASSET CASE     ${relative(ROOT, file)}  ->  "${url}"\n               on disk: ${relative(ROOT, real)}`,
      );
    }
  }
}

console.log(`scanned ${sourceFiles.length} source files`);
if (problems.length === 0) {
  console.log("OK - no case or resolution problems");
} else {
  console.log(`\n${problems.length} PROBLEM(S):\n`);
  problems.forEach((p) => console.log("  " + p));
  process.exitCode = 1;
}
