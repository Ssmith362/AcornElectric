import Link from "next/link";
import { AreaMap } from "@/components/sections/area-map";
import { CtaSection } from "@/components/sections/cta-section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { communities } from "@/content/areas";
import { publishedServices as services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electrician Service Areas: Spokane & Nearby | Acorn Electric",
  description:
    "Electrical work for homes and businesses in Spokane, Spokane Valley, Mead and nearby communities. Ask Acorn Electric about your location and project.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <section className="on-night bg-grid-night text-white">
        <div className="container-x pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
          <Breadcrumbs trail={[{ name: "Service areas", path: "/areas" }]} />
          <div className="mt-7 grid items-center gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="label-mono text-volt-400">Service areas</p>
              <h1 className="mt-3 text-[2.6rem] leading-[0.98] sm:mt-5 sm:text-5xl font-bold tracking-[0.01em] sm:text-6xl">
                Electrician for Spokane and nearby.
              </h1>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-mist-300 sm:mt-6 sm:text-lg">
                Acorn Electric works with homes and businesses across Spokane and nearby communities. If you&apos;re
                nearby and not listed, ask; we&apos;ll tell you honestly whether we can help.
              </p>
            </div>
            <div className="lg:col-span-7">
              <AreaMap />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-12 sm:py-16 lg:py-24">
        <div className="container-x grid gap-8 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl leading-tight sm:text-4xl">Spokane</h2>
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
            {communities.filter((c) => c.name !== "Spokane").map((c) => {
              const inner = (
                <>
                  <span className="font-display text-xl sm:text-2xl">{c.name}</span>
                  <span className="text-ink-soft">{c.note}</span>
                  <span aria-hidden="true" className={c.page ? "transition-transform group-hover:translate-x-1" : "opacity-0"}>→</span>
                </>
              );
              const cls = "group grid gap-1.5 px-5 py-4 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:gap-6 sm:p-6";
              return (
                <li key={c.name} id={c.name.toLowerCase().replace(/\s+/g, "-")} className="bg-mist-50">
                  {c.page ? (
                    <Link href={`/areas/${c.page}`} className={`${cls} hover:bg-white`}>{inner}</Link>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
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
