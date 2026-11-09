import { Mascot } from "@/components/ui/logo";
import { ReviewFlag, SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import { reviews, type Review } from "@/content/reviews";
import { site } from "@/lib/site";
import { PausableMarquee } from "./marquee";

/**
 * Proof, shown like the Therapy in Motion site: two ribbons of compact review
 * cards drifting in opposite directions. Real Google reviews only, word for
 * word (src/content/reviews.ts). Each card shows the stars the reviewer gave,
 * the quote (clamped visually, full text stays in the HTML), the name, Google's
 * own "5 months ago" wording and "via Google".
 *
 * No overall rating or review count is printed (they'd go stale; Google shows
 * the live numbers), and no review structured data (Google ignores it on a
 * business's own site).
 */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "text-volt-400" : "text-white/20"}`} fill="currentColor" aria-hidden="true">
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6Z" />
        </svg>
      ))}
    </div>
  );
}

function Ribbon({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  return (
    <div className={`marquee-track ${reverse ? "marquee-track--reverse" : "marquee-track--slow"} gap-4`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 gap-4" aria-hidden={copy === 1 ? "true" : undefined}>
          {items.map((r) => (
            <figure key={`${copy}-${r.name}`} className="flex w-[19rem] shrink-0 flex-col border border-white/12 bg-night-850 px-5 py-4 sm:w-[23rem] sm:px-6 sm:py-5">
              <div className="flex items-center justify-between gap-3">
                <Stars rating={r.rating} />
                <span aria-hidden="true" className="h-5 font-serif text-[2.6rem] leading-[0.9] text-volt-500">“</span>
              </div>
              <blockquote className="mt-2.5 line-clamp-3 font-display text-[1.12rem] leading-[1.25] font-medium whitespace-normal text-mist-100 sm:text-[1.2rem]">
                {r.quote}
              </blockquote>
              <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.75rem]">
                <span className="font-semibold text-white">{r.name}</span>
                {r.when ? <span className="text-mist-100/60">{r.when}</span> : null}
                <span className="text-mist-100/60">· via {r.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Reviews() {
  if (!reviews.length && !SHOW_REVIEW_FLAGS) return null;
  const link = site.google.reviewUrl || site.google.profileUrl;
  const half = Math.ceil(reviews.length / 2);

  return (
    <section className="on-night relative overflow-hidden bg-night-900 pt-14 pb-12 text-mist-100 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20" aria-labelledby="reviews-title">
      <div className="container-x relative">
        <div className="flex items-end justify-between gap-6" data-reveal>
          <div>
            <p className="label-mono text-volt-400">Google reviews</p>
            <h2 id="reviews-title" className="mt-3 text-[2.4rem] leading-[0.99] text-white sm:text-[3.2rem] lg:text-[clamp(2.6rem,4.6vw,4rem)]">
              What customers say
            </h2>
            <p className="mt-3 text-[0.8rem] text-mist-100/60">Real reviews, word for word.</p>
          </div>
          {/* The squirrel peeks over the ribbons, holding his multimeter. */}
          <Mascot className="relative z-10 -mb-6 h-28 w-auto shrink-0 -rotate-6 drop-shadow-[0_14px_18px_rgb(0_0_0/.35)] sm:-mb-8 sm:h-40 lg:-mb-10 lg:h-52" />
        </div>
      </div>

      {reviews.length ? (
        <PausableMarquee>
          <Ribbon items={reviews.slice(0, half)} />
          <Ribbon items={reviews.slice(half)} reverse />
        </PausableMarquee>
      ) : (
        <div className="container-x mt-8">
          <ReviewFlag>add real Google reviews</ReviewFlag>
        </div>
      )}

      {link ? (
        <div className="container-x">
          <p className="mt-4 text-[0.85rem] sm:mt-5">
            <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2.5 font-semibold text-volt-300 hover:text-white">
              Read or leave a Google review <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      ) : null}
    </section>
  );
}
