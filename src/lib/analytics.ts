export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Count a lead only after the service request email is confirmed sent. */
export function trackLead() {
  window.gtag?.("event", "generate_lead");
}