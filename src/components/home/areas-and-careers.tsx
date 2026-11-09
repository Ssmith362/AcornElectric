import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { communities } from "@/content/areas";
import { images } from "@/content/images";
import { ServiceArea } from "./service-area";

export function AreasBlock() {
  return (
    <section className="bg-mist-100 py-16 sm:py-24 lg:py-28" aria-labelledby="areas-title">
      <div className="container-x">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12" data-reveal>
          <div>
            <p className="label-mono text-copper-600">Service areas</p>
            <h2 id="areas-title" className="mt-3 max-w-[18ch] text-[2.5rem] leading-[0.99] text-night-900 sm:text-[3.4rem] lg:text-[clamp(2.4rem,4.2vw,3.6rem)]">
              Spokane and eleven communities around it.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[0.9rem] leading-relaxed text-ink-mute">
            Point at a town to see who issues its permit. Not sure we cover your address? Add your ZIP code to the request form and we&apos;ll confirm.
          </p>
        </div>
        <div className="mt-8 sm:mt-10" data-reveal>
          <ServiceArea communities={communities} />
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
