import Link from "next/link";
import type { CSSProperties } from "react";
import { FeaturedServices } from "@/components/home/featured-services";
import { Hero } from "@/components/home/hero";
import { Reviews } from "@/components/home/reviews";
import { AreasBlock, CareersTeaser } from "@/components/home/areas-and-careers";
import { CtaSection } from "@/components/sections/cta-section";
import { Process } from "@/components/sections/process";

export const metadata = {
  title: "Homepage design directions | Acorn Electric",
  robots: { index: false, follow: false },
};

const directions = {
  acorn: {
    name: "Acorn green",
    note: "Forest green · Acorn orange · warm cream",
    headingFont: "Barlow Semi Condensed",
    bodyFont: "Inter",
    colors: {
      "--color-night-950": "#0b291d", "--color-night-900": "#123626",
      "--color-night-850": "#173d2d", "--color-night-800": "#1d4734",
      "--color-night-700": "#28583f", "--color-night-600": "#356d4c",
      "--color-night-500": "#4b805d",
      "--color-volt-200": "#f9dfc2", "--color-volt-300": "#f4b77a",
      "--color-volt-400": "#eb8c42", "--color-volt-500": "#e16521",
      "--color-volt-600": "#b94c17", "--color-volt-ink": "#8a3e14",
      "--color-copper-200": "#f6d4b5", "--color-copper-300": "#eca773",
      "--color-copper-400": "#e48647", "--color-copper-500": "#e16521",
      "--color-copper-600": "#a94819", "--color-copper-700": "#853811",
      "--color-mist-50": "#fffaf0", "--color-mist-100": "#f7f0df",
      "--color-mist-200": "#ece2cd", "--color-mist-300": "#d9cfba",
      "--color-mist-400": "#aaa08c", "--color-brand-yellow": "#e8bd4c",
      "--color-brand-orange": "#e16521", "--color-brand-green": "#0b291d",
      "--color-brand-cream": "#f7f0df", "--color-brand-leaf": "#28583f",
      "--color-brand-ember": "#d74d21", "--color-ink": "#1b2921",
      "--color-ink-soft": "#45544a", "--color-ink-mute": "#56635b",
      "--color-line": "#d9cfba",
      "--font-display": '"Barlow Semi Condensed", sans-serif',
      "--font-sans": '"Inter", sans-serif',
      "--font-mono": '"Inter", sans-serif',
    },
  },
  warm: {
    name: "Warm field notes",
    note: "Deep evergreen · clay orange · parchment",
    headingFont: "Manrope",
    bodyFont: "Inter",
    colors: {
      "--color-night-950": "#11271e", "--color-night-900": "#19372a",
      "--color-night-850": "#1d4030", "--color-night-800": "#244a37",
      "--color-night-700": "#315a43", "--color-night-600": "#426d53",
      "--color-night-500": "#5b8065",
      "--color-volt-200": "#f8e2ca", "--color-volt-300": "#e9b184",
      "--color-volt-400": "#d88b55", "--color-volt-500": "#c76a36",
      "--color-volt-600": "#a65329", "--color-volt-ink": "#844222",
      "--color-copper-200": "#f4d9c1", "--color-copper-300": "#e7b08a",
      "--color-copper-400": "#d98c5d", "--color-copper-500": "#c76a36",
      "--color-copper-600": "#9e4f2c", "--color-copper-700": "#7c3c22",
      "--color-mist-50": "#fbf6eb", "--color-mist-100": "#f3ead8",
      "--color-mist-200": "#e8dcc5", "--color-mist-300": "#d5c8b1",
      "--color-mist-400": "#a89b86", "--color-brand-yellow": "#d9b257",
      "--color-brand-orange": "#c76a36", "--color-brand-green": "#11271e",
      "--color-brand-cream": "#f3ead8", "--color-brand-leaf": "#315a43",
      "--color-brand-ember": "#b85631", "--color-ink": "#242a22",
      "--color-ink-soft": "#50574d", "--color-ink-mute": "#62665b",
      "--color-line": "#d5c8b1",
      "--font-display": '"Manrope", sans-serif',
      "--font-sans": '"Inter", sans-serif',
      "--font-mono": '"Inter", sans-serif',
    },
  },
  modern: {
    name: "Modern current",
    note: "Blue-green · clear orange · light cream",
    headingFont: "Sora",
    bodyFont: "DM Sans",
    colors: {
      "--color-night-950": "#082b2a", "--color-night-900": "#103a37",
      "--color-night-850": "#164540", "--color-night-800": "#1e514a",
      "--color-night-700": "#2a6459", "--color-night-600": "#39786a",
      "--color-night-500": "#548f7d",
      "--color-volt-200": "#fae0cb", "--color-volt-300": "#f5b47c",
      "--color-volt-400": "#ef914d", "--color-volt-500": "#ed762f",
      "--color-volt-600": "#c45924", "--color-volt-ink": "#94421e",
      "--color-copper-200": "#f6d7c2", "--color-copper-300": "#f0b28b",
      "--color-copper-400": "#e9925f", "--color-copper-500": "#ed762f",
      "--color-copper-600": "#a84c24", "--color-copper-700": "#85391c",
      "--color-mist-50": "#fffaf0", "--color-mist-100": "#f3f0e5",
      "--color-mist-200": "#e5e2d4", "--color-mist-300": "#d0cdbf",
      "--color-mist-400": "#a09f92", "--color-brand-yellow": "#d9ad43",
      "--color-brand-orange": "#ed762f", "--color-brand-green": "#082b2a",
      "--color-brand-cream": "#f3f0e5", "--color-brand-leaf": "#2a6459",
      "--color-brand-ember": "#d45d2e", "--color-ink": "#172a27",
      "--color-ink-soft": "#455550", "--color-ink-mute": "#596a64",
      "--color-line": "#d0cdbf",
      "--font-display": '"Sora", sans-serif',
      "--font-sans": '"DM Sans", sans-serif',
      "--font-mono": '"DM Sans", sans-serif',
    },
  },
} as const;

