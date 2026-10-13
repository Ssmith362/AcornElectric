import "server-only";

/**
 * Cheap, dependency-free abuse protection for the form endpoints.
 *
 * 1. Honeypot: a visually hidden field ("company_site") real people never fill.
 * 2. Time trap: forms carry the time they were rendered; submissions faster
 *    than a human could type are dropped.
 * 3. Rate limit: per-IP, in memory. Best effort. On serverless hosts each
 *    instance keeps its own count. If spam gets through anyway, add Cloudflare
 *    Turnstile (see docs/handoff.md).
 *
 * Bots caught by 1 or 2 get a normal-looking 200 so they learn nothing.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

export function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export function looksLikeBot(honeypot: unknown, startedAt: unknown) {
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const t = Number(startedAt);
  if (!Number.isFinite(t)) return true;
  const elapsed = Date.now() - t;
  return elapsed < 2500 || elapsed > 1000 * 60 * 60 * 24;
}
