import type { Metadata } from "next";
import { site } from "./site";

/**
 * Absolute base URL for canonicals, Open Graph, sitemap and schema @ids.
 * Set NEXT_PUBLIC_SITE_URL to the preview URL on preview deployments so a
 * preview never claims to be the live site.
 */
export const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");

/** Off until launch. robots.txt disallows everything and pages get noindex. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export function absoluteUrl(path = "/") {
  return path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
}

type PageMetaInput = {
  /** Full <title>. Write it per page: service + city, no "| SERVICES" filler. */
  title: string;
  description: string;
  path: string;
  /** Path under /public, or omitted to use the generated site-wide share card. */
  image?: string;
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, image, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
