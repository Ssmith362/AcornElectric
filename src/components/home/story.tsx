import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { publishedServices as services } from "@/content/services";

/**
 * The customer's problems, in their words, each wired to
 * the page that solves it. Opens with the EV story from the brief.
 */
export function Story() {
  const picks = ["ev-charger-installation", "electrical-panel-upgrades", "hot-tub-wiring", "recessed-lighting", "electrical-repair", "electrical-inspections"]
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s) => !!s);

  return (
    <section className="bg-mist-50 py-7 xl:py-28" aria-labelledby="story-title">
      <div className="container-x grid gap-4 xl:grid-cols-12 xl:gap-14">
        <div className="xl:col-span-5">
          <div className="xl:sticky xl:top-32" data-reveal>
            <h2 id="story-title" className="text-[1.85rem] leading-[1.02] font-bold sm:text-5xl sm:leading-[1.02] xl:text-[3.4rem]">
              Still charging the Tesla at Fred Meyer?
            </h2>
            <p className="mt-2 text-sm leading-snug text-ink-soft xl:hidden">
              That&apos;s the kind of problem we solve.
            </p>
            <div className="hidden mt-4 space-y-3 text-[1.05rem] leading-relaxed text-ink-soft sm:mt-6 sm:space-y-4 sm:text-lg xl:block">
              <p>
                You bought an electric car so you&apos;d never stop for fuel again. Now you&apos;re sitting in a grocery
                store parking lot twice a week, wondering if your panel can even handle a home charger.
              </p>
              <p>
                That&apos;s the kind of problem we solve. Not just the wiring, but the questions around it: what you
                actually need, what it involves, and how to get it done right the first time.
              </p>
            </div>
            <div className="xl:hidden">
              <Accordion
                headingLevel={3}
                collapse="always"
                items={[
                  {
                    title: "Read the full story",
                    body: (
                      <div className="space-y-3 text-sm leading-relaxed">
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
                          className="group inline-flex min-h-11 items-center gap-3 border-b-2 border-volt-500 pb-1 font-semibold"
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
        </div>

        <ol className="hidden border-t border-ink/15 xl:col-span-7 xl:block">
          {picks.map((s) => (
            <li key={s.slug} className="border-b border-ink/15" data-reveal>
              <Link href={`/services/${s.slug}`} className="group grid grid-cols-[1.5rem_1fr_auto] items-start gap-3 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-4 sm:py-8">
                <span aria-hidden="true" className="mt-3.5 h-px w-4 bg-copper-500 sm:mt-4 sm:w-6" />
                <span>
                  <span className="block font-sans text-[1.2rem] leading-snug font-semibold tracking-[0.01em] sm:text-[1.9rem] sm:leading-tight">
                    {s.problem}
                  </span>
                  <span className="label-mono mt-2 block text-[0.65rem] text-ink-mute sm:mt-3 transition-colors group-hover:text-copper-700">
                    → {s.short}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 items-center justify-center border sm:mt-1 sm:h-10 sm:w-10 border-ink/15 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-volt-400"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
