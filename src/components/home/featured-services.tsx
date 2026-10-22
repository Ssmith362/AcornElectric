import Link from "next/link";
import { PanelSchedule } from "@/components/sections/panel-schedule";
import { SectionHead } from "@/components/ui/section-head";
import { publishedServices as services } from "@/content/services";
import { ServiceDeck } from "./service-deck";

export function FeaturedServices() {
  return (
    <section className="on-night relative bg-night-900 py-2 text-white xl:py-28" aria-label="Featured electrical services">
      <div className="container-x">
        <div className="xl:hidden">
          <Accordion
            headingLevel={2}
            collapse="always"
            tone="night"
            items={[
              {
                title: `What we do most · ${services.slice(0, 6).length} services`,
                body: (
                  <div>
                    <ul className="divide-y divide-white/12 border-y border-white/12">
                      {services.slice(0, 6).map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="flex min-h-12 items-center justify-between gap-3 py-2 text-sm font-medium text-white hover:text-volt-300"
                          >
                            <span>{service.problem}</span>
                            <span aria-hidden="true" className="shrink-0 text-volt-400">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/services"
                      className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-volt-300 hover:text-volt-200"
                    >
                      See all {services.length} services <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="hidden xl:block">
          <SectionHead
            tone="night"
            label="What we do most"
            title={<span id="services-title">The jobs Spokane homes ask for most.</span>}
            intro="Every service has its own page with what's involved, what affects it, and answers to the questions people actually ask."
          />

          <ServiceDeck
            items={services.slice(0, 6).map((s) => ({ slug: s.slug, name: s.name, short: s.short, lede: s.lede, image: s.image }))}
          />

          <div className="mt-24 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <h3 className="text-3xl leading-tight font-bold">Everything on the panel</h3>
              <p className="mt-4 text-mist-300">The full list of work we take on. Pick a circuit.</p>
              <Link href="/services" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-volt-300 hover:text-volt-200">
                See all {services.length} services <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="lg:col-span-8">
              <PanelSchedule />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
