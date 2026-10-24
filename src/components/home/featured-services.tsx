import Link from "next/link";
import { publishedServices as services } from "@/content/services";
import { ServiceDeck } from "./service-deck";

/** A short introduction leads directly into the swipeable service cards. */
export function FeaturedServices() {
  const top = services.slice(0, 6);
  return (
    <section className="bg-mist-50 py-12 sm:py-16 lg:py-24" aria-labelledby="story-title">
      <div className="container-x">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <header className="lg:col-span-7" data-reveal>
            <p className="label-mono flex items-center gap-3 text-copper-700">
              <span aria-hidden="true" className="h-px w-8 bg-copper-500/60" />
              What we do most
            </p>
            <h2 id="story-title" className="mt-3 text-[1.85rem] leading-[1.02] font-bold sm:mt-4 sm:text-5xl lg:text-[3.4rem]">
              Still charging the Tesla at Fred Meyer?
            </h2>
          </header>
          <div className="lg:col-span-5" data-reveal>
            <p className="text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">
              Your driveway could do that. We install EV chargers, upgrade panels, and tackle the electrical fixes you&apos;ve been putting off.
            </p>
          </div>
        </div>

        <ServiceDeck
          titleAs="h3"
          items={top.map((s) => ({ slug: s.slug, name: s.name, short: s.short, problem: s.problem, lede: s.lede, image: s.image }))}
        />

        <Link
          href="/services"
          className="mt-5 flex min-h-12 items-center justify-center gap-2 border border-ink/25 px-4 font-semibold text-ink hover:border-ink hover:bg-ink hover:text-volt-400 sm:ml-auto sm:w-fit"
        >
          Explore our services <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
