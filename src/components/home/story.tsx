import Link from "next/link";
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
    <section className="bg-mist-50 py-20 lg:py-28" aria-labelledby="story-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32" data-reveal>
            <h2 id="story-title" className="text-4xl leading-[1.02] font-bold sm:text-5xl lg:text-[3.4rem]">
              Still charging the Tesla at Fred Meyer?
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                You bought an electric car so you&apos;d never stop for fuel again. Now you&apos;re sitting in a grocery
                store parking lot twice a week, wondering if your panel can even handle a home charger.
              </p>
              <p>
                That&apos;s the kind of problem we solve. Not just the wiring, but the questions around it: what you
                actually need, what it involves, and how to get it done right the first time.
              </p>
            </div>
            <Link
              href="/services/ev-charger-installation"
              className="group mt-8 inline-flex items-center gap-3 border-b-2 border-volt-500 pb-1 font-semibold"
            >
              How a home charger install works
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <ol className="border-t border-ink/15 lg:col-span-7">
          {picks.map((s, i) => (
            <li key={s.slug} className="border-b border-ink/15" data-reveal>
              <Link href={`/services/${s.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-7 sm:py-8">
                <span className="label-mono pt-2 text-copper-600">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-sans text-2xl leading-tight font-semibold tracking-[0.01em] sm:text-[1.9rem]">
                    {s.problem}
                  </span>
                  <span className="label-mono mt-3 block text-[0.65rem] text-ink-mute transition-colors group-hover:text-copper-700">
                    → {s.short}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-10 w-10 items-center justify-center border border-ink/15 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-volt-400"
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
