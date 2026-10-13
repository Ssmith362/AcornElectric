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
 * and out of structured data. Washington's pay-transparency law (RCW
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
    title: "Residential Electrician (02)",
    status: "open",
    summary:
      "An experienced residential electrician who can run a service call or an install on their own, talk a homeowner through what's going on, and leave the job better than they found it.",
    bring: [
      "A current Washington electrician certificate that covers residential work (02 residential specialty or journey level)",
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
