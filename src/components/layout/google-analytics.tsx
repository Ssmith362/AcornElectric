"use client";

import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GA4 tag plus one delegated listener that records a `click_to_call` event for
 * any tel: link (header, footer, call bar, CTAs), so phone intent from the site
 * is measurable. Form leads fire `generate_lead` from lib/analytics.ts.
 */
export function GoogleAnalytics() {
  if (!measurementId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag("js", new Date()); gtag("config", "${measurementId}"); document.addEventListener("click", function (e) { var t = e.target; var a = t && t.closest ? t.closest('a[href^="tel:"]') : null; if (a) gtag("event", "click_to_call", { link_location: window.location.pathname }); });`}
      </Script>
    </>
  );
}
