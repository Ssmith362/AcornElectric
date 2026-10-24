import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { PanelSchedule } from "@/components/sections/panel-schedule";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Photo } from "@/components/ui/photo";
import { serviceGroups } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electrical Services in Spokane | Acorn Electric",
  description:
    "Electrical services for Spokane homes and businesses, including repairs, panels, EV chargers, lighting and remodels. Other project? Ask Acorn Electric.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="on-night bg-grid-night text-white">
        <div className="container-x grid gap-8 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:grid-cols-12 lg:gap-12 lg:pt-10 lg:pb-24">
          <div className="lg:col-span-12">
            <Breadcrumbs trail={[{ name: "Services", path: "/services" }]} />
          </div>
          <div className="lg:col-span-5">
            <p className="label-mono text-volt-400">Electrical services</p>
            <h1 className="mt-3 text-[2.6rem] leading-[1] font-bold tracking-[0.01em] sm:mt-5 sm:text-6xl sm:leading-[0.98]">
              Your electrical project, done properly.
            </h1>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-mist-300 sm:mt-6 sm:text-lg">
              These are some of the jobs we handle for Spokane homes and businesses. Each guide explains what
              to expect. Don&apos;t see your project listed? Ask us about it.
            </p>
            {/* Phones get jump links to the groups below instead of the full circuit list. */}
            <nav aria-label="Service groups" className="mt-6 lg:hidden">
              <ul className="flex flex-wrap gap-2">
                {serviceGroups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="inline-flex min-h-11 items-center border border-white/25 px-3.5 text-sm font-semibold hover:border-volt-400 hover:text-volt-300">
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="hidden lg:col-span-7 lg:block">
            <PanelSchedule />
          </div>
        </div>
      </section>

      {serviceGroups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          aria-labelledby={`${g.id}-title`}
          className={`py-10 sm:py-14 lg:py-20 ${gi % 2 ? "bg-mist-100" : "bg-mist-50"}`}
        >
          <div className="container-x">
            <h2 id={`${g.id}-title`} className="text-[1.75rem] leading-tight sm:text-4xl">
              {g.title}
            </h2>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:mt-8 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
              {g.services.map((s, i) => (
                <li key={s.slug} data-reveal style={{ ["--reveal-i" as string]: i % 3 }}>
                  <Link href={`/services/${s.slug}`} className="group grid grid-cols-[7.5rem_1fr] items-start gap-4 md:block">
                    <Photo
                      id={s.image}
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 120px"
                      ticks={false}
                      compactLabel
                    />
                    <div>
                      <h3 className="text-lg leading-tight font-bold group-hover:underline group-hover:decoration-volt-500 group-hover:decoration-2 group-hover:underline-offset-4 md:mt-5 md:text-2xl">
                        {s.name}
                      </h3>
                      <span className="mt-1 block text-[0.95rem] leading-snug text-ink-soft md:mt-2 md:text-base">{s.problem}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaSection
        source="/services"
        title={
          <>
            Don&apos;t see your project? <span className="text-lit">Let&apos;s talk.</span>
          </>
        }
        body="The services above are common requests, not everything we do. Choose “Something else / not sure” and tell us about your project."
      />
    </>
  );
}
