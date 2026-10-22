import Link from "next/link";
import { PanelSchedule } from "@/components/sections/panel-schedule";
import { SectionHead } from "@/components/ui/section-head";
import { publishedServices as services } from "@/content/services";
import { ServiceDeck } from "./service-deck";

export function FeaturedServices() {
  return (
    <section className="on-night relative bg-night-900 py-14 text-white max-lg:py-10! sm:py-20 md:max-lg:py-12! lg:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHead
          tone="night"
          label="What we do most"
          title={<span id="services-title">The jobs Spokane homes ask for most.</span>}
          intro="Every service has its own page with what's involved, what affects it, and answers to the questions people actually ask."
        />

        {/* A side-scrolling deck of the first six services (site order) at every width. */}
        <ServiceDeck
          items={services.slice(0, 6).map((s) => ({ slug: s.slug, name: s.name, short: s.short, lede: s.lede, image: s.image }))}
        />

        {/* Phones and tablets: the full list one tap away. */}
        <Link
          href="/services"
          className="mt-5 flex min-h-12 items-center justify-center gap-2 border border-volt-400/60 px-4 font-semibold text-volt-300 hover:border-volt-300 hover:text-volt-200 md:mt-6 md:inline-flex lg:hidden"
        >
          See all {services.length} services <span aria-hidden="true">→</span>
        </Link>

        {/* Desktop: the full circuit list under the deck. */}
        <div className="mt-24 grid gap-10 max-lg:hidden lg:grid-cols-12">
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
    </section>
  );
}
