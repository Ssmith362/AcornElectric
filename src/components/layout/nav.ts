import { publishedServices as services, serviceGroups } from "@/content/services";

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

export const serviceNavGroups = serviceGroups.map((g) => ({
  title: g.title,
  items: g.services.map((s) => ({ label: s.short, href: `/services/${s.slug}` })),
}));
