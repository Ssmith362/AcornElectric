/**
 * Real last-change dates for the sitemap (ISO, YYYY-MM-DD). Google only trusts
 * lastmod when it is accurate, so these are NOT build dates: bump a group's
 * date in the same commit that changes that page's copy, content or layout.
 *
 * Seeded from git history on 2026-11-24 (last commit touching each group's
 * source files).
 */
export const lastModified = {
  home: "2026-11-18",
  servicesIndex: "2026-10-26",
  servicePages: "2026-11-13",
  areasIndex: "2026-11-13",
  areaPages: "2026-11-13",
  careers: "2026-11-13",
  contact: "2026-11-17",
} as const;
