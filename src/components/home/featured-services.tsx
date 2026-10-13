import Link from "next/link";
import { PanelSchedule } from "@/components/sections/panel-schedule";
import { Photo } from "@/components/ui/photo";
import { SectionHead } from "@/components/ui/section-head";
import { getService } from "@/content/services";

const featured = ["ev-charger-installation", "electrical-panel-upgrades", "hot-tub-wiring"];

export function FeaturedServices() {
  const list = featured.map(getService).filter((s) => !!s);
  return (
    <section className="on-night relative bg-night-900 py-20 text-white lg:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHead
          tone="night"
          index="02"
          label="What we do most"
          title={<span id="services-title">The jobs Spokane homes ask for most.</span>}
          intro="Every service has its own page with what's involved, what affects it, and answers to the questions people actually ask."
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {list.map((s, i) => (
            <article key={s.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`} data-reveal>
                <Photo id={s.image} sizes="(min-width: 1024px) 55vw, 100vw" className="border border-white/10" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`} data-reveal>
                <p className="label-mono text-volt-400">{s.tag}</p>
                <h3 className="mt-4 text-3xl leading-[1.05] font-bold sm:text-4xl">{s.short}</h3>
                <p className="mt-5 text-lg leading-relaxed text-mist-300">{s.lede}</p>
                <ul className="mt-6 space-y-2.5 text-mist-200">
                  {s.doneRight.points.slice(0, 3).map((p) => (
                    <li key={p.title} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-copper-400" />
                      {p.title}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${s.slug}`}
                  className="group mt-8 inline-flex items-center gap-3 border-b border-volt-400 pb-1 font-semibold text-white hover:text-volt-300"
                >
                  {s.name}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <h3 className="text-3xl leading-tight font-bold">Everything on the panel</h3>
            <p className="mt-4 text-mist-300">The full list of residential work we take on. Pick a circuit.</p>
            <Link href="/services" className="mt-6 inline-flex items-center gap-2 font-semibold text-volt-300 hover:text-volt-200">
              All services <span aria-hidden="true">→</span>
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
