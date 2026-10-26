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

  // Same layout as "Six steps, start to finish" on the Flourish Now Digital
  // services page: the heading column stays put (lg+) while the step cards
  // scroll up and stack over each other. Plain CSS (position: sticky), no JS;
  // every step is ordinary HTML, so reduced motion and no-JS see the same thing.
  return (
    <section className="on-night bg-night-950 py-14 text-white sm:py-20 lg:py-28" aria-labelledby="process-title">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <header className="self-start lg:sticky lg:top-32 lg:col-span-5">
          <p className="label-mono flex items-center gap-3 text-mist-300">
            <span aria-hidden="true" className="h-px w-8 bg-volt-400/60" />
            How we work
          </p>
          <h2 id="process-title" className="mt-3 text-[2.1rem] leading-[1.04] font-bold text-white sm:mt-5 sm:text-5xl lg:text-[3.6rem]">
            We&apos;d rather do it once.
          </h2>
          <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-mist-300 sm:text-lg">
            The same four steps on every job, big or small.
          </p>
          <div className="mt-8 hidden lg:block">
            <ButtonLink href="/contact" arrow>
              Request service
            </ButtonLink>
          </div>
        </header>

        <ol className="grid gap-5 lg:col-span-7">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="process-card border border-white/15 bg-night-800 p-6 shadow-[0_-14px_30px_-14px_rgb(0_0_0/.6)] sm:p-8"
              style={{ ["--i" as string]: i }}
            >
              <div className="flex items-baseline gap-4">
                <span aria-hidden="true" className="font-display text-4xl leading-none text-volt-400 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-xl leading-snug font-bold text-white sm:text-2xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
              </div>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-mist-300 sm:text-lg">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="lg:hidden">
          <ButtonLink href="/contact" arrow>
            Request service
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
