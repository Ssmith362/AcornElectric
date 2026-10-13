import { SectionHead } from "@/components/ui/section-head";

const steps = [
  {
    title: "Tell us what's going on",
    body: "Call, or send the form with a few details and photos. The more we know up front, the more useful the first conversation is.",
  },
  {
    title: "Get a straight explanation",
    body: "We look at the situation and explain what it needs, what your options are and why, before any work starts.",
  },
  {
    title: "The work, done properly",
    body: "Permitted when the job requires it, installed to code, protected from the weather, and inspected.",
  },
  {
    title: "One less thing to worry about",
    body: "We walk you through what we did, clean up, and leave you with something that just works.",
  },
];

export function Process({ index = "04" }: { index?: string }) {
  return (
    <section className="bg-grid-mist py-20 lg:py-28" aria-labelledby="process-title">
      <div className="container-x">
        <SectionHead
          index={index}
          label="How it works"
          title={<span id="process-title">From “something&apos;s wrong” to done, in four steps.</span>}
        />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* the trace that connects the steps */}
          <span aria-hidden="true" className="absolute top-[0.6rem] right-0 left-0 hidden h-px bg-gradient-to-r from-copper-500/70 via-copper-500/40 to-volt-500 md:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative" data-reveal style={{ ["--reveal-i" as string]: i }}>
              <span
                aria-hidden="true"
                className={`relative z-10 block h-5 w-5 border-2 ${i === steps.length - 1 ? "animate-pulse-node border-volt-500 bg-volt-400" : "border-copper-500 bg-mist-50"}`}
              />
              <p className="label-mono mt-6 text-copper-700">Step {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl leading-tight font-bold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
