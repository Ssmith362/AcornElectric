/**
 * Validation rules shared by the browser (instant feedback) and the API routes
 * (the check that counts, because anything can POST to an endpoint).
 * Keep this file free of server-only or browser-only imports.
 */

export const LIMITS = {
  name: 100,
  email: 160,
  phone: 40,
  location: 160,
  service: 80,
  message: 4000,
  short: 120,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** At least 10 digits once punctuation is ignored. */
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 10 && /^[\d\s().+-]+$/.test(v);

export type Errors = Record<string, string>;

export function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const hasBreak = (v: string) => /[\r\n]/.test(v);

/* ------------------------------------------------------------------ inquiry */

export const CONTACT_METHODS = ["Phone call", "Text", "Email"] as const;

export type Inquiry = {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  message: string;
  contactMethod: string;
  source: string;
};

export function validateInquiry(raw: Record<string, unknown>): { data: Inquiry; errors: Errors } {
  const data: Inquiry = {
    name: clean(raw.name, LIMITS.name),
    phone: clean(raw.phone, LIMITS.phone),
    email: clean(raw.email, LIMITS.email),
    location: clean(raw.location, LIMITS.location),
    service: clean(raw.service, LIMITS.service),
    message: clean(raw.message, LIMITS.message),
    contactMethod: clean(raw.contactMethod, LIMITS.short),
    source: clean(raw.source, LIMITS.short),
  };
  const errors: Errors = {};
  if (data.name.length < 2 || hasBreak(data.name)) errors.name = "Please enter your name.";
  if (!phoneOk(data.phone)) errors.phone = "Please enter a phone number with area code.";
  if (data.email && (!EMAIL_RE.test(data.email) || hasBreak(data.email)))
    errors.email = "That email address doesn't look right.";
  if (data.contactMethod === "Email" && !data.email) errors.email = "Add an email address so we can reply by email.";
  if (data.location.length < 5) errors.location = "Please enter your address or ZIP code.";
  if (!data.service) errors.service = "Pick the closest option, or “Something else”.";
  if (data.message.length < 10) errors.message = "Tell us a little about the problem or project.";
  return { data, errors };
}

/* -------------------------------------------------------------- application */

export const EXPERIENCE_OPTIONS = ["Less than 2 years", "2–4 years", "5–9 years", "10+ years"] as const;

export type Application = {
  opening: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  certificate: string;
  certNumber: string;
  experience: string;
  residentialService: string;
  driversLicense: string;
  about: string;
};

export function validateApplication(raw: Record<string, unknown>): { data: Application; errors: Errors } {
  const data: Application = {
    opening: clean(raw.opening, LIMITS.short),
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email),
    phone: clean(raw.phone, LIMITS.phone),
    city: clean(raw.city, LIMITS.short),
    certificate: clean(raw.certificate, LIMITS.short),
    certNumber: clean(raw.certNumber, LIMITS.short),
    experience: clean(raw.experience, LIMITS.short),
    residentialService: clean(raw.residentialService, 10),
    driversLicense: clean(raw.driversLicense, 10),
    about: clean(raw.about, LIMITS.message),
  };
  const errors: Errors = {};
  if (!data.opening) errors.opening = "Choose a role, or general interest.";
  if (data.name.length < 2 || hasBreak(data.name)) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email) || hasBreak(data.email)) errors.email = "Please enter a valid email address.";
  if (!phoneOk(data.phone)) errors.phone = "Please enter a phone number with area code.";
  if (data.city.length < 2) errors.city = "Where are you based?";
  if (!data.certificate) errors.certificate = "Choose the closest option.";
  if (!data.experience) errors.experience = "Choose the closest option.";
  if (!["Yes", "No"].includes(data.residentialService)) errors.residentialService = "Please answer yes or no.";
  if (!["Yes", "No"].includes(data.driversLicense)) errors.driversLicense = "Please answer yes or no.";
  if (data.about.length < 20) errors.about = "A few sentences about your experience, please.";
  return { data, errors };
}

/* ------------------------------------------------------------------- resume */

export const RESUME = {
  maxBytes: 5 * 1024 * 1024,
  accept: ".pdf,.doc,.docx",
  label: "PDF or Word, up to 5 MB",
} as const;

export function resumeNameOk(name: string) {
  return /\.(pdf|docx?)$/i.test(name);
}
