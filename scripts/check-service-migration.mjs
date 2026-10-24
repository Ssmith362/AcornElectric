/** Checks the rendered SEO migration, redirects and lead-form choices.
 * Run after a production build: npm run check:services -- http://127.0.0.1:3000
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { legacyRedirects } from "../next.config.mjs";

const base = process.argv[2] || "http://127.0.0.1:3000";
const renderedPages = [];
const get = async (path) => {
  const res = await fetch(new URL(path, base));
  assert.equal(res.status, 200, path);
  const html = await res.text();
  renderedPages.push(html);
  return html;
};
const sitemap = await get("/sitemap.xml");
const serviceUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname).filter((p) => p.startsWith("/services/"));
assert.equal(serviceUrls.length, 16, "The sitemap should expose 16 focused service pages");
assert.equal(new Set(serviceUrls).size, 16, "Duplicate sitemap service");

const expected = [
  ["ceiling-fan-installation", "Ceiling Fan Installation in Spokane", "Ceiling fan installation and replacement"],
  ["generator-installation", "Generator Installation in Spokane", "Generator installation and backup power"],
  ["bathroom-fan-replacement", "Bathroom Fan Replacement in Spokane", "Bathroom exhaust fan replacement and installation"],
  ["lighting-installation", "Lighting Installation in Spokane", "Indoor and outdoor lighting installation"],
];
const overview = await get("/services");
const contact = await get("/contact");
for (const [slug, title, formChoice] of expected) {
  const path = `/services/${slug}`;
  const html = await get(path);
  assert.ok(serviceUrls.includes(path), `Sitemap missing ${path}`);
  assert.ok(overview.includes(`href="${path}"`), `Overview missing ${path}`);
  assert.ok(html.includes(`<title>${title}`), `Wrong search title: ${path}`);
  assert.ok(html.includes(`"url":"https://www.callacornelectric.com${path}"`) || html.includes(`"url":"https://callacornelectric.com${path}"`), `Service schema missing canonical route: ${path}`);
  const selected = html.match(/<option\b[^>]*selected[^>]*>(.*?)<\/option>/s)?.[1];
  assert.equal(selected, formChoice, `Lead form should preselect the service on ${path}`);
  assert.ok(contact.includes(`>${formChoice}</option>`), `Contact form missing ${formChoice}`);
}
const lighting = await get("/services/lighting-installation");
for (const id of ["recessed-lighting", "exterior-lighting"]) assert.ok(lighting.includes(`id="${id}"`), `Lighting section missing ${id}`);

const redirects = legacyRedirects.filter((r) => r.from.startsWith("/services/"));
assert.equal(redirects.length, 7, "Every replaced service URL needs a redirect");
for (const { from, to } of redirects) {
  assert.ok(!serviceUrls.includes(from), `Removed URL still in sitemap: ${from}`);
  assert.ok(!overview.includes(`href="${from}"`), `Old navigation link: ${from}`);
  const res = await fetch(new URL(from, base), { redirect: "manual" });
  assert.equal(res.status, 301, `Permanent redirect missing: ${from}`);
  const target = new URL(res.headers.get("location"), base);
  const wanted = new URL(to, base);
  assert.equal(target.pathname + target.hash, wanted.pathname + wanted.hash, `Wrong redirect: ${from}`);
  const html = await get(target.pathname);
  if (target.hash) assert.ok(html.includes(`id="${target.hash.slice(1)}"`), `Redirect lands on missing section: ${from}`);
}

// Check scripts referenced by the current pages, not orphan chunks left by
// an earlier local build in .next/static.
for (const path of serviceUrls) await get(path);
await get("/");
const scripts = new Set(renderedPages.flatMap((html) => [...html.matchAll(/<script[^>]+src="(\/_next\/static\/[^"?]+\.js)/g)].map((m) => m[1])));
assert.ok(scripts.size > 0, "No client scripts found in the rendered pages");
for (const src of scripts) {
  const file = decodeURIComponent(src).replace(/^\/_next\//, ".next/");
  const js = readFileSync(file, "utf8");
  assert.ok(!js.includes("A ceiling fan needs more than an available wire"), `Service copy leaked into client JavaScript: ${file}`);
  assert.ok(!js.includes("Spokane summers push attic temperatures"), `Old attic content leaked into client JavaScript: ${file}`);
}
console.log("OK - 16 service URLs, new search titles and form selections, 7 redirects with section targets, and lean client bundles");
