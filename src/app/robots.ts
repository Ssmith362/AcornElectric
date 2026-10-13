import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
