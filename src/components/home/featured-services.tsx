import Link from "next/link";
import { PanelSchedule } from "@/components/sections/panel-schedule";
import { Photo } from "@/components/ui/photo";
import { SectionHead } from "@/components/ui/section-head";
import { getService, publishedServices as services } from "@/content/services";

const featured = ["ev-charger-installation", "electrical-panel-upgrades", "hot-tub-wiring"];

export function FeaturedServices() {
  const list = featured.map(getService).filter((s) => !!s);
  return (
    <section className="on-night relative bg-night-900 py-14 text-white sm:py-20 lg:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHead
          tone="night"
          label="What we do most"
          title={<span id="services-title">The jobs Spokane homes ask for most.</span>}
          intro="Every service has its own page with what's involved, what affects it, and answers to the questions people actually ask."
        />

        <div className="mt-9 space-y-12 sm:mt-16 sm:space-y-20 lg:space-y-28">
          {list.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
                <Photo id={s.image} sizes="(min-width: 1024px) 55vw, 100vw" className="border border-white/10 max-sm:aspect-[16/9]!" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`} data-reveal>
                <h3 className="text-3xl leading-[1.05] font-bold sm:text-4xl">{s.short}</h3>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-mist-300 sm:mt-5 sm:text-lg">{s.lede}</p>
                <ul className="mt-4 space-y-2 text-mist-200 sm:mt-6 sm:space-y-2.5">
                  {s.doneRight.points.slice(0, 3).map((p) => (
                    <li key={p.title} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-copper-400" />
                      {p.title}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${s.slug}`}
                  className="group mt-5 inline-flex min-h-11 items-center gap-3 border-b border-volt-400 pb-1 font-semibold text-white hover:text-volt-300 sm:mt-8"
                >
                  {s.name}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:mt-24 sm:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <h3 className="text-3xl leading-tight font-bold">Everything on the panel</h3>
            <p className="mt-3 text-mist-300 sm:mt-4">The full list of work we take on. Pick a circuit.</p>
            <Link
              href="/services"
              className="mt-5 inline-flex min-h-12 items-center gap-2 border border-volt-400/60 px-4 font-semibold text-volt-300 hover:border-volt-300 hover:text-volt-200 sm:mt-6 md:min-h-11 md:border-0 md:px-0"
            >
              See all {services.length} services <span aria-hidden="true">→</span>
            </Link>
          </div>
          {/* Phones: the button above, the menu and the footer already list every
              service, so the circuit list only shows from tablet up. */}
          <div className="hidden md:block lg:col-span-8">
            <PanelSchedule />
          </div>
        </div>
      </div>
    </section>
  );
}
