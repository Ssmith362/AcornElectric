import { SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import type { Area } from "./types";

/**
 * Dedicated service-area pages. Spokane itself is the homepage's job; these
 * pages cover the communities with the strongest search demand and the most
 * to say locally.
 *
 * Every area page must say something genuinely local (housing, permitting,
 * utility, common projects). If you can't write that for a town, don't add a
 * page for it: list it on /areas instead.
 *
 * `confirmed: false` = Acorn hasn't confirmed they serve it. The page builds
 * for review but is noindex and out of the sitemap until confirmed.
 *
 * Eric supplied all 12 communities (Oct 2026), so every one is listed on /areas,
 * in the footer-facing copy and in schema. Only the three below earn their own
 * page: listing a town is not the same as ranking for it, and a page needs
 * something local to say. Add another only with genuinely distinct content.
 */
export const areas: Area[] = [
  {
    slug: "north-spokane",
    name: "North Spokane",
    confirmed: true,
    meta: {
      title: "Electrician in North Spokane, WA | Acorn Electric",
      description:
        "Residential electrician for North Spokane: EV chargers, panel upgrades, shop subpanels, hot tub wiring and repairs, permitted for your address.",
    },
    h1: "Residential electrician for North Spokane",
    lede:
      "From older homes near the Garland District to newer neighbourhoods up toward the county line, North Spokane homes ask a lot of their electrical systems. We help homeowners here charge EVs, add shops and keep older wiring safe.",
    local: [
      {
        title: "Two permitting authorities",
        body: "North Spokane straddles the city limit. Addresses inside it are permitted and inspected by the City of Spokane; addresses outside it, in unincorporated Spokane County, are generally handled by Washington L&I. We confirm which applies before we start.",
      },
      {
        title: "Mid-century homes, modern loads",
        body: "Many North Side homes were built when 60- or 100-amp service was plenty. Add an EV, a heat pump and a hot tub and the panel is often the first thing to look at.",
      },
      {
        title: "Garages and shops",
        body: "Larger lots further north often come with detached garages and shops, which usually need a properly grounded subpanel rather than another extension cord.",
      },
    ],
    permitNote:
      "Inside Spokane city limits: City of Spokane. Outside, in unincorporated Spokane County: generally Washington L&I.",
    featured: ["ev-charger-installation", "electrical-panel-upgrades", "subpanel-installation", "electrical-inspections"],
    faqs: [
      {
        q: "Do you serve all of North Spokane?",
        a: "Tell us your address or ZIP code when you get in touch and we'll confirm right away.",
      },
      {
        q: "Who issues the permit for my North Spokane address?",
        a: "If you're inside Spokane city limits, the City of Spokane. If you're in unincorporated Spokane County, usually Washington L&I. We check the address and handle it either way.",
      },
    ],
  },
  {
    slug: "mead",
    name: "Mead",
    confirmed: true,
    meta: {
      title: "Electrician in Mead, WA | Acorn Electric",
      description:
        "Electrician for Mead, WA homes: shop and garage subpanels, hot tub wiring, EV chargers and panel upgrades. Permitted through Washington L&I and done properly.",
    },
    h1: "Electrician for Mead homes and shops",
    lede:
      "Mead homes tend to sit on bigger lots, with shops, outbuildings, hot tubs and long driveways. That means longer runs, detached buildings and outdoor equipment, which is the work we like to do properly.",
    local: [
      {
        title: "Permitted through L&I",
        body: "Mead is unincorporated Spokane County, so electrical permits and inspections are generally handled by Washington L&I rather than a city. We take care of the permit.",
      },
      {
        title: "Detached buildings done right",
        body: "Shops and outbuildings need a correctly sized feeder, their own grounding electrode and a disconnect. Those are the details that most often fail inspection on DIY jobs.",
      },
      {
        title: "Utility coordination",
        body: "Depending on where you are, service may come from Avista or from Inland Power & Light. For mast and service work, we coordinate with whichever utility serves your address.",
      },
    ],
    permitNote: "Unincorporated Spokane County: generally Washington L&I.",
    featured: ["subpanel-installation", "hot-tub-wiring", "ev-charger-installation", "service-mast-repair"],
    faqs: [
      {
        q: "Do you come out to Mead?",
        a: "Send your address or ZIP code when you contact us and we'll confirm.",
      },
      {
        q: "Can you run power to a shop at the back of the property?",
        a: "Yes, that's a common Mead project. Tell us the distance and what's between the house and the shop, and we'll plan the route.",
      },
    ],
  },
  {
    slug: "spokane-valley",
    name: "Spokane Valley",
    confirmed: true,
    meta: {
      title: "Electrician in Spokane Valley, WA | Acorn Electric",
      description:
        "Residential electrician for Spokane Valley: EV chargers, panel and service upgrades, hot tub wiring, recessed lighting and repairs, permitted and inspected.",
    },
    h1: "Residential electrician for Spokane Valley",
    lede:
      "Spokane Valley has everything from post-war ramblers to brand-new builds. Whatever the age of your home, we help you add what you need (an EV charger, a hot tub, better lighting) without overloading what's there.",
    local: [
      {
        title: "Permitting in the Valley",
        body: "Electrical permits in Spokane Valley are generally handled through Washington L&I, not the City of Spokane. We confirm for your address and pull the permit.",
      },
      {
        title: "Older homes, bigger demands",
        body: "Many Valley homes are decades old. Panel capacity and older wiring are the first things we check before adding major loads.",
      },
      {
        title: "Outdoor living",
        body: "Hot tubs, patio lighting and outdoor outlets are common Valley projects. All of them need weather-tight work that survives our winters.",
      },
    ],
    permitNote: "Generally Washington L&I. Confirmed for each address.",
    featured: ["electrical-panel-upgrades", "hot-tub-wiring", "recessed-lighting", "electrical-repair"],
    faqs: [
      {
        q: "Do you work throughout Spokane Valley?",
        a: "Send your address or ZIP code when you contact us and we'll confirm.",
      },
    ],
  },
];

/**
 * All 12 communities Eric listed, in his order. `page` points at a dedicated
 * page above; the rest are listed on /areas only. Permit authority is the one
 * fact that genuinely differs: only the City of Spokane runs its own electrical
 * permits and inspections, everywhere else goes through Washington L&I.
 * Keep `note` factual and hedged; don't claim utility or housing details we
 * haven't verified.
 */
export type Community = {
  name: string;
  /** slug of a dedicated page in `areas`, if one exists */
  page?: string;
  permit: "city" | "lni" | "varies";
  note: string;
};

export const communities: Community[] = [
  {
    name: "Spokane",
    permit: "city",
    note: "Home base. Permits and inspections run through the City of Spokane, and we handle them for any work that needs one.",
  },
  {
    name: "Spokane Valley",
    page: "spokane-valley",
    permit: "lni",
    note: "Everything from post-war ramblers to new builds. Permitted through Washington L&I.",
  },
  {
    name: "Liberty Lake",
    permit: "lni",
    note: "East of the Valley, with a lot of newer homes. Permitted through Washington L&I.",
  },
  {
    name: "Cheney",
    permit: "lni",
    note: "Southwest of Spokane, home to Eastern Washington University. Permitted through Washington L&I.",
  },
  {
    name: "Airway Heights",
    permit: "lni",
    note: "West of Spokane along the Highway 2 corridor. Permitted through Washington L&I.",
  },
  {
    name: "North Spokane",
    page: "north-spokane",
    permit: "varies",
    note: "Straddles the city limit, so the permit depends on your address. We check before we start.",
  },
  {
    name: "South Hill",
    permit: "city",
    note: "Inside Spokane city limits, with many early-1900s homes where wiring and panel age are the first things we look at.",
  },
  {
    name: "Mead",
    page: "mead",
    permit: "lni",
    note: "Bigger lots, shops and hot tubs. Unincorporated Spokane County, permitted through Washington L&I.",
  },
  {
    name: "Deer Park",
    permit: "lni",
    note: "North of Mead, where rural properties and outbuildings are common. Permitted through Washington L&I.",
  },
  {
    name: "Medical Lake",
    permit: "lni",
    note: "West of Spokane, a small lakeside town. Permitted through Washington L&I.",
  },
  {
    name: "Greenacres",
    permit: "lni",
    note: "East of the Valley, unincorporated, and more rural in feel. Permitted through Washington L&I.",
  },
  {
    name: "Otis Orchards",
    permit: "lni",
    note: "Out on the eastern edge of the county, unincorporated. Permitted through Washington L&I.",
  },
];

/** Unconfirmed areas appear only in preview builds, never in production. */
export const publishedAreas = areas.filter((a) => a.confirmed || SHOW_REVIEW_FLAGS);

export function getArea(slug: string) {
  return publishedAreas.find((a) => a.slug === slug);
}
