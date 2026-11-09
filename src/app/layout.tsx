import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
import { ArtDefs } from "@/components/ui/placeholder-art";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { ALLOW_INDEXING, BASE_URL } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

// Website type (Nov 2026 "Option 4" theme): Barlow Semi Condensed for headings,
// Inter for body and labels. The logo keeps its own lettering; Eric approved
// different website fonts. Self-hosted (see ./fonts/README.md) so builds never
// fetch from Google.
const barlow = localFont({
  src: [
    { path: "./fonts/barlow-semi-condensed-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/barlow-semi-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-semi-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
});
const inter = localFont({
  src: "./fonts/inter-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Acorn Electric | Electrician in Spokane, WA",
    template: "%s | Acorn Electric",
  },
  description:
    "Electrical services for Spokane homes and businesses. Repairs, upgrades, lighting, EV chargers and more. Call Acorn Electric.",
  applicationName: site.name,
  // Belt and braces with robots.txt: preview builds are never indexable.
  ...(ALLOW_INDEXING ? {} : { robots: { index: false, follow: false } }),
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#102b20",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${barlow.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="label-mono sr-only z-[100] bg-volt-400 px-4 py-3 text-night-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <ArtDefs />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCallBar />
        <RevealObserver />
        <JsonLd data={businessSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
