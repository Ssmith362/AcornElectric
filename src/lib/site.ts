/**
 * THE single source of business facts for the whole site.
 *
 * Header, footer, contact page, structured data, emails and forms all read
 * from here. Change a fact once, here, and it changes everywhere.
 *
 * VERIFICATION RULE: every fact carries a `verified` flag. Anything not yet
 * confirmed directly by Acorn is `false`, and:
 *   - it is kept OUT of structured data (see src/lib/schema.ts), and
 *   - it shows a small "confirm" marker in preview builds
 *     (NEXT_PUBLIC_SHOW_REVIEW_FLAGS, see src/components/ui/review-flag.tsx).
 *
 * Sources for the current values are listed in docs/client-facts-checklist.md.
 */

type Fact<T> = { value: T; verified: boolean; note?: string };

export const site = {
  name: "Acorn Electric",
  legalName: { value: "Acorn Electric LLC", verified: true, note: "Eric's email signature (Oct 16 2026): \"Owner- Acorn Electric LLC\"." } as Fact<string>,

  /** Shown in copy as the person behind the business. Public license record. */
  owner: { value: "Eric Beisley", verified: true, note: "Eric's email signature, Oct 16 2026." } as Fact<string>,

  phone: {
    value: { display: "(509) 808-1925", e164: "+15098081925" },
    verified: true,
    note: "Eric's email signature (Oct 16 2026), current website and license listing all agree.",
  } as Fact<{ display: string; e164: string }>,

  email: {
    value: "eric@callacornelectric.com",
    verified: true,
    note: "Eric's business email (signature, Oct 16 2026). Form leads go wherever LEADS_TO points.",
  } as Fact<string>,

  /**
   * DELIBERATELY UNSET. The current website shows 4615 E 6th Ave, Spokane
   * Valley; Google reportedly shows 3707 E Decatur Ave #2, Spokane. Until Acorn
   * says which is correct, and whether they want a public address at all
   * (service-area business), no street address is published or put in schema.
   */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  },

  /** City used for "based in" copy. Safe either way: both candidates are Spokane-area. */
  baseCity: "Spokane",
  region: "WA",

  license: {
    value: "ACORNEL752C5",
    verified: false,
    note: "From a third-party license listing. Verify on the WA L&I contractor lookup before launch.",
  } as Fact<string>,

  /** Unknown. Leave null until Acorn confirms; nothing shows hours until then. */
  hours: null as null | { days: string; open: string; close: string }[],

  /** No 24/7 or emergency promise anywhere on the site until this is confirmed. */
  emergencyService: { value: false, verified: false } as Fact<boolean>,

  url: "https://www.callacornelectric.com",

  /** Only genuine, confirmed Acorn profiles go here. Empty on purpose. */
  social: [] as { label: string; href: string }[],

  /** Google Business Profile links (found Oct 19, 2026). */
  google: {
    // Public Maps link for the listing (3707 E Decatur Ave #2 shows on it; the
    // address itself is still unresolved, see docs/client-facts-checklist.md).
    profileUrl: "https://www.google.com/maps?cid=10070915066178567807" as string | null,
    reviewUrl: "https://www.google.com/maps?cid=10070915066178567807" as string | null,
  },
} as const;

export const tel = `tel:${site.phone.value.e164}`;
export const mailto = `mailto:${site.email.value}`;
