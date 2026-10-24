import { ApplicationForm } from "@/components/forms/application-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Photo } from "@/components/ui/photo";
import { ReviewFlag, SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import { isPostingComplete, openings } from "@/content/careers";
import { jobPostingSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electrician Jobs in Spokane: Careers at Acorn Electric",
  description:
    "Experienced residential electrician in Spokane? Acorn Electric is growing. New vans, fully stocked tools, a team book club and a real path into leadership.",
  path: "/careers",
});

const offer = [
  { title: "New work vans", body: "You'll drive a new van, not the one nobody else wanted." },
  { title: "Fully stocked tools", body: "The tools and materials to do the job right, provided. No buying your own to fill gaps." },
  {
    title: "A team that reads together",
    body: "We have a team book club. We take personal growth as seriously as technical skill.",
  },
  {
    title: "Room to lead",
    body: "We're small and growing fast. People who take ownership here grow into running jobs, training others and managing.",
  },
];

const fit = [
  "You can walk into a house, find the problem and fix it without someone looking over your shoulder.",
  "You explain things to homeowners clearly and treat their home with respect.",
  "You'd rather do it right than do it twice, and code compliance is a point of pride, not a hassle.",
  "You want more than a paycheck: you want to get better, and maybe lead.",
];

export default function CareersPage() {
  const visible = openings.filter((o) => o.status !== "closed");
  const live = openings.filter(isPostingComplete);

  return (
    <>
      <section className="on-night relative isolate overflow-hidden bg-grid-night text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_60%_at_20%_40%,rgb(255_239_31/.10),transparent_70%)]" />
        <div className="container-x pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
          <Breadcrumbs trail={[{ name: "Careers", path: "/careers" }]} />
          <div className="mt-7 grid items-center gap-8 sm:mt-10 sm:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="label-mono text-volt-400">Careers at Acorn Electric</p>
              <h1 className="mt-3 text-[2.75rem] leading-[0.95] sm:mt-5 sm:text-5xl font-bold tracking-[0.01em] sm:text-7xl lg:text-[5.2rem]">
                Own your work.
                <br />
                <span className="text-lit">Grow your career.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-mist-200 sm:mt-7 sm:text-xl">
                Acorn is a small, fast-growing electrical company serving Spokane homes and businesses. We&apos;re looking for an
                experienced electrician who wants to take ownership, do work they&apos;re proud of, and grow into
                leadership with us.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                <ButtonLink href="#apply" arrow>
                  Apply now
                </ButtonLink>
                <ButtonLink href="#openings" variant="outline-night">
                  See the opening
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Photo id="crew" priority sizes="(min-width: 1024px) 40vw, 100vw" className="border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-12 sm:py-16 lg:py-24" aria-labelledby="offer-title">
        <div className="container-x">
          <h2 id="offer-title" className="max-w-3xl text-[2rem] leading-tight font-bold sm:text-5xl">
            What working here looks like
          </h2>
          <ul className="mt-7 grid gap-px border border-ink/10 bg-ink/10 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {offer.map((o, i) => (
              <li key={o.title} className="bg-mist-50 px-5 py-5 sm:p-7" data-reveal style={{ ["--reveal-i" as string]: i }}>
                <span aria-hidden="true" className="block h-px w-8 bg-copper-500" />
                <h3 className="mt-3 text-xl font-bold sm:mt-4">{o.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist-100 py-12 sm:py-16 lg:py-24" aria-labelledby="fit-title">
        <div className="container-x grid gap-7 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="fit-title" className="text-[2rem] leading-tight font-bold sm:text-5xl">
              You&apos;ll fit here if…
            </h2>
            <p className="prose-acorn mt-5">
              This role is for someone with real residential experience. If you&apos;re earlier in your career, we
              still want to hear from you for the future: use the general interest option.
            </p>
          </div>
          <ul className="lg:col-span-7">
            {fit.map((f) => (
              <li key={f} className="flex gap-4 border-t border-ink/15 py-4 text-[1.05rem] first:border-t-2 first:border-ink sm:py-5 sm:text-lg" data-reveal>
                <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-volt-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="openings" className="on-night bg-night-900 py-12 text-white sm:py-16 lg:py-24" aria-labelledby="openings-title">
        <div className="container-x">
          <h2 id="openings-title" className="text-[2rem] leading-tight font-bold sm:text-5xl">
            Current openings
          </h2>
          <div className="mt-7 space-y-6 sm:mt-10">
            {visible.map((o) => (
              <article key={o.id} className="grid gap-8 border border-white/12 bg-night-950/60 p-5 sm:gap-10 sm:p-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="label-mono flex items-center gap-2.5 text-[0.65rem]">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${o.status === "open" ? "animate-pulse-node bg-volt-400" : "bg-mist-400"}`}
                    />
                    <span className={o.status === "open" ? "text-volt-300" : "text-mist-400"}>
                      {o.status === "open" ? "Hiring now" : "Not currently hiring for this role"}
                    </span>
                  </p>
                  <h3 className="mt-4 text-3xl font-bold">{o.title}</h3>
                  <p className="mt-4 leading-relaxed text-mist-300">{o.summary}</p>
                  {/* Unconfirmed details show a review flag in previews and are left out
                      entirely in production, so no label ever renders empty. */}
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm sm:mt-6">
                    {[
                      { k: "Location", v: "Spokane, WA", flag: "", wide: false },
                      {
                        k: "Type",
                        v: o.posting.employmentType ? (o.posting.employmentType === "FULL_TIME" ? "Full-time" : "Part-time") : null,
                        flag: "type",
                        wide: false,
                      },
                      {
                        k: "Pay",
                        v: o.posting.pay
                          ? `$${o.posting.pay.min}–$${o.posting.pay.max} / ${o.posting.pay.unit === "HOUR" ? "hour" : "year"}`
                          : null,
                        flag: "pay range",
                        wide: false,
                      },
                      { k: "Schedule", v: o.posting.schedule, flag: "schedule", wide: false },
                      {
                        k: "Benefits",
                        v: o.posting.benefits?.length ? o.posting.benefits.join(" · ") : null,
                        flag: "benefits (none listed until confirmed)",
                        wide: true,
                      },
                    ]
                      .filter((row) => row.v || SHOW_REVIEW_FLAGS)
                      .map((row) => (
                        <div key={row.k} className={row.wide ? "col-span-2" : undefined}>
                          <dt className="label-mono text-[0.6rem] text-mist-400">{row.k}</dt>
                          <dd className="mt-1.5">{row.v ?? <ReviewFlag tone="dark">{row.flag}</ReviewFlag>}</dd>
                        </div>
                      ))}
                  </dl>
                </div>
                <div className="lg:col-span-7">
                  <h4 className="label-mono text-mist-400">What you bring</h4>
                  <ul className="mt-5 space-y-3.5">
                    {o.bring.map((b) => (
                      <li key={b} className="flex gap-3.5 text-mist-100">
                        <svg viewBox="0 0 12 12" className="mt-1.5 h-3 w-3 shrink-0 text-volt-400" aria-hidden="true">
                          <path d="M1 6.5l3 3 7-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6">
                    <ReviewFlag tone="dark">exact licensing requirement and role details</ReviewFlag>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="on-night relative bg-night-950 py-12 text-white sm:py-16 lg:py-24" aria-labelledby="apply-title">
        <div className="container-x grid gap-8 sm:gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="apply-title" className="text-[2rem] leading-tight font-bold sm:text-5xl">
              How to apply
            </h2>
            <ol className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
              {[
                ["Send the form", "A few questions about your certificate and experience. A resume helps but isn't required."],
                ["We read every one", "A person at Acorn reviews your application, not a filter."],
                ["A conversation", "If it looks like a fit, we'll set up a call and then a meeting."],
              ].map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[3.5rem_1fr] gap-3">
                  <span className="label-mono pt-1 text-volt-400">Step {i + 1}</span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1 text-mist-300">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-8">
            <ApplicationForm />
          </div>
        </div>
      </section>

      {live.map((o) => (
        <JsonLd key={o.id} data={jobPostingSchema(o)} />
      ))}
    </>
  );
}
