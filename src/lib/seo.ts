import type { Metadata } from "next";
import { site } from "./site.ts";

/**
 * SITE ORIGIN AND INDEXING: one place decides both.
 *
 * Canonical production origin: https://www.callacornelectric.com (site.url).
 *
 * BASE_URL (canonicals, Open Graph, sitemap, schema @ids), first match wins:
 *   1. NEXT_PUBLIC_SITE_URL, when set (set it on the production launch).
 *   2. Vercel preview builds: that deployment's branch URL, so share images and
 *      canonicals resolve on the preview itself.
 *   3. Vercel production builds: the project's production domain
 *      (acornelectric.vercel.app today; the custom domain once it's attached).
 *   4. site.url (local builds).
 *
 * ALLOW_INDEXING needs ALL of:
 *   - NEXT_PUBLIC_ALLOW_INDEXING === "true",
 *   - BASE_URL is exactly the canonical production origin,
 *   - not a Vercel preview build.
 * So a preview can never be indexable, even if the flag is copied to every
 * environment. On top of this, next.config.mjs sends X-Robots-Tag: noindex for
 * any request whose host isn't www.callacornelectric.com, which keeps the
 * vercel.app aliases out of search after launch too.
 */
export const CANONICAL_ORIGIN = site.url.replace(/\/$/, "");

function resolveBaseUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;
  const vercelEnv = process.env.VERCEL_ENV;
  const host =
    vercelEnv === "preview"
      ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
      : vercelEnv === "production"
        ? process.env.VERCEL_PROJECT_PRODUCTION_URL
        : undefined;
  return host ? `https://${host}` : CANONICAL_ORIGIN;
}

export const BASE_URL = resolveBaseUrl().replace(/\/$/, "");

export const ALLOW_INDEXING =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  BASE_URL === CANONICAL_ORIGIN &&
  process.env.VERCEL_ENV !== "preview";

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
  imageAlt?: string;
  noindex?: boolean;
};

/**
 * The generated card from src/app/opengraph-image.tsx. Named explicitly
 * because a page-level `openGraph` object replaces the file-based image
 * instead of merging with it, which left every page without a share image.
 */
const SHARE_CARD = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Acorn Electric: electrical repairs, upgrades and installations for Spokane homes and businesses",
};

export function pageMetadata({ title, description, path, image, imageAlt, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const card = image ? { url: image, width: 1200, height: 630, alt: imageAlt ?? title } : SHARE_CARD;
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
      images: [card],
    },
    twitter: { card: "summary_large_image", title, description, images: [card.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
