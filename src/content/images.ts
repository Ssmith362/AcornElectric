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
  art: Art;
  /** What the real photo should show. Printed on the placeholder. */
  brief: string;
};

const landscape = { width: 1600, height: 1100 };

export const images = {
  "home-hero": { src: null, alt: "", ...landscape, art: "ev", brief: "Finished EV charger on a Spokane garage wall, car plugged in" },
  ev: { src: null, alt: "", ...landscape, art: "ev", brief: "Wall-mounted Level 2 charger, tidy conduit run to the panel" },
  panel: { src: null, alt: "", ...landscape, art: "panel", brief: "Open panel after an upgrade, neat labelled breakers" },
  subpanel: { src: null, alt: "", ...landscape, art: "subpanel", brief: "Subpanel in a detached shop or garage" },
  hottub: { src: null, alt: "", ...landscape, art: "hottub", brief: "Hot tub with its disconnect mounted on the house" },
  recessed: { src: null, alt: "", ...landscape, art: "recessed", brief: "Living room or kitchen with new recessed lights on" },
  mast: { src: null, alt: "", ...landscape, art: "mast", brief: "Service mast and weatherhead on a roofline" },
  inspection: { src: null, alt: "", ...landscape, art: "inspection", brief: "Electrician testing a receptacle or reviewing a panel" },
  atticfan: { src: null, alt: "", ...landscape, art: "atticfan", brief: "Gable or roof-mounted attic fan, flashed and sealed" },
  exterior: { src: null, alt: "", ...landscape, art: "exterior", brief: "House at dusk with new exterior lights" },
  repair: { src: null, alt: "", ...landscape, art: "repair", brief: "Electrician tracing a fault at a switch or outlet" },
  van: { src: null, alt: "", ...landscape, art: "van", brief: "One of the new Acorn work vans" },
  crew: { src: null, alt: "", width: 1200, height: 1500, art: "crew", brief: "Acorn electrician at work (portrait)" },
} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
