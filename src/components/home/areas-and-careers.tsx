import Link from "next/link";
import { AreaMap } from "@/components/sections/area-map";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { SectionHead } from "@/components/ui/section-head";
import { communities } from "@/content/areas";
import { images } from "@/content/images";
import { AreaSelector } from "./area-selector";

export function AreasBlock() {
  return (
    <section className="on-night bg-night-900 py-14 text-white max-lg:py-10! sm:py-20 md:max-lg:py-12! lg:py-28" aria-labelledby="areas-title">
      <div className="container-x grid items-center gap-8 max-lg:gap-6! sm:gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            tone="night"
            label="Where we work"
            title={<span id="areas-title">Spokane and eleven communities around it.</span>}
            intro="Not sure if we cover your address? Put your ZIP code in the request form and we'll tell you straight away."
          />
          <ul className="mt-6 grid grid-cols-2 gap-x-6 border-t border-white/10 max-lg:hidden sm:mt-8" data-reveal>
            {communities.map((c) => (
              <li key={c.name} className="border-b border-white/10">
                {c.page ? (
                  <Link href={`/areas/${c.page}`} className="flex items-center justify-between py-3 hover:text-volt-300">
                    {c.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <Link href={`/areas#${c.name.toLowerCase().replace(/\s+/g, "-")}`} className="block py-3 text-mist-200 hover:text-volt-300">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="max-lg:hidden lg:col-span-7" data-reveal>
          <AreaMap />
        </div>
        {/* Phones and tablets: chips to pick a community, the diagram beneath. */}
        <div className="lg:hidden" data-reveal>
          <AreaSelector />
        </div>
      </div>
    </section>
  );
}

export function CareersTeaser() {
  return (
    <section className="bg-mist-50 py-12 sm:py-20 lg:py-24" aria-labelledby="careers-title">
      <div className="container-x grid items-center gap-6 border-y-2 border-ink py-8 sm:gap-10 sm:py-12 lg:grid-cols-12">
        {/* Placeholder drawing until a real van photo exists: desktop only, so it doesn't cost phone scroll. */}
        <div className={images.van.src ? "lg:col-span-4" : "hidden lg:col-span-4 lg:block"} data-reveal>
          <Photo id="van" sizes="(min-width: 1024px) 30vw, 100vw" ticks={false} />
        </div>
        <div className="lg:col-span-5" data-reveal>
          <p className="label-mono flex items-center gap-3 text-copper-700">
            <span aria-hidden="true" className="h-px w-8 bg-copper-500/60" />
            For electricians
          </p>
          <h2 id="careers-title" className="mt-3 text-[1.75rem] leading-tight font-bold sm:mt-4 sm:text-4xl">
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
