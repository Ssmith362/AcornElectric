import { Mascot } from "@/components/ui/logo";
import { SectionHead } from "@/components/ui/section-head";

/**
 * Why Acorn: the brand's non-negotiables, as the customer experiences them.
 * No superlatives, no statistics.
 */
const principles = [
  {
    title: "No corners cut",
    body: "The right wire size, the right breaker, the right fitting, even where nobody will ever see it. That's where the problems start when it's done cheaply.",
  },
  {
    title: "Permits and inspections, handled",
    body: "When a job needs a permit, we pull it and the work gets inspected. You get the paper trail your insurer and your next buyer will ask for.",
  },
  {
    title: "Built for Spokane weather",
    body: "Outdoor work is sealed, rated and protected for freeze-thaw winters and summer heat. Water is the slowest, most patient enemy of electrical work.",
  },
  {
    title: "You'll know what's happening",
    body: "What we found, what it needs, what your options are. Explained plainly before the work starts, and walked through when it's done.",
  },
  {
    title: "Your home treated like a home",
    body: "Floors protected, dust controlled, cleaned up after. Respect for your property, your time and your money.",
  },
];

export function Principles() {
  return (
    <section className="bg-mist-100 py-14 sm:py-20 lg:py-28" aria-labelledby="why-title">
      <div className="container-x grid gap-8 sm:gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            label="How we work"
            title={<span id="why-title">We&apos;d rather do it once.</span>}
            intro="Doing electrical work properly isn't the fastest or the cheapest way. It's the way that doesn't come back to bite you."
          />
          <div className="mt-12 hidden lg:block" data-reveal>
            <Mascot className="h-auto w-56 drop-shadow-[0_18px_30px_rgb(8_32_25/.18)] xl:w-64" />
          </div>
        </div>
        <ol className="lg:col-span-7">
          {principles.map((p) => (
            <li key={p.title} className="grid grid-cols-[1.5rem_1fr] gap-3 border-t border-ink/15 py-5 first:border-t-2 first:border-ink sm:grid-cols-[3rem_1fr] sm:gap-4 sm:py-7" data-reveal>
              <span aria-hidden="true" className="mt-3 h-px w-4 bg-copper-500 sm:w-8" />
              <div>
                <h3 className="text-xl leading-tight font-bold sm:text-2xl">{p.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
