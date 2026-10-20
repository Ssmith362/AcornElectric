import type { ImageKey } from "./images";

export type Faq = { q: string; a: string };
export type Point = { title: string; body: string };

export type Service = {
  slug: string;
  /** Natural name used in copy and the form's service dropdown. */
  name: string;
  /** Short label for nav and the panel-schedule index. */
  short: string;
  /** Tag printed on the panel-schedule index, like a breaker label. */
  /**
   * false = Acorn has not yet confirmed they offer this. The page still builds
   * for review, but is excluded from the sitemap and marked noindex until set.
   */
  confirmed: boolean;
  image: ImageKey;
  meta: { title: string; description: string };
  h1: string;
  /** The customer's situation + what Acorn does about it. One or two sentences. */
  lede: string;
  /** Homepage "sound familiar" line, written from the customer's side. */
  problem: string;
  story: string[];
  signs: { heading: string; items: string[] };
  work: { heading: string; intro: string; steps: Point[] };
  doneRight: { heading: string; intro: string; points: Point[] };
  factors: { heading: string; items: Point[] };
  prepare: string[];
  faqs: Faq[];
  related: string[];
};

export type Area = {
  slug: string;
  name: string;
  confirmed: boolean;
  meta: { title: string; description: string };
  h1: string;
  lede: string;
  /** Genuinely local notes: housing stock, permitting, utility. No keyword swaps. */
  local: Point[];
  permitNote: string;
  featured: string[];
  faqs: Faq[];
};
