import Image from "next/image";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { images } from "@/content/images";
import { site, tel } from "@/lib/site";

const ticket = [
  { k: "Look & explain", v: "Before any quote" },
  { k: "Permit", v: "Pulled by us" },
  { k: "The work", v: "To code, cleaned up" },
  { k: "Inspection", v: "Signed off" },
];

/**
 * Option 4 hero: the real Acorn truck, full bleed, with the copy on a forest
 * shade on the left (bottom on phones so the truck stays visible above it).
 */
export function Hero() {
  const truck = images.truck;
  return (
    <>
      <section
        className="on-night relative isolate flex flex-col overflow-hidden bg-night-950 text-white md:min-h-[clamp(42rem,57vw,52rem)] md:flex-row md:items-end"
        aria-labelledby="hero-title"
      >
        {/* Phones and tablets: the truck sits above the copy so it's never hidden. Desktop: full bleed behind it. */}
        <div className="relative aspect-[16/10] w-full md:absolute md:inset-0 md:-z-20 md:aspect-auto">
          <Image
            src={truck.src}
            alt={truck.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_55%] saturate-[.9] md:object-[54%_57%]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(transparent,var(--color-night-950))] md:hidden" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden md:block md:bg-[linear-gradient(90deg,rgb(8_26_18/.86)_0%,rgb(8_26_18/.68)_33%,rgb(8_26_18/.16)_72%,rgb(8_26_18/.1)_100%),linear-gradient(0deg,rgb(8_26_18/.5),transparent_38%)]"
        />

        <div className="container-x relative -mt-6 pb-10 sm:-mt-10 sm:pb-14 md:mt-0 md:pt-28 md:pb-24">
          <div className="max-w-[38rem]">
            <p className="label-mono text-volt-300" data-reveal>
              Electrician · Spokane, WA
            </p>
            <h1
              id="hero-title"
              className="mt-4 text-[4rem] leading-[0.84] font-semibold tracking-[-0.045em] sm:mt-5 sm:text-[6rem] md:text-[clamp(5rem,9vw,8.75rem)]"
              data-reveal
            >
              Powering
              <br />
              <span className="text-volt-400">Spokane.</span>
            </h1>
            <p className="mt-5 max-w-[27ch] font-display text-[1.4rem] leading-[1.13] font-semibold sm:mt-6 sm:text-[1.75rem] md:text-[1.9rem]" data-reveal>
              Taking care of the people behind every project.
            </p>
            <p className="mt-3 max-w-[48ch] text-[0.95rem] leading-[1.72] text-white/85 sm:mt-4" data-reveal>
              Electrical repairs, upgrades, and installations for Spokane homes and businesses. Tell us what you&apos;re
              working on. We&apos;ll explain your options and get it done right.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-reveal>
              <ButtonLink href="/contact" arrow className="justify-between sm:justify-center">
                Request service
              </ButtonLink>
              <ButtonAnchor href={tel} variant="outline-night">
                Call {site.phone.value.display}
              </ButtonAnchor>
            </div>
            <p className="mt-6 flex flex-wrap gap-x-3.5 gap-y-1 text-[0.72rem] text-white/70" data-reveal>
              <span>Washington electrical contractor</span>
              <span className="font-medium text-white">WA Electrical Contractor Lic. {site.license.value}</span>
            </p>
          </div>
        </div>

        <p aria-hidden="true" className="label-mono absolute right-10 bottom-7 hidden gap-5 text-[0.66rem] tracking-[0.07em] text-white lg:flex">
          <span>Acorn Electric</span>
          <span>Spokane, Washington</span>
        </p>
      </section>

      {/* The process every job follows; a promise about the process, not a specific job. */}
      <section className="on-night surface-forest text-mist-100" aria-labelledby="ticket-title">
        <div className="container-x grid gap-5 py-6 lg:grid-cols-[minmax(11rem,0.55fr)_minmax(0,1.45fr)] lg:items-center lg:gap-9 lg:py-7">
          <div>
            <p className="label-mono text-volt-400">How every job runs</p>
            <h2 id="ticket-title" className="mt-1 text-[2.1rem] leading-none font-semibold">
              Done right.
            </h2>
          </div>
          <ol className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
            {ticket.map((t, i) => (
              <li key={t.k} className="flex flex-col gap-1 border-l border-volt-500 pl-3.5">
                <span className="text-[0.7rem] font-medium tracking-[0.08em] text-volt-400" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[1.06rem] leading-tight font-semibold">{t.k}</span>
                <span className="text-[0.72rem] text-mist-100/75">{t.v}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
