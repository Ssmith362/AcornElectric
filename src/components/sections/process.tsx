import { ButtonLink } from "@/components/ui/button";

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
    title: "Cleaned up and explained",
    body: "We walk you through the finished work, clean up and make sure everything works.",
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

  // Option 4 layout: the title column on the left, the four steps as a ruled
  // list on the right. Plain HTML, nothing depends on JS or motion.
  return (
    <section className="surface-paper-deep border-t border-line py-12 sm:py-16 lg:py-20" aria-labelledby="process-title">
      <div className="container-x grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[clamp(2rem,5vw,4.5rem)]">
        <header data-reveal>
          <p className="label-mono text-copper-600">How we work</p>
          <h2 id="process-title" className="mt-3 max-w-[9ch] text-[3rem] leading-[0.99] text-night-900 sm:text-[4rem] lg:text-[clamp(3rem,6vw,5.1rem)]">
            We&apos;d rather do it once.
          </h2>
          <p className="mt-3 text-[0.95rem] text-ink-mute">The same four steps on every job, big or small.</p>
          <div className="mt-7">
            <ButtonLink href="/contact" arrow>
              Request service
            </ButtonLink>
          </div>
        </header>

        <ol className="border-t border-line" data-reveal>
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.6rem_1fr] gap-3.5 border-b border-line py-5 sm:py-6">
              <span aria-hidden="true" className="pt-1.5 text-[0.7rem] font-medium tracking-[0.08em] text-copper-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.55rem] leading-tight text-night-900">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-1 max-w-[52ch] text-[0.85rem] leading-relaxed text-ink-mute">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
