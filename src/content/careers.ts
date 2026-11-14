/**
 * Job openings. Edit this file to open, pause or close a role.
 *
 * status:
 *   "open"   → shown as open, selectable on the application form, and, only
 *              when `posting` is fully filled in, emitted as JobPosting
 *              structured data.
 *   "paused" → shown as "not currently hiring for this role"; general
 *              interest applications still accepted.
 *   "closed" → hidden.
 *
 * Never invent pay, benefits or schedules. Fields left null stay off the page
 * and out of structured data; the page says once, plainly, which terms aren't
 * listed yet (postingDetails below). Pending owner input is tracked in
 * docs/client-facts-checklist.md, not on the page. Washington's pay-transparency law (RCW
 * 49.58.110) requires a wage scale in postings for employers with 15 or more
 * employees. Confirm with Acorn whether it applies.
 */

export type Opening = {
  id: string;
  title: string;
  status: "open" | "paused" | "closed";
  summary: string;
  bring: string[];
  /** Everything Google's JobPosting requires. All null until Acorn confirms. */
  posting: {
    datePosted: string | null;
    validThrough: string | null;
    employmentType: "FULL_TIME" | "PART_TIME" | null;
    pay: { min: number; max: number; unit: "HOUR" | "YEAR" } | null;
    benefits: string[] | null;
    schedule: string | null;
  };
};

export const openings: Opening[] = [
  {
    id: "residential-electrician",
    // The exact certificate requirement (02 only, or 01 as well) is pending
    // from Eric, so neither the title nor the list below names a class.
    title: "Residential Electrician",
    status: "open",
    summary:
      "An experienced residential electrician who can run a service call or an install on their own, talk a homeowner through what's going on, and leave the job better than they found it.",
    bring: [
      "A current Washington electrician certificate for residential work",
      "Real experience on residential service and installs: panels, circuits, troubleshooting",
      "Comfort running a job on your own and talking with homeowners",
      "A valid driver's license",
      "Pride in clean, code-compliant work",
    ],
    posting: {
      datePosted: null,
      validThrough: null,
      employmentType: null,
      pay: null,
      benefits: null,
      schedule: null,
    },
  },
];

export const certificateOptions = [
  "02 Residential specialty",
  "01 Journey level (general)",
  "Other WA specialty certificate",
  "Trainee",
  "Licensed in another state",
  "None yet",
] as const;

/** A posting is only real enough for JobPosting schema when every field is set. */
export function isPostingComplete(o: Opening) {
  const p = o.posting;
  return o.status === "open" && !!p.datePosted && !!p.validThrough && !!p.employmentType && !!p.pay;
}

/** Confirmed posting terms to show, and the ones still missing (for one honest line). */
export function postingDetails(o: Opening) {
  const p = o.posting;
  const rows: { k: string; v: string; wide?: boolean }[] = [{ k: "Location", v: "Spokane, WA" }];
  const missing: string[] = [];
  if (p.employmentType) rows.push({ k: "Type", v: p.employmentType === "FULL_TIME" ? "Full-time" : "Part-time" });
  else missing.push("employment type");
  if (p.pay) rows.push({ k: "Pay", v: `$${p.pay.min}–$${p.pay.max} / ${p.pay.unit === "HOUR" ? "hour" : "year"}` });
  else missing.push("pay");
  if (p.schedule) rows.push({ k: "Schedule", v: p.schedule });
  else missing.push("schedule");
  if (p.benefits?.length) rows.push({ k: "Benefits", v: p.benefits.join(" · "), wide: true });
  else missing.push("benefits");
  return { rows, missing };
}
