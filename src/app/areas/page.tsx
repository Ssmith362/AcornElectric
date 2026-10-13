import Link from "next/link";
import { AreaMap } from "@/components/sections/area-map";
import { CtaSection } from "@/components/sections/cta-section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { otherCommunities, publishedAreas as areas } from "@/content/areas";
import { publishedServices as services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electrician Service Areas: Spokane & Nearby | Acorn Electric",
  description:
    "Acorn Electric serves Spokane homeowners and nearby communities including North Spokane, Mead and Spokane Valley. Check your ZIP code.",
  path: "/areas",
});

export default function AreasPage() {
  const extra = otherCommunities.filter((c) => c.confirmed);
  return (
    <>
      <section className="on-night bg-grid-night text-white">
        <div className="container-x pt-8 pb-16 lg:pt-10 lg:pb-24">
          <Breadcrumbs trail={[{ name: "Service areas", path: "/areas" }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label-mono text-volt-400">Service areas</p>
              <h1 className="mt-5 text-5xl leading-[0.98] font-bold tracking-[-0.035em] sm:text-6xl">
                Electrician for Spokane and nearby.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-mist-300">
                We&apos;re a Spokane residential electrical contractor. Below are the communities we focus on. If
                you&apos;re nearby and not listed, ask; we&apos;ll tell you honestly whether we can help.
              </p>
            </div>
            <div className="lg:col-span-7">
              <AreaMap />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl leading-tight font-bold sm:text-4xl">Spokane</h2>
            <p className="prose-acorn mt-4">
              Spokane is home base. Inside city limits, electrical permits and inspections go through the City of
              Spokane; we handle the permit for work that needs one. Spokane&apos;s mix of early-1900s homes on the
              South Hill and North Side and newer builds on the edges means we see everything from knob-and-tube to
              brand-new 200-amp panels.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {services.filter((s) => s.confirmed).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="inline-block border border-ink/15 px-3 py-1.5 text-sm hover:border-ink">
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-px border border-ink/10 bg-ink/10 lg:col-span-7">
            {areas.map((a) => (
              <li key={a.slug} className="bg-mist-50">
                <Link href={`/areas/${a.slug}`} className="group grid gap-2 p-6 hover:bg-white sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-6">
                  <span className="font-display text-2xl font-bold">{a.name}</span>
                  <span className="text-ink-soft">{a.permitNote}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
            {extra.map((c) => (
              <li key={c.name} className="bg-mist-50 p-6">
                <span className="font-display text-xl font-bold">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        source="/areas"
        title={
          <>
            Not sure if we cover you? <span className="text-lit">Ask.</span>
          </>
        }
        body="Put your address or ZIP code in the form and we'll let you know."
      />
    </>
  );
}
