import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ReviewFlag } from "@/components/ui/review-flag";
import { communities } from "@/content/areas";
import { mailto, site, tel } from "@/lib/site";
import { serviceNav } from "./nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-night relative overflow-hidden bg-night-950 pb-20 text-mist-300 md:pb-0">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt-400/50 to-transparent" />
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo size="lg" />
          <p className="mt-6 max-w-sm leading-relaxed">
            Residential electrical work for Spokane homeowners. Understand the problem, do it properly, leave you
            with one less thing to worry about.
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="label-mono text-[0.62rem] text-mist-400">Call</dt>
              <dd>
                <a href={tel} className="font-display text-2xl font-semibold text-white hover:text-volt-300">
                  {site.phone.value.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono text-[0.62rem] text-mist-400">Email</dt>
              <dd className="flex flex-wrap items-center gap-2">
                <a href={mailto} className="text-white underline-offset-4 hover:underline">
                  {site.email.value}
                </a>
                {!site.email.verified ? <ReviewFlag tone="dark">lead inbox</ReviewFlag> : null}
              </dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Services" className="lg:col-span-3">
          <p className="label-mono text-[0.65rem] text-mist-400">Services</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {serviceNav.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="hover:text-volt-300">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Areas and company" className="lg:col-span-2">
          <p className="label-mono text-[0.65rem] text-mist-400">Areas</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {communities.map((c) => (
              <li key={c.name}>
                <Link
                  href={c.page ? `/areas/${c.page}` : c.name === "Spokane" ? "/areas" : `/areas#${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-volt-300"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label-mono mt-10 text-[0.65rem] text-mist-400">Company</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            <li><Link href="/careers" className="hover:text-volt-300">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-volt-300">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-volt-300">Privacy</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="label-mono text-[0.65rem] text-mist-400">Licensing</p>
          <p className="mt-5 text-[0.95rem] text-white">Washington electrical contractor</p>
          <p className="label-mono mt-2 text-sm text-volt-300">Lic. {site.license.value}</p>
          <p className="mt-6 text-sm leading-relaxed text-mist-400">
            You can check any Washington electrical contractor&apos;s license on the{" "}
            <a
              href="https://secure.lni.wa.gov/verify/"
              className="text-mist-200 underline underline-offset-4 hover:text-volt-300"
              rel="noopener"
            >
              L&amp;I Verify a Contractor tool
            </a>
            .
          </p>
          {site.social.length ? (
            <ul className="mt-6 flex gap-4 text-sm">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener" className="hover:text-volt-300">{s.label}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-mist-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. WA Lic. {site.license.value}.
          </p>
          <p>Website by Flourish Now Digital</p>
        </div>
      </div>
    </footer>
  );
}
