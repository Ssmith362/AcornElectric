import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { communities } from "@/content/areas";
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
    <section className="on-night bg-night-900 py-14 text-mist-100 sm:py-20 lg:py-24" aria-labelledby="careers-title">
      <div className="container-x grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="relative lg:col-span-7" data-reveal>
          <Photo id="exterior" sizes="(min-width: 1024px) 58vw, 100vw" ticks={false} className="aspect-[4/3]! sm:aspect-[16/10]! lg:aspect-[4/3]!" />
          <span className="label-mono absolute bottom-0 left-0 bg-volt-500 px-3 py-2 text-[0.62rem] text-night-950">Acorn job</span>
        </div>
        <div className="lg:col-span-5" data-reveal>
          <p className="label-mono flex items-center gap-3 text-volt-400">
            <span aria-hidden="true" className="h-px w-8 bg-volt-400/60" />
            Careers
          </p>
          <h2 id="careers-title" className="mt-4 text-[2.1rem] leading-[1.02] text-white sm:text-[2.8rem]">
            Experienced residential electrician? We&apos;re hiring.
          </h2>
          <p className="mt-4 max-w-[44ch] text-mist-200">
            We want someone who can run their own jobs, and we&apos;ll back them with the right gear.
          </p>
          <ul className="mt-6 border-t border-white/15">
            {["New vans", "Fully stocked tools", "A team book club"].map((perk) => (
              <li key={perk} className="flex items-center gap-3 border-b border-white/15 py-3 text-[0.98rem]">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-volt-500" />
                {perk}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <ButtonLink href="/careers" arrow>
              See careers
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
