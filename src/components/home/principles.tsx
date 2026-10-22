import { Mascot } from "@/components/ui/logo";
import { SectionHead } from "@/components/ui/section-head";
import { steps } from "@/components/sections/process";

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
    <section className="bg-mist-100 py-14 max-lg:py-10! sm:py-20 md:max-lg:py-12! lg:py-28" aria-labelledby="why-title">
      <div className="container-x grid gap-8 max-lg:gap-6! sm:gap-14 md:max-lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:max-lg:gap-10! lg:grid-cols-12">
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
        <ol className="max-lg:hidden lg:col-span-7">
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

        {/* Phones and tablets: "How we work" and "How it works" as one numbered
            sequence. The principles sit under the step they belong to, word for
            word. "You'll know what's happening" is left out here because steps 2
            and 4 already say the same thing. The separate "How it works" section
            is desktop-only (see app/page.tsx). */}
        <div className="lg:hidden">
          <p className="label-mono mb-4 flex items-center gap-3 text-copper-700">
            <span aria-hidden="true" className="h-px w-8 bg-copper-500/60" />
            How it works
          </p>
          <ol className="relative">
            <span aria-hidden="true" className="absolute top-3 bottom-6 left-[0.875rem] w-px bg-copper-500/35" />
            {steps.map((st, i) => {
              const sub = i === 2 ? [principles[0], principles[1], principles[2]] : i === 3 ? [principles[4]] : [];
              const last = i === steps.length - 1;
              return (
                <li key={st.title} className="relative grid grid-cols-[1.75rem_1fr] gap-3.5 pb-6 last:pb-0" data-reveal style={{ ["--reveal-i" as string]: i }}>
                  <span
                    aria-hidden="true"
                    className={`relative z-10 flex h-7 w-7 items-center justify-center border-2 font-sans text-sm font-bold ${
                      last ? "border-volt-500 bg-volt-400 text-night-950" : "border-copper-500 bg-mist-100 text-copper-700"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="font-sans text-lg leading-snug font-bold">
                      <span className="sr-only">Step {i + 1}: </span>
                      {st.title}
                    </h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{st.body}</p>
                    {sub.length ? (
                      <ul className="mt-3 space-y-2 border-l-2 border-copper-500/40 pl-3.5 text-[0.9rem] leading-relaxed text-ink-soft">
                        {sub.map((p) => (
                          <li key={p.title}>
                            <strong className="font-semibold text-ink">{p.title}.</strong> {p.body}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
