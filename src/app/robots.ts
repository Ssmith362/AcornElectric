import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, BASE_URL } from "@/lib/seo";

/**
 * Launch build: crawl everything except the form endpoints, sitemap listed.
 *
 * Every other build (local, preview, pre-launch production on vercel.app):
 * crawling is ALLOWED but every page answers noindex (meta tag + X-Robots-Tag
 * header). Blocking the crawl instead would stop search engines from seeing
 * the noindex, so a linked preview URL could still show up as a bare result.
 */
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
