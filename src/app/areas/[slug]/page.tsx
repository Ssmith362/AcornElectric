import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/cta-section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq";
import { ReviewFlag } from "@/components/ui/review-flag";
import { getArea, publishedAreas as areas } from "@/content/areas";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return pageMetadata({ ...a.meta, path: `/areas/${a.slug}`, noindex: !a.confirmed });
}

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).slug);
  if (!a) notFound();
  const path = `/areas/${a.slug}`;
  const featured = a.featured.map(getService).filter((s) => !!s);

  return (
    <>
      <section className="on-night relative isolate overflow-hidden bg-grid-night text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_60%_at_85%_30%,rgb(224_102_29/.18),transparent_70%)]" />
        <div className="container-x pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
          <Breadcrumbs trail={[{ name: "Service areas", path: "/areas" }, { name: a.name, path }]} />
          <div className="mt-7 max-w-4xl sm:mt-10">
            <p className="label-mono flex flex-wrap items-center gap-3 text-volt-400">
              Service area · {a.name}, WA
              {!a.confirmed ? <ReviewFlag tone="dark">Acorn serves {a.name}</ReviewFlag> : null}
            </p>
            <h1 className="mt-3 text-[2.6rem] leading-[0.98] sm:mt-5 sm:text-5xl font-bold tracking-[0.01em] sm:text-6xl lg:text-7xl">{a.h1}</h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-mist-200 sm:mt-6 sm:text-xl">{a.lede}</p>
            <div className="mt-7 sm:mt-8">
              <ButtonLink href="#request" arrow>
                Request service in {a.name}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-12 sm:py-16 lg:py-24">
        <div className="container-x">
          <h2 className="max-w-3xl text-3xl leading-tight font-bold sm:text-4xl">
            What&apos;s worth knowing about electrical work in {a.name}
          </h2>
          <ul className="mt-7 grid gap-px border border-ink/10 bg-ink/10 sm:mt-10 md:grid-cols-3">
            {a.local.map((p, i) => (
              <li key={p.title} className="bg-mist-50 px-5 py-5 sm:p-7" data-reveal style={{ ["--reveal-i" as string]: i }}>
                <span aria-hidden="true" className="block h-px w-8 bg-copper-500" />
                <h3 className="mt-4 text-xl leading-snug font-bold">{p.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-night bg-night-900 py-12 text-white sm:py-16 lg:py-24">
        <div className="container-x">
          <h2 className="text-3xl leading-tight font-bold sm:text-4xl">Common {a.name} projects</h2>
          <ul className="mt-7 grid gap-px bg-white/10 sm:mt-10 md:grid-cols-2">
            {featured.map((s) => (
              <li key={s.slug} className="bg-night-900">
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col gap-2 px-5 py-5 hover:bg-night-800 sm:gap-3 sm:p-7">
                  <span className="font-display text-2xl font-semibold">{s.short}</span>
                  <span className="text-mist-300">{s.problem}</span>
                  <span className="mt-auto pt-2 text-sm font-semibold text-volt-300">
                    {s.name} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {a.faqs.length ? (
        <section className="bg-mist-50 py-12 sm:py-16 lg:py-24" aria-labelledby="faq-title">
          <div className="container-x grid gap-6 sm:gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="faq-title" className="text-3xl leading-tight font-bold sm:text-4xl">
                {a.name} questions
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={a.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <CtaSection
        source={path}
        title={
          <>
            Electrical work in {a.name}? <span className="text-lit">Let&apos;s talk.</span>
          </>
        }
        body="Send your address and what's going on. We'll confirm coverage and talk it through."
      />
    </>
  );
}
