import type { MetadataRoute } from "next";
import { areas } from "@/content/areas";
import { services } from "@/content/services";
import { lastModified } from "@/content/last-modified";
import { absoluteUrl } from "@/lib/seo";

/**
 * Only pages meant to rank. Unconfirmed services/areas build for review but
 * are noindex and left out until Acorn confirms them. /privacy is noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, modified: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified: modified,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1, lastModified.home),
    page("/services", 0.8, lastModified.servicesIndex),
    ...services.filter((s) => s.confirmed).map((s) => page(`/services/${s.slug}`, 0.9, lastModified.servicePages)),
    page("/areas", 0.6, lastModified.areasIndex),
    ...areas.filter((a) => a.confirmed).map((a) => page(`/areas/${a.slug}`, 0.7, lastModified.areaPages)),
    page("/careers", 0.5, lastModified.careers),
    page("/contact", 0.7, lastModified.contact),
  ];
}
