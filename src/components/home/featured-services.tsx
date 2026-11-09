import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import { publishedServices as services } from "@/content/services";
import { ServiceDeck } from "./service-deck";

/**
 * The Tesla-at-Fred-Meyer introduction (Option 4's three-column intro), then
 * "What we do most" as the side-scrolling service rail.
 */
export function FeaturedServices() {
  const top = services.slice(0, 6);
  return (
    <>
      <section className="bg-mist-100 py-16 sm:py-24 lg:py-32" aria-labelledby="story-title">
        <div className="container-x grid gap-6 sm:gap-8 lg:grid-cols-[0.65fr_1.15fr_0.95fr] lg:items-center lg:gap-[clamp(1.75rem,5vw,4.75rem)]">
          <div className="flex items-center gap-4 lg:self-start lg:pt-2.5" data-reveal>
            <p className="label-mono text-copper-600">A familiar question</p>
            <span aria-hidden="true" className="h-px flex-1 bg-[#c5bba8]" />
          </div>
          <div data-reveal>
            <h2 id="story-title" className="max-w-[12ch] text-[2.75rem] leading-[0.99] text-night-900 sm:text-[3.75rem] lg:max-w-[10ch] lg:text-[clamp(2.7rem,5.2vw,4.75rem)]">
              Still charging the Tesla at Fred Meyer?
            </h2>
            <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-[1.7] text-ink-soft">
              Your driveway could do that. We install EV chargers, upgrade panels, and tackle the electrical fixes you&apos;ve been putting off.
            </p>
            <Link
              href="/services/ev-charger-installation"
              className="group mt-5 inline-flex min-h-11 items-center gap-3.5 text-[0.8rem] font-semibold text-copper-600 hover:text-night-900"
            >
              EV charger installation <span aria-hidden="true" className="text-base">↗</span>
            </Link>
          </div>
          <figure className="relative" data-reveal>
            <Photo id="ev" ticks={false} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/3]! lg:aspect-[5/6]!" />
            <figcaption className="absolute bottom-0 left-0 bg-night-900 px-3.5 py-2.5 text-[0.7rem] text-mist-100">
              EV charger installation
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-mist-50 py-16 sm:py-24 lg:py-28" aria-labelledby="services-title">
        <div className="container-x">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10" data-reveal>
            <div>
              <p className="label-mono text-copper-600">Acorn Electric</p>
              <h2 id="services-title" className="mt-2 text-[2.6rem] leading-[0.99] text-night-900 sm:text-[3.4rem] lg:text-[clamp(2.4rem,5vw,4.4rem)]">
                What we do most
              </h2>
            </div>
            <p className="max-w-[36ch] text-[0.9rem] leading-relaxed text-ink-mute">
              These are a few common requests. Have another project for your home or business?{" "}
              <Link href="/contact" className="font-semibold text-copper-600 underline underline-offset-4 hover:text-night-900">
                Let&apos;s talk.
              </Link>
            </p>
          </div>

          <ServiceDeck
            items={top.map((s) => ({ slug: s.slug, name: s.name, short: s.short, problem: s.problem, lede: s.lede, image: s.image }))}
          />

          <Link
            href="/services"
            className="group mt-6 flex min-h-12 items-center justify-between gap-6 bg-night-900 px-5 text-[0.85rem] font-semibold text-mist-100 transition-colors hover:bg-volt-500 hover:text-night-950 sm:ml-auto sm:w-fit"
          >
            Explore all our services <span aria-hidden="true" className="text-base">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
