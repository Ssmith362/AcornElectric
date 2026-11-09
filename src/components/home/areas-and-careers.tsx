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

export function CareersTeaser() {
  return (
    <section className="bg-mist-50 py-12 sm:py-20 lg:py-24" aria-labelledby="careers-title">
      <div className="container-x grid items-center gap-6 border-y border-line py-8 sm:gap-10 sm:py-12 lg:grid-cols-12">
        {/* Placeholder drawing until a real van photo exists: desktop only, so it doesn't cost phone scroll. */}
        <div className={images.van.src ? "lg:col-span-4" : "hidden lg:col-span-4 lg:block"} data-reveal>
          <Photo id="van" sizes="(min-width: 1024px) 30vw, 100vw" ticks={false} />
        </div>
        <div className="lg:col-span-5" data-reveal>
          <p className="label-mono text-copper-600">For electricians</p>
          <h2 id="careers-title" className="mt-3 text-[2rem] leading-[1.02] text-night-900 sm:mt-4 sm:text-[2.6rem]">
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
