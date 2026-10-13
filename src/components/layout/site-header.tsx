import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ButtonLink, PhoneGlyph } from "@/components/ui/button";
import { ReviewFlag } from "@/components/ui/review-flag";
import { site, tel } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { primaryNav, serviceNav } from "./nav";

export function SiteHeader() {
  return (
    <header className="on-night sticky top-0 z-50 border-b border-white/10 bg-night-950">
      {/* License strip: WA requires the contractor license on advertising. */}
      <div className="hidden border-b border-white/5 md:block">
        <div className="container-x flex h-8 items-center justify-between gap-4 text-mist-300">
          <p className="label-mono hidden text-[0.62rem] whitespace-nowrap lg:block">
            Residential electrical · Spokane, WA
          </p>
          <p className="label-mono ml-auto flex items-center gap-3 text-[0.62rem] whitespace-nowrap">
            <span>WA Electrical Contractor Lic. {site.license.value}</span>
            {!site.license.verified ? <ReviewFlag tone="dark">license # on L&I</ReviewFlag> : null}
          </p>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" className="shrink-0" aria-label={`${site.name}, home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex h-10 items-center gap-1.5 px-3.5 text-[0.95rem] font-medium text-mist-100 transition-colors hover:text-volt-300"
                  >
                    {item.label}
                    <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 opacity-60" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </Link>
                  {/* Opens on hover and on keyboard focus (focus-within), no JS. */}
                  <div className="invisible absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="border border-white/10 bg-night-900 p-2 shadow-2xl shadow-black/50">
                      <p className="label-mono px-3 pt-2 pb-3 text-[0.62rem] text-mist-400">Panel schedule · residential</p>
                      <ul className="grid grid-cols-2 gap-px bg-white/5">
                        {serviceNav.map((s) => (
                          <li key={s.href} className="bg-night-900">
                            <Link
                              href={s.href}
                              className="group/item flex items-center gap-3 px-3 py-2.5 text-sm text-mist-100 hover:bg-night-800"
                            >
                              <span className="label-mono text-[0.62rem] text-copper-400">{s.pos}</span>
                              <span className="flex-1">{s.label}</span>
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-night-600 transition-colors group-hover/item:bg-volt-400 group-hover/item:shadow-[0_0_8px_var(--color-volt-400)]"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-10 items-center px-3.5 text-[0.95rem] font-medium text-mist-100 transition-colors hover:text-volt-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={tel}
            className="flex h-11 items-center gap-2 px-2 text-[0.95rem] font-semibold text-white hover:text-volt-300 sm:px-3"
          >
            <PhoneGlyph className="h-5 w-5 text-volt-400" />
            <span className="sr-only sm:not-sr-only">{site.phone.value.display}</span>
          </a>
          <span className="hidden md:block">
            <ButtonLink href="/contact" className="min-h-11 py-2.5">
              Request service
            </ButtonLink>
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
