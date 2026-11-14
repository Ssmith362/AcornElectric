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
 * PROVENANCE (Nov 2026). Photos without a comment came from Eric Beisley's
 * Oct 16 2026 share (IMG_xxxx.jpg). Acorn has NOT confirmed that each one shows
 * its own work, and slots marked "AI-generated stand-in" are synthetic. So:
 *   - Alt text describes only what is visible. No "Acorn job", no customer
 *     location, no exact counts that a crop might contradict.
 *   - Section labels say "common projects", never "our work" or "showcase".
 * Originals live in the Flourish Now Digital drive (Acorn/Photos). The site
 * copies are those originals re-encoded at full size (1536 or 2048 px long
 * edge, EXIF stripped). Files that still need larger or real replacements are
 * listed in docs/handoff.md, "Images".
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
  // Not rendered since the truck hero (Nov 2026); the same photo now serves
  // "new-construction" below.
  "home-hero": {
    src: "/images/kitchen-remodel-lighting.webp",
    alt: "Finished kitchen with recessed lights, pendant lights over the island and under-cabinet lighting",
    ...landscape,
    focus: "50% 50%",
    art: "recessed",
    brief: "Finished job that shows the quality of the work",
  },
  ev: {
    src: "/images/ev-charger-exterior-wall.webp",
    alt: "Level 2 EV charger mounted on a home's exterior wall, with its cable coiled on the unit",
    ...landscape,
    focus: "50% 55%",
    art: "ev",
    brief: "Wall-mounted Level 2 charger, tidy conduit run to the panel",
  },
  // AI-generated stand-in (Nov 2026). Illustrative only; replace with a real Acorn photo when one exists.
  panel: {
    src: "/images/new-200-amp-panel.webp",
    alt: "New main breaker panel with the door open showing neatly organized breakers, beside the meter on a garage wall",
    width: 1536,
    height: 1024,
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
  // AI-generated stand-in (Nov 2026). Illustrative only; replace with a real Acorn photo when one exists.
  hottub: {
    src: "/images/hot-tub-disconnect.webp",
    alt: "Hot tub on a deck with its disconnect box mounted on the house wall and conduit running to the tub",
    width: 1536,
    height: 1024,
    focus: "60% 50%",
    art: "hottub",
    brief: "Hot tub with its disconnect mounted on the house",
  },
  recessed: {
    src: "/images/kitchen-recessed-pendants.webp",
    alt: "Kitchen with recessed ceiling lights and glass pendant lights over the island",
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
  // AI-generated stand-in (Nov 2026). Illustrative only; replace with a real Acorn photo when one exists.
  bathroomfan: {
    src: "/images/bathroom-fan-controls.webp",
    alt: "Bathroom exhaust fan and light in the ceiling with the wall switch and fan control beside the door",
    width: 1536,
    height: 1024,
    focus: "50% 50%",
    art: "repair",
    brief: "Bathroom exhaust fan and its controls",
  },
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
  // AI-generated stand-in (Nov 2026). Illustrative only; replace with a real Acorn photo when one exists.
  repair: {
    src: "/images/outlet-fault-tracing.webp",
    alt: "Electrician in work gloves testing an open wall outlet with a voltage tester",
    width: 1536,
    height: 1024,
    focus: "50% 50%",
    art: "repair",
    brief: "Electrician tracing a fault at a switch or outlet",
  },
  // Acorn's wrapped truck outside the Washington Water Power building (Option 4 hero, Nov 2026).
  truck: {
    src: "/images/acorn-truck-washington-water-power.webp",
    alt: "Acorn Electric's green branded truck parked outside the brick Washington Water Power building in Spokane",
    width: 1672,
    height: 941,
    focus: "54% 57%",
    art: "van",
    brief: "Acorn truck on a job",
  },
  van: {
    src: "/images/acorn-truck-washington-water-power.webp",
    alt: "Acorn Electric's green branded work truck",
    ...landscape,
    focus: "72% 60%",
    art: "van",
    brief: "One of the new Acorn work vans",
  },
  crew: {
    src: "/images/eric-beisley-service-pedestal.webp",
    alt: "Eric Beisley, owner of Acorn Electric, with two children beside a newly installed meter pedestal",
    width: 1200,
    height: 1500,
    focus: "50% 60%",
    art: "crew",
    brief: "Acorn electrician at work (portrait)",
  },
  // AI-generated stand-in (Nov 2026): replace with a real photo of the Acorn crew before launch.
  careers: {
    src: "/images/electrician-at-panel-careers.webp",
    alt: "An electrician working inside an open breaker panel in a garage",
    width: 1400,
    height: 933,
    focus: "62% 45%",
    art: "crew",
    brief: "Acorn electrician at work (careers)",
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
  // Was the empty-garage photo (new-garage-lighting.webp). The finished
  // kitchen reads far better for a new-home page; a real Acorn new-build photo
  // (whole-house exterior or finished interior) would be better still.
  "new-construction": {
    src: "/images/kitchen-remodel-lighting.webp",
    alt: "Finished kitchen with recessed lights, pendant lights over the island and under-cabinet lighting",
    ...landscape,
    focus: "50% 55%",
    art: "recessed",
    brief: "New build, wired and lit",
  },
  // AI-generated stand-in (Nov 2026). Illustrative only; replace with a real Acorn photo when one exists.
  "knob-tube": {
    src: "/images/knob-and-tube-basement.webp",
    alt: "Original knob and tube wiring on basement joists, cloth-covered wires running through white porcelain knobs and tubes",
    width: 1536,
    height: 1024,
    focus: "50% 50%",
    art: "inspection",
    brief: "Knob and tube wiring in a basement, attic or crawlspace",
  },
  // AI-generated stand-in (Nov 2026). NOT RENDERED and should not be: the
  // conductors run across the front of the breaker cover, which no installer
  // would do. Needs a real photo before any page uses this slot.
  surge: {
    src: "/images/surge-protector-panel.webp",
    alt: "Whole-home surge protector mounted beside an open breaker panel",
    width: 1536,
    height: 1024,
    focus: "50% 50%",
    art: "panel",
    brief: "Whole-home surge protector installed at the panel",
  },
  // AI-generated stand-in (Nov 2026). Not rendered on any page at present.
  "real-estate": {
    src: "/images/inspection-repair-fix.webp",
    alt: "Corrected junction box and outlet on a basement wall with an inspection report nearby",
    width: 1536,
    height: 1024,
    focus: "50% 50%",
    art: "inspection",
    brief: "Repair called out on a home inspection, fixed",
  },
  // AI-generated stand-in (Nov 2026). Illustrative only; replace with a real Acorn photo when one exists.
  commercial: {
    src: "/images/commercial-led-lighting.webp",
    alt: "Commercial space with new LED linear lighting and an electrical panel on the wall",
    width: 1536,
    height: 1024,
    focus: "50% 50%",
    art: "repair",
    brief: "Commercial space, lighting or circuits",
  },
} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
