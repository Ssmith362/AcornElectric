/**
 * Crawls a RUNNING copy of the site and checks the SEO/a11y basics on every
 * page it can reach from the homepage:
 *
 *   - 200 status, exactly one <h1>, no skipped heading levels
 *   - <title> and meta description present and unique across pages
 *   - canonical present and pointing at the page's own path
 *   - every JSON-LD block parses and has @context + @type
 *   - every <img> has an alt attribute
 *   - every internal link resolves (no 4xx/5xx)
 *
 * Usage:
 *   npm run build && npm run start        (in one terminal)
 *   npm run check:site                    (defaults to http://localhost:3000)
 *   npm run check:site -- http://localhost:4320
 *
 * Dependency-free: regex parsing is enough for HTML we generate ourselves.
 */

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const problems = [];
const seenTitles = new Map();
const seenDescriptions = new Map();
const linkStatus = new Map();

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

async function status(path) {
  if (!linkStatus.has(path)) {
    const res = await fetch(BASE + path, { redirect: "manual" });
    linkStatus.set(path, res.status);
  }
  return linkStatus.get(path);
}

async function checkPage(path) {
  const res = await fetch(BASE + path);
  if (res.status !== 200) {
    problems.push(`${path}: status ${res.status}`);
    return [];
  }
  const html = await res.text();
  const p = (msg) => problems.push(`${path}: ${msg}`);

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) p(`${h1s.length} <h1> elements (want 1)`);

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      p(`heading jumps h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || "");
  if (!title) p("missing <title>");
  else if (seenTitles.has(title)) p(`duplicate title (also on ${seenTitles.get(title)})`);
  else seenTitles.set(title, path);
  if (title.length > 65) p(`long title (${title.length} chars): ${title}`);

  const descTag = html.match(/<meta name="description"[^>]*>/)?.[0];
  const desc = descTag ? decode(attr(descTag, "content") || "") : "";
  if (!desc) p("missing meta description");
  else if (seenDescriptions.has(desc)) p(`duplicate description (also on ${seenDescriptions.get(desc)})`);
  else seenDescriptions.set(desc, path);
  if (desc.length > 165) p(`long description (${desc.length} chars)`);

  const canonTag = html.match(/<link rel="canonical"[^>]*>/)?.[0];
  const canon = canonTag && attr(canonTag, "href");
  if (!canon) p("missing canonical");
  else {
    const canonPath = new URL(canon).pathname.replace(/\/$/, "") || "/";
    if (canonPath !== (path.replace(/\/$/, "") || "/")) p(`canonical points at ${canonPath}`);
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      if (!data["@context"] || !data["@type"]) p(`JSON-LD block missing @context/@type`);
    } catch {
      p("JSON-LD block does not parse");
    }
  }

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) p(`<img> without alt: ${m[0].slice(0, 80)}`);
  }

  const links = new Set();
  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)) links.add(m[1] || "/");
  return [...links];
}

const queue = ["/"];
const done = new Set();
while (queue.length) {
  const path = queue.shift();
  if (done.has(path)) continue;
  done.add(path);
  const links = await checkPage(path);
  for (const l of links) {
    const s = await status(l);
    if (s >= 400) problems.push(`${path}: broken link → ${l} (${s})`);
    else if (s === 200 && !done.has(l) && !l.startsWith("/api/")) queue.push(l);
  }
}

// Not linked from pages, but must work.
for (const [path, want] of [
  ["/robots.txt", 200],
  ["/sitemap.xml", 200],
  ["/this-page-does-not-exist", 404],
]) {
  const s = await status(path);
  if (s !== want) problems.push(`${path}: status ${s} (want ${want})`);
}

console.log(`checked ${done.size} pages on ${BASE}`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.log("  - " + p));
  process.exitCode = 1;
} else {
  console.log("OK - no problems found");
}
