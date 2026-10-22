import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { publishedServices as services } from "@/content/services";
import { ServiceDeck } from "./service-deck";

/**
 * "What we do most": the EV story from the brief opens the section, and the
 * six most-asked-for services (site order) follow as a side-scrolling rail on
 * the same surface. This replaced a separate story section with its own list
 * of six problems: each service's problem, in the customer's words, now lives
 * on its card, so nothing is said twice.
 */
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
            <p className="text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">That&apos;s the kind of problem we solve.</p>
            <Accordion
              className="mt-2"
              headingLevel={3}
              collapse="always"
              items={[
                {
                  title: "Read the full story",
                  body: (
                    <div className="space-y-3">
                      <p>
                        You bought an electric car so you&apos;d never stop for fuel again. Now you&apos;re sitting in a grocery
                        store parking lot twice a week, wondering if your panel can even handle a home charger.
                      </p>
                      <p>
                        That&apos;s the kind of problem we solve. Not just the wiring, but the questions around it: what you
                        actually need, what it involves, and how to get it done right the first time.
                      </p>
                      <Link
                        href="/services/ev-charger-installation"
                        className="group inline-flex min-h-11 items-center gap-3 border-b-2 border-volt-500 pb-1 font-semibold text-ink"
                      >
                        How a home charger install works
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-9 flex items-center justify-between gap-4 sm:mt-12 lg:mt-16">
          <h3 className="font-sans text-xl leading-snug font-bold sm:text-2xl">The jobs Spokane homes ask for most</h3>
          <Link
            href="/services"
            className="hidden min-h-11 shrink-0 items-center gap-2 font-semibold text-copper-700 hover:text-ink sm:inline-flex"
          >
            See all {services.length} services <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ServiceDeck
          titleAs="h4"
          items={top.map((s) => ({ slug: s.slug, name: s.name, short: s.short, problem: s.problem, lede: s.lede, image: s.image }))}
        />

        <Link
          href="/services"
          className="mt-5 flex min-h-12 items-center justify-center gap-2 border border-ink/25 px-4 font-semibold text-ink hover:border-ink hover:bg-ink hover:text-volt-400 sm:hidden"
        >
          See all {services.length} services <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
