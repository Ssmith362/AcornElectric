import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/cta-section";
import { Process } from "@/components/sections/process";
import { RelatedServices } from "@/components/sections/related-services";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonAnchor, ButtonLink, PhoneGlyph } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { ReviewFlag } from "@/components/ui/review-flag";
import { getService, publishedServices as services } from "@/content/services";
import { Accordion } from "@/components/ui/accordion";
import { serviceSchema } from "@/lib/schema";
import { inSentence } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";
import { site, tel } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ ...s.meta, path: `/services/${s.slug}`, noindex: !s.confirmed });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="on-night relative isolate overflow-hidden bg-grid-night text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_60%_at_80%_40%,rgb(255_239_31/.11),transparent_70%)]" />
        <div className="container-x pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
          <Breadcrumbs trail={[{ name: "Services", path: "/services" }, { name: s.short, path }]} />
          <div className="mt-7 grid items-center gap-8 sm:mt-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              {!s.confirmed ? (
                <p className="label-mono flex flex-wrap items-center gap-3 text-volt-400" data-reveal>
                  <ReviewFlag tone="dark">Acorn offers this service</ReviewFlag>
                </p>
              ) : null}
              <h1 className="mt-2 text-[2.35rem] leading-[1] sm:mt-5 sm:text-[2.6rem] sm:leading-[0.98] font-bold tracking-[0.01em] sm:text-6xl lg:text-[4.2rem]" data-reveal>
                {s.h1}
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-mist-200 sm:mt-6 sm:text-xl" data-reveal>
                {s.lede}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row" data-reveal>
                <ButtonLink href="#request" arrow>
                  Get started
                </ButtonLink>
                <ButtonAnchor href={tel} variant="outline-night">
                  <PhoneGlyph className="h-4 w-4 text-volt-400" /> {site.phone.value.display}
                </ButtonAnchor>
              </div>
            </div>
            <div className="lg:col-span-6" data-reveal>
              <Photo id={s.image} priority sizes="(min-width: 1024px) 48vw, 100vw" className="border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- situation + signs */}
      <section className="bg-mist-50 py-12 sm:py-16 lg:py-24">
        <div className="container-x grid gap-8 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal>
            <h2 className="text-3xl leading-tight font-bold sm:text-4xl">The situation</h2>
            <div className="prose-acorn mt-5 space-y-4">
              {s.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6" data-reveal>
            <div className="border-l-2 border-copper-500 bg-white p-5 sm:p-8">
              <h2 className="text-2xl leading-tight font-bold">{s.signs.heading}</h2>
              <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {s.signs.items.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-soft">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-volt-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- the work */}
      <section className="border-t border-ink/10 bg-grid-mist py-12 sm:py-16 lg:py-24">
        <div className="container-x">
          <div className="max-w-3xl" data-reveal>
            <h2 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">{s.work.heading}</h2>
            {s.work.intro ? <p className="prose-acorn mt-4 sm:mt-5">{s.work.intro}</p> : null}
          </div>
          <ol className="mt-8 grid border-t border-l border-ink/12 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {s.work.steps.map((st, i) => (
              <li key={st.title} className="border-r border-b border-ink/12 bg-mist-50 px-5 py-4 sm:p-7" data-reveal style={{ ["--reveal-i" as string]: i % 3 }}>
                <span className="label-mono text-copper-700">Step {i + 1}</span>
                <h3 className="mt-2 text-lg leading-snug font-bold sm:mt-3 sm:text-xl">{st.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-soft sm:mt-2.5">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------- done right (dark) */}
      <section className="on-night bg-night-900 py-12 text-white sm:py-16 lg:py-24">
        <div className="container-x grid gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="label-mono text-volt-400">Code, safety and permits</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:mt-4 sm:text-4xl">{s.doneRight.heading}</h2>
            {s.doneRight.intro ? <p className="mt-4 leading-relaxed text-mist-300 sm:mt-5">{s.doneRight.intro}</p> : null}
          </div>
          <div className="lg:col-span-8">
            <Accordion
              tone="night"
              items={s.doneRight.points.map((p) => ({ title: p.title, body: <p>{p.body}</p> }))}
              className="lg:grid lg:grid-cols-2 lg:gap-x-10 lg:border-t-0"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------- factors + prepare */}
      <section className="bg-mist-50 py-12 sm:py-16 lg:py-24">
        <div className="container-x grid gap-10 sm:gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="text-3xl leading-tight font-bold sm:text-4xl">{s.factors.heading}</h2>
            <p className="prose-acorn mt-4">
              Every home is different, so we don&apos;t quote blind. These are the things that make the biggest
              difference to the job.
            </p>
            <div className="mt-6 sm:mt-8">
              <Accordion items={s.factors.items.map((f) => ({ title: f.title, body: <p>{f.body}</p> }))} />
            </div>
          </div>
          <aside className="lg:col-span-5" data-reveal aria-labelledby="prep-title">
            <div className="bg-ink p-5 text-mist-100 sm:p-8">
              <p className="label-mono text-volt-400">Speeds things up</p>
              <h2 id="prep-title" className="mt-3 text-2xl font-bold text-white">
                What to send us
              </h2>
              <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {s.prepare.map((p) => (
                  <li key={p} className="flex gap-3">
                    <svg viewBox="0 0 12 12" className="mt-1.5 h-3 w-3 shrink-0 text-volt-400" aria-hidden="true">
                      <path d="M1 6.5l3 3 7-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="#request" className="mt-7 inline-flex items-center gap-2 font-semibold text-volt-300 hover:text-volt-200">
                Send it with your request <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Process variant="compact" />

      {/* ------------------------------------------------------------ FAQ */}
      <section className="bg-mist-50 py-12 sm:py-16 lg:py-24" aria-labelledby="faq-title">
        <div className="container-x grid gap-6 sm:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="text-3xl leading-tight font-bold sm:text-4xl">
              Questions people ask about {inSentence(s.short)}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={s.faqs} />
          </div>
        </div>
      </section>

      <RelatedServices slugs={s.related} />

      <CtaSection
        source={path}
        defaultService={s.name}
        title={
          <>
            Tell us what&apos;s going on. <span className="text-lit">We&apos;ll take it from there.</span>
          </>
        }
        body={`Send the details and any photos you have about ${inSentence(s.name)}. We'll come back to you to talk through what it needs.`}
      />

      <JsonLd data={serviceSchema(s)} />
    </>
  );
}
