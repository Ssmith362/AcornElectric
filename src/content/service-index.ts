import { SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import type { Service } from "./types";

/** Small shared index for navigation and forms. Do not import the long service
 * copy into client components. Ordering and labels are owned here once.
 */
export const serviceIndex: Pick<Service, "slug" | "name" | "short" | "confirmed">[] = [
  {
    "slug": "electrical-repair",
    "name": "Electrical repairs, outlets and troubleshooting",
    "short": "Repairs & outlets",
    "confirmed": true
  },
  {
    "slug": "electrical-panel-upgrades",
    "name": "Electrical panel and service upgrades",
    "short": "Panel & service upgrades",
    "confirmed": true
  },
  {
    "slug": "ev-charger-installation",
    "name": "EV charger installation",
    "short": "EV chargers",
    "confirmed": true
  },
  {
    "slug": "generator-installation",
    "name": "Generator installation and backup power",
    "short": "Backup power & generators",
    "confirmed": true
  },
  {
    "slug": "ceiling-fan-installation",
    "name": "Ceiling and attic fan installation",
    "short": "Ceiling & attic fans",
    "confirmed": true
  },
  {
    "slug": "commercial-electrical",
    "name": "Commercial electrical",
    "short": "Commercial",
    "confirmed": true
  },
  {
    "slug": "bathroom-fan-replacement",
    "name": "Bathroom exhaust fan replacement and installation",
    "short": "Bathroom fans",
    "confirmed": true
  },
  {
    "slug": "lighting-installation",
    "name": "Indoor and outdoor lighting installation",
    "short": "Lighting installation",
    "confirmed": true
  },
  {
    "slug": "hot-tub-wiring",
    "name": "Hot tub wiring",
    "short": "Hot tub wiring",
    "confirmed": true
  },
  {
    "slug": "knob-and-tube-rewiring",
    "name": "Knob and tube replacement and rewiring",
    "short": "Knob & tube replacement",
    "confirmed": true
  },
  {
    "slug": "electrical-inspections",
    "name": "Electrical safety inspections and protection",
    "short": "Safety inspections",
    "confirmed": true
  },
  {
    "slug": "dedicated-appliance-circuits",
    "name": "Dedicated circuits for appliances and equipment",
    "short": "Dedicated circuits",
    "confirmed": true
  },
  {
    "slug": "subpanel-installation",
    "name": "Subpanel installation",
    "short": "Subpanels",
    "confirmed": true
  },
  {
    "slug": "remodel-and-addition-wiring",
    "name": "Remodel and addition electrical",
    "short": "Remodels & additions",
    "confirmed": true
  },
  {
    "slug": "new-home-electrical",
    "name": "New custom home electrical",
    "short": "New home wiring",
    "confirmed": true
  },
  {
    "slug": "service-mast-repair",
    "name": "Service mast repair",
    "short": "Service mast repair",
    "confirmed": true
  }
];

export const publishedServiceIndex = serviceIndex.filter((s) => s.confirmed || SHOW_REVIEW_FLAGS);

export const serviceGroupDefs: { id: string; title: string; slugs: string[] }[] = [
  {
    "id": "power-and-panels",
    "title": "Power, panels and charging",
    "slugs": [
      "electrical-panel-upgrades",
      "ev-charger-installation",
      "generator-installation",
      "subpanel-installation",
      "dedicated-appliance-circuits",
      "hot-tub-wiring"
    ]
  },
  {
    "id": "safety-and-repairs",
    "title": "Repairs, safety and older wiring",
    "slugs": [
      "electrical-repair",
      "electrical-inspections",
      "knob-and-tube-rewiring",
      "service-mast-repair"
    ]
  },
  {
    "id": "projects-and-lighting",
    "title": "Lighting, fans and projects",
    "slugs": [
      "ceiling-fan-installation",
      "bathroom-fan-replacement",
      "lighting-installation",
      "remodel-and-addition-wiring",
      "new-home-electrical",
      "commercial-electrical"
    ]
  }
];