type Direction = keyof typeof directions;

export default async function HomepageDirectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ direction?: string }>;
}) {
  const params = await searchParams;
  const key: Direction = params.direction === "warm" || params.direction === "modern" ? params.direction : "acorn";
  const direction = directions[key];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700&display=swap"
      />
      <div className="homepage-directions" style={direction.colors as CSSProperties}>
        <div className="container-x py-4 sm:py-6">
          <div className="border-y border-line py-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="label-mono text-copper-700">Homepage design directions</p>
              <p className="mt-1 text-sm text-ink-soft">Same Acorn content and layout · different palettes and type</p>
            </div>
            <nav aria-label="Choose a homepage style" className="mt-4 flex flex-wrap gap-2 sm:mt-0">
              {(Object.keys(directions) as Direction[]).map((option, index) => (
                <Link
                  key={option}
                  href={option === "acorn" ? "?direction=acorn" : `?direction=${option}`}
                  aria-current={key === option ? "page" : undefined}
                  className={`min-h-11 border px-3 py-2 text-sm font-semibold transition-colors ${key === option ? "border-night-900 bg-night-900 text-mist-50" : "border-line text-ink hover:border-night-900"}`}
                >
                  {index + 1}. {directions[option].name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-mute">
            <span className="font-semibold text-ink">{direction.note}</span>
            <span>Headings: {direction.headingFont}</span>
            <span>Body: {direction.bodyFont}</span>
          </div>
        </div>
        <Hero />
        <FeaturedServices />
        <Process />
        <Reviews />
        <AreasBlock />
        <CareersTeaser />
        <CtaSection
          source="/"
          title={<>Tell us about<br />your project.</>}
          body="A few details and a photo or two is plenty. We'll come back to you to talk it through."
        />
      </div>
    </>
  );
}
