import type { Faq, Service } from "@/content/types";
import type { Opening } from "@/content/careers";
import { communities } from "@/content/areas";
import { services } from "@/content/services";
import { absoluteUrl, BASE_URL } from "./seo";
import { site } from "./site";

/**
 * JSON-LD builders. Rules, enforced here so no page can break them:
 *   - Unverified facts (see `verified` in src/lib/site.ts) are left out.
 *   - No street address until Acorn resolves which one is real.
 *   - No aggregateRating / review markup for Acorn's own reviews. Google
 *     treats self-serving review markup on a LocalBusiness as ineligible.
 *   - No opening hours, prices or emergency claims unless confirmed.
 */

export const BUSINESS_ID = `${BASE_URL}/#business`;

function served() {
  return communities.map(({ name }) => ({
    "@type": "City",
    name: `${name}, WA`,
  }));
}

export function businessSchema() {
  const addr = site.address;
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": BUSINESS_ID,
    name: site.name,
    url: absoluteUrl("/"),
    ...(site.phone.verified ? { telephone: site.phone.value.e164 } : {}),
    ...(site.email.verified ? { email: site.email.value } : {}),
    ...(site.legalName.verified ? { legalName: site.legalName.value } : {}),
    ...(addr
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: addr.street,
            addressLocality: addr.city,
            addressRegion: addr.region,
            postalCode: addr.postalCode,
            addressCountry: "US",
          },
        }
      : {}),
    areaServed: served(),
    ...(site.social.length || site.google.profileUrl
      ? { sameAs: [...site.social.map((s) => s.href), ...(site.google.profileUrl ? [site.google.profileUrl] : [])] }
      : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Residential electrical services",
      itemListElement: services
        .filter((s) => s.confirmed)
        .map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(`/services/${s.slug}`) },
        })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: absoluteUrl("/"),
    name: site.name,
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.meta.description,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed: served(),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Only called for openings where isPostingComplete() is true. */
export function jobPostingSchema(o: Opening) {
  const p = o.posting;
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: o.title,
    description: `<p>${o.summary}</p><ul>${o.bring.map((b) => `<li>${b}</li>`).join("")}</ul>`,
    datePosted: p.datePosted,
    validThrough: p.validThrough,
    employmentType: p.employmentType,
    hiringOrganization: { "@type": "Organization", name: site.name, sameAs: absoluteUrl("/") },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "Spokane", addressRegion: "WA", addressCountry: "US" },
    },
    ...(p.pay
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: { "@type": "QuantitativeValue", minValue: p.pay.min, maxValue: p.pay.max, unitText: p.pay.unit },
          },
        }
      : {}),
    directApply: true,
  };
}
