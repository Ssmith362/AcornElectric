import Link from "next/link";
import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PhoneGlyph } from "@/components/ui/button";
import { ReviewFlag, SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import { communities } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";
import { mailto, site, tel } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Acorn Electric | Request Electrical Service in Spokane",
  description:
    "Request electrical service from Acorn Electric in Spokane. Call (509) 808-1925 or send the form with what's going on and we'll get back to you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="on-night relative isolate overflow-hidden bg-grid-night text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_50%_at_20%_20%,rgb(255_239_31/.10),transparent_70%)]" />
      <div className="container-x pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
        <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
        {/* DOM order is intro → form → details, so on phones the form comes right
            after the intro. On desktop the form sits in the right column. */}
        <div className="mt-7 grid gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0">
          <div className="lg:col-span-5 lg:row-start-1">
            <p className="label-mono text-volt-400">Request service</p>
            <h1 className="mt-3 text-[2.6rem] leading-[0.98] font-bold tracking-[0.01em] sm:mt-5 sm:text-6xl lg:text-7xl">
              What&apos;s going on at your place?
            </h1>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-mist-200 sm:mt-6 sm:text-lg">
              Home or business, listed service or something different, tell us about your project.
              A photo of your electrical panel and anything relevant
              (charger model, hot tub spec sheet, the damage) helps us give you a useful answer the first time.
            </p>
            <p className="mt-4 text-mist-200 lg:hidden">
              Rather talk?{" "}
              <a href={tel} className="font-semibold text-white underline underline-offset-4 hover:text-volt-300">
                Call {site.phone.value.display}
              </a>
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="shadow-[0_30px_80px_-20px_rgb(0_0_0/.7)]">
              <ServiceRequestForm source="/contact" heading="Request service" headingLevel={2} />
            </div>
          </div>

          <div className="lg:col-span-5 lg:row-start-2">
            <h2 className="sr-only">Contact details</h2>
            <dl className="space-y-5 border-t border-white/10 pt-6 sm:space-y-6 sm:pt-8 lg:mt-10">
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">Call</dt>
                <dd className="mt-1.5 sm:mt-2">
                  <a href={tel} className="inline-flex min-h-11 items-center gap-3 font-display text-[1.75rem] font-semibold hover:text-volt-300 sm:text-4xl">
                    <PhoneGlyph className="h-7 w-7 text-volt-400" />
                    {site.phone.value.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">Email</dt>
                <dd className="mt-1.5 flex flex-wrap items-center gap-3 sm:mt-2">
                  <a href={mailto} className="inline-block py-1 text-lg underline underline-offset-4 hover:text-volt-300">
                    {site.email.value}
                  </a>
                  {!site.email.verified ? <ReviewFlag tone="dark">lead inbox</ReviewFlag> : null}
                </dd>
              </div>
              {site.hours || SHOW_REVIEW_FLAGS ? (
                <div>
                  <dt className="label-mono text-[0.62rem] text-mist-400">Hours</dt>
                  <dd className="mt-1.5 text-mist-200 sm:mt-2">
                    {site.hours ? (
                      site.hours.map((h) => (
                        <span key={h.days} className="block">
                          {h.days}: {h.open}–{h.close}
                        </span>
                      ))
                    ) : (
                      <ReviewFlag tone="dark">business hours</ReviewFlag>
                    )}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">Service area</dt>
                <dd className="mt-1.5 text-mist-200 sm:mt-2">
                  Spokane and nearby: {communities.slice(1).map((c) => c.name).join(", ").replace(/, ([^,]+)$/, ", and $1")}.{" "}
                  <Link href="/areas" className="inline-block text-white underline underline-offset-4 hover:text-volt-300">
                    See service areas
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">License</dt>
                <dd className="mt-1.5 text-mist-200 sm:mt-2">WA Electrical Contractor {site.license.value}</dd>
              </div>
            </dl>
            <p className="mt-6 border-l-2 border-copper-400 pl-4 text-sm text-mist-300 sm:mt-8">
              If something is sparking, smoking or smells like burning, get everyone clear and call 911. For downed
              power lines, stay away and call your utility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
