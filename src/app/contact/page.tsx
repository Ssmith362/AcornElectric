import Link from "next/link";
import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PhoneGlyph } from "@/components/ui/button";
import { ReviewFlag } from "@/components/ui/review-flag";
import { publishedAreas as areas } from "@/content/areas";
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
      <div className="container-x pt-8 pb-16 lg:pt-10 lg:pb-24">
        <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="label-mono text-volt-400">Request service</p>
            <h1 className="mt-5 text-5xl leading-[0.95] font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              What&apos;s going on at your place?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-mist-200">
              Tell us about the problem or the project. A photo of your electrical panel and anything relevant
              (charger model, hot tub spec sheet, the damage) helps us give you a useful answer the first time.
            </p>

            <dl className="mt-10 space-y-6 border-t border-white/10 pt-8">
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">Call</dt>
                <dd className="mt-2">
                  <a href={tel} className="inline-flex items-center gap-3 font-display text-3xl font-semibold hover:text-volt-300 sm:text-4xl">
                    <PhoneGlyph className="h-7 w-7 text-volt-400" />
                    {site.phone.value.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">Email</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-3">
                  <a href={mailto} className="text-lg underline underline-offset-4 hover:text-volt-300">
                    {site.email.value}
                  </a>
                  {!site.email.verified ? <ReviewFlag tone="dark">lead inbox</ReviewFlag> : null}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">Hours</dt>
                <dd className="mt-2 text-mist-200">
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
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">Service area</dt>
                <dd className="mt-2 text-mist-200">
                  {areas.length ? (
                    <>
                      Spokane and nearby, including{" "}
                      {areas.map((a, i) => (
                        <span key={a.slug}>
                          <Link href={`/areas/${a.slug}`} className="underline underline-offset-4 hover:text-volt-300">
                            {a.name}
                          </Link>
                          {i < areas.length - 2 ? ", " : i === areas.length - 2 ? " and " : "."}
                        </span>
                      ))}
                    </>
                  ) : (
                    "Spokane and nearby communities. Ask us about your address."
                  )}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-[0.62rem] text-mist-400">License</dt>
                <dd className="mt-2 text-mist-200">WA Electrical Contractor {site.license.value}</dd>
              </div>
            </dl>
            <p className="mt-8 border-l-2 border-copper-400 pl-4 text-sm text-mist-300">
              If something is sparking, smoking or smells like burning, get everyone clear and call 911. For downed
              power lines, stay away and call your utility.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="shadow-[0_30px_80px_-20px_rgb(0_0_0/.7)]">
              <ServiceRequestForm source="/contact" heading="Request service" headingLevel={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
