import Link from "next/link";
import { AreaMap } from "@/components/sections/area-map";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonAnchor, ButtonLink, PhoneGlyph } from "@/components/ui/button";
import { communities } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";
import { site, tel } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Electrician Service Areas: Spokane & Nearby | Acorn Electric",
  description:
    "Electrical services for homes and businesses in Spokane, Spokane Valley, Liberty Lake, Mead and nearby communities. Ask Acorn Electric about your location.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <section className="on-night bg-grid-night text-white">
        <div className="container-x pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pb-16">
          <Breadcrumbs trail={[{ name: "Service areas", path: "/areas" }]} />
          <div className="mt-6 grid items-center gap-8 sm:mt-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="label-mono text-volt-400">Close to home. Ready to help.</p>
              <h1 className="mt-3 max-w-2xl text-[2.2rem] leading-[1.04] sm:mt-4 sm:text-5xl lg:text-6xl">
                Electrical services in Spokane and nearby.
              </h1>
              <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-mist-200 sm:mt-5 sm:text-lg">
                We help homes and businesses across the Spokane area with electrical repairs, upgrades and new
                projects. Wherever you call home or get to work, tell us what you need.
              </p>
            </div>
            <div className="hidden lg:col-span-6 lg:block">
              <AreaMap />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-9 sm:py-12 lg:py-14" aria-labelledby="communities-title">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h2 id="communities-title" className="text-3xl leading-tight sm:text-4xl">Where we work</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">Spokane and the surrounding communities we serve.</p>
            </div>
            <Link href="/services" className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-copper-700 underline underline-offset-4 hover:text-ink">
              Explore our services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-px border border-ink/15 bg-ink/15 sm:mt-6 sm:grid-cols-3 lg:grid-cols-4" aria-label="Communities we serve">
            {communities.map((c) => {
              const href = c.page ? `/areas/${c.page}` : c.name === "Spokane" ? "/" : null;
              const cls = "flex h-full min-h-16 items-center justify-between gap-2 px-4 py-4 text-[0.95rem] leading-snug font-semibold sm:px-5 sm:text-base";
              return (
                <li key={c.name} id={c.name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-28 bg-mist-50">
                  {href ? (
                    <Link href={href} className={`${cls} group underline decoration-ink/25 underline-offset-4 hover:bg-white hover:text-copper-700`}>
                      {c.name}<span aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  ) : (
                    <span className={cls}>{c.name}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="on-night border-t border-white/10 bg-night-900 py-9 text-white sm:py-12" aria-labelledby="coverage-title">
        <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 id="coverage-title" className="text-3xl leading-tight sm:text-4xl">Nearby but not listed?</h2>
            <p className="mt-3 leading-relaxed text-mist-200">
              Send us your address or ZIP code and a little about your project. We&apos;ll confirm whether we can help.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <ButtonLink href="/contact" arrow>Ask about your project</ButtonLink>
            <ButtonAnchor href={tel} variant="outline-night">
              <PhoneGlyph className="h-4 w-4 text-volt-400" /> Call {site.phone.value.display}
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
