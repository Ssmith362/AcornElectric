import { ButtonAnchor, ButtonLink, PhoneGlyph } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { site, tel } from "@/lib/site";

const ticket = [
  { k: "Look & explain", v: "Before any quote" },
  { k: "Permit", v: "Pulled by us" },
  { k: "The work", v: "To code, cleaned up" },
  { k: "Inspection", v: "Signed off" },
];

export function Hero() {
  return (
    <section className="on-night relative isolate overflow-hidden bg-grid-night text-white" aria-labelledby="hero-title">
      {/* soft filament light */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_78%_35%,rgb(255_239_31/.13),transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_90%,rgb(224_102_29/.16),transparent_70%)]" />
      {/* the trace that starts here and runs down the page edge */}
      <svg aria-hidden="true" className="absolute top-0 left-0 -z-10 h-full w-4 sm:w-6 lg:w-14 xl:w-24" viewBox="0 0 96 800" preserveAspectRatio="none">
        <path d="M40 0v360l24 24v416" fill="none" stroke="rgb(255 255 255/.22)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <path d="M40 0v360l24 24v416" fill="none" stroke="var(--color-volt-400)" strokeWidth="2.25" strokeDasharray="16 184" className="flow drop-shadow-[0_0_4px_var(--color-volt-400)]" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="container-x grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="label-mono flex items-center gap-3 text-mist-300" data-reveal>
            <span className="h-2 w-2 animate-pulse-node rounded-full bg-volt-400" aria-hidden="true" />
            Residential electrician · Spokane, WA
          </p>
          <h1
            id="hero-title"
            className="mt-6 max-w-2xl text-[2.5rem] leading-[1.04] tracking-[0.01em] sm:text-6xl lg:text-[3.9rem] xl:text-[4.4rem]"
            data-reveal
          >
            Electrical work that makes your home <span className="text-lit">work better.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist-200 sm:text-xl" data-reveal>
            Help for the upgrades, repairs, and electrical projects that make everyday life at home safer and easier.
            Acorn Electric helps you understand what your home needs, explains your options, and gets the work done
            properly.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal>
            <ButtonLink href="/contact" arrow>
              Request service
            </ButtonLink>
            <ButtonAnchor href={tel} variant="outline-night">
              <PhoneGlyph className="h-4 w-4 text-volt-400" />
              Call {site.phone.value.display}
            </ButtonAnchor>
          </div>
          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-white/10 pt-6 text-sm text-mist-300 sm:grid-cols-3" data-reveal>
            {["Permits and inspections handled", "Explained before we start", "WA licensed contractor"].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <svg viewBox="0 0 12 12" className="mt-1 h-3 w-3 shrink-0 text-volt-400" aria-hidden="true">
                  <path d="M1 6.5l3 3 7-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6" data-reveal>
          <Photo id="home-hero" label="top" priority sizes="(min-width: 1024px) 48vw, 100vw" className="border border-white/10" />
          {/* the process every job follows; not a claim about a specific job */}
          <div className="relative -mt-14 ml-auto w-[88%] border border-white/15 bg-night-950/92 p-4 shadow-2xl shadow-black/60 backdrop-blur-md sm:-mt-20 sm:w-80 lg:absolute lg:-bottom-8 lg:-left-10 lg:mt-0 lg:ml-0">
            <p className="label-mono flex items-center justify-between text-[0.6rem] text-mist-400">
              <span>How every job runs</span>
              <span className="text-volt-400">Done right</span>
            </p>
            <ul className="mt-3 space-y-2">
              {ticket.map((t) => (
                <li key={t.k} className="flex items-center justify-between gap-4 border-t border-white/8 pt-2 text-sm">
                  <span className="flex items-center gap-2.5 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-volt-400 shadow-[0_0_6px_var(--color-volt-400)]" aria-hidden="true" />
                    {t.k}
                  </span>
                  <span className="text-mist-400">{t.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
