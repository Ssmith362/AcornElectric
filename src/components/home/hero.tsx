import { ButtonAnchor, ButtonLink, PhoneGlyph } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { site, tel } from "@/lib/site";

const ticket = [
  { k: "Load check", v: "Panel has room" },
  { k: "Permit", v: "Filed" },
  { k: "Install", v: "48A circuit, garage" },
  { k: "Inspection", v: "Passed" },
];

export function Hero() {
  return (
    <section className="on-night relative isolate overflow-hidden bg-grid-night text-white" aria-labelledby="hero-title">
      {/* soft filament light */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_78%_35%,rgb(210_244_85/.13),transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_90%,rgb(194_111_54/.16),transparent_70%)]" />
      {/* the trace that starts here and runs down the page edge */}
      <svg aria-hidden="true" className="absolute top-0 left-0 -z-10 hidden h-full w-24 xl:block" viewBox="0 0 96 800" preserveAspectRatio="none">
        <path d="M40 0v360l24 24v416" fill="none" stroke="rgb(255 255 255/.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M40 0v360l24 24v416" fill="none" stroke="var(--color-volt-400)" strokeWidth="1.5" className="flow" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="container-x grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="label-mono flex items-center gap-3 text-mist-300" data-reveal>
            <span className="h-2 w-2 animate-pulse-node rounded-full bg-volt-400" aria-hidden="true" />
            Residential electrician · Spokane, WA
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.85rem] leading-[0.95] font-bold tracking-[-0.04em] sm:text-7xl lg:text-[5.2rem] xl:text-[6rem]"
            data-reveal
          >
            Wired right.
            <br />
            <span className="text-lit">One less thing</span>
            <br />
            to worry about.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist-200 sm:text-xl" data-reveal>
            EV chargers, panel upgrades, hot tubs, lighting and the repairs nobody wants to think about. We explain
            what your home needs, do the work properly, and leave you with something that just works.
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
          {/* example job ticket: illustrates the process, not a real job */}
          <div className="relative -mt-14 ml-auto w-[88%] border border-white/15 bg-night-950/92 p-4 shadow-2xl shadow-black/60 backdrop-blur-md sm:-mt-20 sm:w-80 lg:absolute lg:-bottom-8 lg:-left-10 lg:mt-0 lg:ml-0">
            <p className="label-mono flex items-center justify-between text-[0.6rem] text-mist-400">
              <span>Example job · EV charger</span>
              <span className="text-volt-400">Done</span>
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
