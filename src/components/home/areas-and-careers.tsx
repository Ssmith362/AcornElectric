import Link from "next/link";
import { AreaMap } from "@/components/sections/area-map";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { SectionHead } from "@/components/ui/section-head";
import { publishedAreas as areas } from "@/content/areas";

export function AreasBlock() {
  return (
    <section className="on-night bg-night-900 py-20 text-white lg:py-28" aria-labelledby="areas-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            tone="night"
            index="05"
            label="Where we work"
            title={<span id="areas-title">Spokane, and the communities around it.</span>}
            intro="Not sure if we cover your address? Put your ZIP code in the request form and we'll tell you straight away."
          />
          <ul className="mt-8 border-t border-white/10" data-reveal>
            {areas.map((a) => (
              <li key={a.slug} className="border-b border-white/10">
                <Link href={`/areas/${a.slug}`} className="flex items-center justify-between py-3.5 text-lg hover:text-volt-300">
                  {a.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <AreaMap />
        </div>
      </div>
    </section>
  );
}

export function CareersTeaser() {
  return (
    <section className="bg-mist-50 py-20 lg:py-24" aria-labelledby="careers-title">
      <div className="container-x grid items-center gap-10 border-y-2 border-ink py-12 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <Photo id="van" sizes="(min-width: 1024px) 30vw, 100vw" ticks={false} />
        </div>
        <div className="lg:col-span-5" data-reveal>
          <p className="label-mono text-copper-700">06 · For electricians</p>
          <h2 id="careers-title" className="mt-4 text-3xl leading-tight font-bold sm:text-4xl">
            Experienced residential electrician? Grow with a company that invests in you.
          </h2>
          <p className="mt-4 text-ink-soft">
            New vans, fully stocked tools, and a team that reads together. We&apos;re looking for someone ready to own
            their work and grow into leadership.
          </p>
        </div>
        <div className="lg:col-span-3 lg:text-right" data-reveal>
          <ButtonLink href="/careers" variant="ink" arrow>
            See careers
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
