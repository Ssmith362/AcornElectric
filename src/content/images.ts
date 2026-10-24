/**
 * IMAGE REGISTRY: swap placeholders for real Acorn photos here, and only here.
 *
 * Every image slot on the site points at a key below. While `src` is null the
 * slot renders a drawn placeholder (src/components/ui/placeholder-art.tsx) that
 * is clearly labelled as a placeholder, so nothing pretends to be an Acorn job.
 *
 * To use a real photo:
 *   1. Export it as .webp or .jpg, at least as large as width × height below
 *      (same aspect ratio, or the frame will crop it).
 *   2. Put it in /public/images/.
 *   3. Set `src` to the path (for example /images/ev-garage.webp) and write a real `alt` describing
 *      what is in the photo. Leave `art` alone; it is only the fallback.
 *
 * Only use photos Acorn has permission to publish. Real job photos beat stock.
 *
 * Real photos below were supplied by Eric Beisley (Acorn) on Oct 16 2026 for
 * use on the site. Originals: IMG_xxxx.jpg in his email / Google Drive share.
 * Slots still on a placeholder need a photo from Acorn (see `brief`).
 */

export type Art =
  | "ev"
  | "panel"
  | "subpanel"
  | "hottub"
  | "recessed"
  | "mast"
  | "inspection"
  | "atticfan"
  | "exterior"
  | "repair"
  | "van"
  | "crew";

export type ImageEntry = {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for the crop, e.g. "50% 30%". Defaults to centre. */
  focus?: string;
  art: Art;
  /** What the real photo should show. Printed on the placeholder. */
  brief: string;
};

const landscape = { width: 1600, height: 1100 };

export const images = {
  "home-hero": {
    src: "/images/kitchen-remodel-lighting.webp",
    alt: "Finished kitchen remodel with recessed lights, pendant lights over the island and under-cabinet lighting",
    ...landscape,
    focus: "50% 50%",
    art: "recessed",
    brief: "Finished job that shows the quality of the work",
  },
  ev: {
    src: "/images/ev-charger-exterior-wall.webp",
    alt: "Level 2 EV charger mounted on the outside wall of a Spokane-area home, cable coiled on the unit",
    ...landscape,
    focus: "50% 55%",
    art: "ev",
    brief: "Wall-mounted Level 2 charger, tidy conduit run to the panel",
  },
  panel: {
    src: "/images/panel-upgrade-breakers.webp",
    alt: "New electrical panel with neatly landed, labelled breakers",
    ...landscape,
    focus: "50% 45%",
    art: "panel",
    brief: "Open panel after an upgrade, neat labelled breakers",
  },
  subpanel: {
    src: "/images/detached-shop-service.webp",
    alt: "Detached shop building with its own meter and electrical panel on the outside wall",
    ...landscape,
    focus: "50% 60%",
    art: "subpanel",
    brief: "Subpanel in a detached shop or garage",
  },
  hottub: { src: null, alt: "", ...landscape, art: "hottub", brief: "Hot tub with its disconnect mounted on the house" },
  recessed: {
    src: "/images/kitchen-recessed-pendants.webp",
    alt: "Kitchen with recessed ceiling lights and three glass pendant lights over the island",
    ...landscape,
    focus: "50% 40%",
    art: "recessed",
    brief: "Living room or kitchen with new recessed lights on",
  },
  mast: {
    src: "/images/service-mast-weatherhead.webp",
    alt: "Service mast and weatherhead running up the side of an older wood-sided building to the meter",
    ...landscape,
    focus: "50% 8%",
    art: "mast",
    brief: "Service mast and weatherhead on a roofline",
  },
  inspection: {
    src: "/images/panel-upgrade-breakers.webp",
    alt: "Inside of an open electrical panel showing the wiring and breakers",
    ...landscape,
    focus: "50% 5%",
    art: "inspection",
    brief: "Electrician testing a receptacle or reviewing a panel",
  },
  ceilingfan: {
    src: "/images/covered-patio-addition.webp",
    alt: "Ceiling fan and recessed lights installed in a wood ceiling above a covered patio",
    ...landscape,
    focus: "50% 25%",
    art: "recessed",
    brief: "Ceiling fan on a covered patio",
  },
  bathroomfan: { src: null, alt: "", ...landscape, art: "repair", brief: "Bathroom exhaust fan and its controls" },
  generator: {
    src: "/images/service-upgrade-meter-main.webp",
    alt: "Standby generator next to a meter and main disconnect on the side of a home",
    ...landscape,
    focus: "75% 50%",
    art: "panel",
    brief: "Backup generator beside the electrical service",
  },
  exterior: {
    src: "/images/covered-deck-lighting.webp",
    alt: "Covered deck with recessed lights in a wood plank ceiling and a ceiling fan",
    ...landscape,
    focus: "50% 40%",
    art: "exterior",
    brief: "House at dusk with new exterior lights",
  },
  repair: { src: null, alt: "", ...landscape, art: "repair", brief: "Electrician tracing a fault at a switch or outlet" },
  van: { src: null, alt: "", ...landscape, art: "van", brief: "One of the new Acorn work vans" },
  crew: {
    src: "/images/eric-beisley-service-pedestal.webp",
    alt: "Eric Beisley, owner of Acorn Electric, with two young kids beside a newly installed meter pedestal",
    width: 1200,
    height: 1500,
    focus: "50% 60%",
    art: "crew",
    brief: "Acorn electrician at work (portrait)",
  },
  "service-upgrade": {
    src: "/images/service-upgrade-meter-main.webp",
    alt: "New meter and main disconnect with conduit runs on the side of a home, next to a standby generator",
    ...landscape,
    focus: "50% 50%",
    art: "mast",
    brief: "New meter base and service on a house",
  },
  grounding: {
    src: "/images/grounding-electrode-conduit.webp",
    alt: "Meter on a stone house with conduit running down the wall to the ground",
    ...landscape,
    focus: "50% 55%",
    art: "panel",
    brief: "Grounding conductor and clamp at a ground rod",
  },
  appliance: {
    src: "/images/mini-split-disconnect.webp",
    alt: "Ductless heat pump outdoor unit with its disconnect and conduit on the side of a home",
    ...landscape,
    focus: "50% 45%",
    art: "subpanel",
    brief: "New appliance circuit and disconnect",
  },
  remodel: {
    src: "/images/covered-patio-addition.webp",
    alt: "New covered patio with a wood ceiling, recessed lights and a ceiling fan",
    ...landscape,
    focus: "50% 35%",
    art: "recessed",
    brief: "Remodel or addition with new lighting",
  },
  "new-construction": {
    src: "/images/new-garage-lighting.webp",
    alt: "New garage with long LED shop lights across a white ceiling",
    ...landscape,
    focus: "50% 40%",
    art: "recessed",
    brief: "New build, wired and lit",
  },
  "knob-tube": {
    src: "/images/older-home-updated-service.webp",
    alt: "Older stone house with an updated meter and electrical panel on the outside wall",
    ...landscape,
    focus: "50% 60%",
    art: "inspection",
    brief: "Older home after a rewire",
  },
  surge: { src: null, alt: "", ...landscape, art: "panel", brief: "Whole-home surge protector installed at the panel" },
  "real-estate": { src: null, alt: "", ...landscape, art: "inspection", brief: "Repair called out on a home inspection, fixed" },
  commercial: { src: null, alt: "", ...landscape, art: "repair", brief: "Small commercial space, lighting or circuits" },
} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
