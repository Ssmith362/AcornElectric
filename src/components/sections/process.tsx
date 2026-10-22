import { SectionHead } from "@/components/ui/section-head";

/**
 * "How we work": one four-step sequence. This replaced the separate "How we
 * work" principles list and "How it works" steps on the homepage, which said
 * much the same thing twice. Every line traces back to that original copy;
 * nothing new is claimed.
 */
const steps = [
  {
    title: "Tell us what's going on",
    body: "Call, or send the form with a few details and photos.",
  },
  {
    title: "Get a straight answer",
    body: "We explain what it needs and what your options are, before any work starts.",
  },
  {
    title: "Done properly",
    body: "The right wire, breaker and fitting, even where nobody will see it. Permitted and inspected when the job needs it, and sealed against Spokane weather.",
  },
  {
    title: "One less thing to worry about",
    body: "We walk you through it, clean up, and leave you with something that just works.",
  },
];

/**
 * The four-step process. `full` on the homepage; `compact` on service pages,
 * where the same steps repeat on every page and shouldn't dominate the scroll.
 * Same four steps and wording either way.
 */
export function Process({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <section className="border-y border-ink/10 bg-grid-mist py-12 sm:py-14" aria-labelledby="process-title">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 id="process-title" className="text-2xl leading-tight sm:text-3xl">
              How we work
            </h2>
            <p className="mt-3 text-ink-soft">The same four steps on every job.</p>
          </div>
          <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-9">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-7 w-7 items-center justify-center border-2 font-sans text-sm font-bold ${
                    i === steps.length - 1 ? "border-volt-500 bg-volt-400 text-night-950" : "border-copper-500 text-copper-700"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-sans text-lg leading-snug font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-grid-mist py-14 sm:py-20 lg:py-28" aria-labelledby="process-title">
      <div className="container-x grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHead
          className="lg:col-span-5"
          label="How we work"
          title={<span id="process-title">We&apos;d rather do it once.</span>}
          intro="The same four steps on every job, big or small."
        />
        {/* A job sheet that ticks itself off as it scrolls into view (CSS in
            globals.css, "CHECKLIST"). Without JS or with reduced motion it
            simply shows every step done. */}
        <div className="checklist border border-ink/15 bg-white lg:col-span-7" data-reveal>
          <div className="flex items-center justify-between gap-4 border-b border-ink/15 px-5 py-3.5 sm:px-7">
            <p className="label-mono text-copper-700">Every job</p>
            <p className="label-mono text-ink-mute">
              <span className="checklist-count" aria-hidden="true" />
              <span className="sr-only">Four steps</span>
            </p>
          </div>
          <div aria-hidden="true" className="h-1 bg-ink/8">
            <div className="checklist-bar h-full origin-left bg-volt-400" />
          </div>
          <ol className="divide-y divide-ink/10">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="checklist-row grid grid-cols-[1.75rem_1fr] gap-4 px-5 py-5 sm:px-7 sm:py-6"
                style={{ ["--i" as string]: i }}
              >
                <span aria-hidden="true" className="checklist-box mt-0.5 flex h-7 w-7 items-center justify-center border-2">
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" pathLength={1} />
                  </svg>
                </span>
                <div>
                  <h3 className="font-sans text-lg leading-snug font-bold sm:text-xl">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
