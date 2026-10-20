import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { PanelSchedule } from "@/components/sections/panel-schedule";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Photo } from "@/components/ui/photo";
import { publishedServices as services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Residential Electrical Services in Spokane | Acorn Electric",
  description:
    "EV chargers, panel and service upgrades, hot tubs, knob and tube rewiring, surge protection, remodels, new homes, inspections and repairs for Spokane-area homes.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="on-night bg-grid-night text-white">
        <div className="container-x grid gap-12 pt-8 pb-16 lg:grid-cols-12 lg:pt-10 lg:pb-24">
          <div className="lg:col-span-12">
            <Breadcrumbs trail={[{ name: "Services", path: "/services" }]} />
          </div>
          <div className="lg:col-span-5">
            <p className="label-mono text-volt-400">Residential electrical services</p>
            <h1 className="mt-5 text-5xl leading-[0.98] font-bold tracking-[0.01em] sm:text-6xl">
              What your home needs, done properly.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mist-300">
              Each service below has its own page: what it involves, what affects the job, the code and permit side,
              and straight answers to common questions.
            </p>
          </div>
          <div className="lg:col-span-7">
            <PanelSchedule />
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-16 lg:py-24" aria-label="Service summaries">
        <div className="container-x">
          <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.slug} data-reveal style={{ ["--reveal-i" as string]: i % 3 }}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <Photo id={s.image} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" ticks={false} />
                  <p className="label-mono mt-5 text-copper-700">
                    {String(i + 1).padStart(2, "0")} · {s.tag}
                  </p>
                  <h2 className="mt-2.5 text-2xl leading-tight font-bold group-hover:underline group-hover:decoration-volt-500 group-hover:decoration-2 group-hover:underline-offset-4">
                    {s.name}
                  </h2>
                  <p className="mt-2 text-ink-soft">{s.problem}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        source="/services"
        title={
          <>
            Not sure which one you need? <span className="text-lit">Describe it.</span>
          </>
        }
        body="Pick “Something else / not sure” and tell us what's going on. We'll work out the rest with you."
      />
    </>
  );
}
