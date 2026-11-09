import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Arrow, PhoneGlyph } from "@/components/ui/button";
import { site, tel } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { primaryNav, serviceNav } from "./nav";

/** Light paper header from the Option 4 design. Sticky, with a thin license strip on md+. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-mist-50/95 backdrop-blur-md">
      {/* License strip: WA requires the contractor license on advertising. */}
      <div className="hidden bg-night-950 text-mist-300 md:block">
        <div className="container-x flex h-8 items-center justify-between gap-4">
          <p className="label-mono hidden text-[0.62rem] whitespace-nowrap lg:block">Electrician · Spokane, WA</p>
          <p className="label-mono ml-auto text-[0.62rem] whitespace-nowrap">
            WA Electrical Contractor Lic. {site.license.value}
          </p>
        </div>
      </div>

      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-[5.5rem]">
        <Link href="/" className="shrink-0" aria-label={`${site.name}, home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex h-10 items-center gap-1.5 px-3.5 text-[0.9rem] font-medium text-ink transition-colors hover:text-copper-600"
                  >
                    {item.label}
                    <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 opacity-60" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </Link>
                  {/* Opens on hover and on keyboard focus (focus-within), no JS. */}
                  <div className="invisible absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="border border-line bg-mist-50 p-2 shadow-[0_18px_46px_rgb(24_42_31/.12)]">
                      <p className="label-mono px-3 pt-2 pb-3 text-[0.62rem] text-copper-600">Electrical services</p>
                      <ul className="grid grid-cols-2 border-t border-line">
                        {serviceNav.map((s) => (
                          <li key={s.href} className="border-b border-line">
                            <Link
                              href={s.href}
                              className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm text-ink hover:bg-mist-100 hover:text-copper-600"
                            >
                              {s.label}
                              <span aria-hidden="true" className="text-copper-600">↗</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="block px-3 py-3 text-sm text-ink-soft underline underline-offset-4 hover:text-copper-600">
                        Have a different project? Let&apos;s talk.
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex h-10 items-center px-3.5 text-[0.9rem] font-medium text-ink transition-colors hover:text-copper-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a href={tel} className="flex h-11 items-center gap-2 px-2 text-[0.9rem] font-medium text-ink hover:text-copper-600">
            <PhoneGlyph className="h-5 w-5 text-copper-600 sm:hidden" />
            <span className="sr-only sm:not-sr-only">{site.phone.value.display}</span>
          </a>
          <Link
            href="/contact"
            className="group hidden min-h-12 items-center gap-6 bg-night-900 px-5 text-[0.85rem] font-semibold text-mist-100 transition-colors hover:bg-volt-500 hover:text-night-950 md:inline-flex"
          >
            Request service
            <Arrow />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
