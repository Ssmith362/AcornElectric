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
      <div className="container-x">
        <SectionHead
          label="How we work"
          title={<span id="process-title">We&apos;d rather do it once.</span>}
        />
        <ol className="relative mt-10 grid gap-7 sm:mt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-4 lg:gap-6">
          {/* the trace that connects the steps (one row of four, desktop only) */}
          <span aria-hidden="true" className="absolute top-[0.6rem] right-0 left-0 hidden h-px bg-gradient-to-r from-copper-500/70 via-copper-500/40 to-volt-500 lg:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[2rem_1fr] gap-3 lg:block" data-reveal style={{ ["--reveal-i" as string]: i }}>
              <span
                aria-hidden="true"
                className={`relative z-10 mt-1 block h-5 w-5 border-2 lg:mt-0 ${i === steps.length - 1 ? "animate-pulse-node border-volt-500 bg-volt-400" : "border-copper-500 bg-mist-50"}`}
              />
              <div>
                <p className="label-mono text-copper-700 lg:mt-6">Step {i + 1}</p>
                <h3 className="mt-2 text-xl leading-tight font-bold sm:text-2xl lg:mt-3">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft lg:mt-3">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
