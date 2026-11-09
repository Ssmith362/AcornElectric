import Link from "next/link";
import Image from "next/image";
import { AreaMap } from "@/components/sections/area-map";
import { Collapsible } from "@/components/ui/collapsible";
import { SectionHead } from "@/components/ui/section-head";
import { ButtonLink } from "@/components/ui/button";
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

/** Dark panel with the text, and a portrait that overhangs its top and right edges. */
export function CareersTeaser() {
  const eric = images.careers;
  return (
    <section className="bg-mist-50 py-14 sm:py-20 lg:py-28" aria-labelledby="careers-title">
      <div className="container-x">
        <div className="on-night relative flex flex-col bg-night-900 text-mist-100 lg:block lg:min-h-[36rem]">
          <div className="relative z-10 px-6 pt-8 pb-10 sm:px-10 lg:w-[46%] lg:py-20 lg:pr-0 lg:pl-14" data-reveal>
            <p className="label-mono flex items-center gap-3 text-volt-400">
              <span aria-hidden="true" className="h-px w-8 bg-volt-400/60" />
              Careers
            </p>
            <h2 id="careers-title" className="mt-4 text-[2.1rem] leading-[1.02] text-white sm:text-[2.8rem]">
              Experienced residential electrician? We&apos;re hiring.
            </h2>
            <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed text-mist-200">
              New vans, fully stocked tools and a team book club. We want someone who can run their own jobs.
            </p>
            <div className="mt-8">
              <ButtonLink href="/careers" variant="outline-night" arrow>
                See careers
              </ButtonLink>
            </div>
          </div>
          {eric.src ? (
            <div className="relative order-first aspect-[4/3] w-full lg:absolute lg:-top-10 lg:-right-5 lg:bottom-20 lg:aspect-auto lg:w-[50%]" data-reveal>
              <Image
                src={eric.src}
                alt={eric.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                style={{ objectPosition: eric.focus }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
