import Link from "next/link";
import { AreaMap } from "@/components/sections/area-map";
import { Collapsible } from "@/components/ui/collapsible";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { SectionHead } from "@/components/ui/section-head";
import { communities } from "@/content/areas";
import { images } from "@/content/images";

function CommunityList({ items }: { items: typeof communities }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6">
      {items.map((c) => (
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
  );
}

export function AreasBlock() {
  return (
    <section className="on-night bg-night-900 py-14 text-white sm:py-20 lg:py-28" aria-labelledby="areas-title">
      <div className="container-x grid items-center gap-8 sm:gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            tone="night"
            label="Where we work"
            title={<span id="areas-title">Spokane and eleven communities around it.</span>}
            intro="Not sure we cover your address? Add your ZIP code to the request form and we'll confirm."
          />
          <Collapsible
            className="mt-6 sm:mt-8"
            showLabel={`Show all ${communities.length} communities`}
            hideLabel="Hide communities"
          >
            <CommunityList items={communities} />
          </Collapsible>
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
            Experienced residential electrician? We&apos;re hiring.
          </h2>
          <p className="mt-4 text-ink-soft">
            New vans, fully stocked tools and a team book club. We want someone who can run their own jobs.
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
