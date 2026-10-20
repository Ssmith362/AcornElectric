import { publishedServices as services } from "@/content/services";

export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Service areas", href: "/areas" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceNav = services.map((s) => ({
  label: s.short,
  href: `/services/${s.slug}`,
}));
