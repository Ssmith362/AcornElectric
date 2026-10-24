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

// Brand fonts per Eric's guide: Luckiest Guy (primary), Modica SemiBold (secondary;
// Montserrat is the free stand-in until a Modica web licence/file arrives).
// Self-hosted (see ./fonts/README.md) so builds never fetch from Google.
const luckiest = localFont({
  src: "./fonts/luckiest-guy-400.woff2",
  variable: "--font-luckiest",
  weight: "400",
  display: "swap",
});
const montserrat = localFont({
  src: "./fonts/montserrat-variable.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/geist-mono-variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Acorn Electric | Electrician in Spokane, WA",
    template: "%s | Acorn Electric",
  },
  description:
    "Electrical services for Spokane homes and businesses. Repairs, upgrades, lighting, EV chargers and more. Tell Acorn Electric about your project.",
  applicationName: site.name,
  // Belt and braces with robots.txt: preview builds are never indexable.
  ...(ALLOW_INDEXING ? {} : { robots: { index: false, follow: false } }),
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#012730",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${luckiest.variable} ${montserrat.variable} ${geistMono.variable}`}>
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
