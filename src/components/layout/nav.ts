import { publishedServiceIndex as services, serviceGroupDefs } from "@/content/service-index";

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

export const serviceNavGroups = serviceGroupDefs.map((g) => ({
  title: g.title,
  items: services.filter((s) => g.slugs.includes(s.slug)).map((s) => ({ label: s.short, href: `/services/${s.slug}` })),
}));
