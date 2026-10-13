import type { MetadataRoute } from "next";
import { areas } from "@/content/areas";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * Only pages meant to rank. Unconfirmed services/areas build for review but
 * are noindex and left out until Acorn confirms them. /privacy is noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/services", 0.8),
    ...services.filter((s) => s.confirmed).map((s) => page(`/services/${s.slug}`, 0.9)),
    page("/areas", 0.6),
    ...areas.filter((a) => a.confirmed).map((a) => page(`/areas/${a.slug}`, 0.7)),
    page("/careers", 0.5),
    page("/contact", 0.7),
  ];
}
