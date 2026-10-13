import type { Metadata } from "next";
import Link from "next/link";
import { ButtonAnchor, ButtonLink, PhoneGlyph } from "@/components/ui/button";
import { publishedServices as services } from "@/content/services";
import { site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-night bg-grid-night text-white">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="label-mono text-volt-400">Error 404 · open circuit</p>
          <h1 className="mt-5 text-5xl leading-none font-bold sm:text-6xl">
            This page isn&apos;t <span className="text-lit">connected</span>.
          </h1>
          <p className="mt-6 max-w-md text-lg text-mist-300">
            The link may be old, or the page has moved. If you were looking for a specific service, it&apos;s probably
            one of these.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" arrow>Back to the homepage</ButtonLink>
            <ButtonAnchor href={tel} variant="outline-night">
              <PhoneGlyph /> {site.phone.value.display}
            </ButtonAnchor>
          </div>
        </div>
        <ul className="grid content-start border-t border-white/10">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-white/10">
              <Link href={`/services/${s.slug}`} className="flex items-center justify-between py-3.5 hover:text-volt-300">
                {s.short}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
