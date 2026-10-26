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
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < Math.round(rating) ? "text-volt-500" : "text-ink/15"}`} fill="currentColor" aria-hidden="true">
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
            <figure key={`${copy}-${r.name}`} className="flex w-[19rem] shrink-0 flex-col border border-ink/10 bg-white px-5 py-4 sm:w-[21rem]">
              <Stars rating={r.rating} />
              <blockquote className="mt-2 line-clamp-3 font-sans text-[0.92rem] leading-snug whitespace-normal text-ink">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.8rem]">
                <span className="font-semibold text-ink">{r.name}</span>
                {r.when ? <span className="text-ink-mute">{r.when}</span> : null}
                <span className="text-ink-mute">via {r.source}</span>
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
    <section className="overflow-hidden bg-mist-100 py-12 sm:py-20" aria-labelledby="reviews-title">
      <div className="container-x">
        <div>
          <div data-reveal>
            <h2 id="reviews-title" className="text-[1.9rem] leading-[1.1] sm:text-3xl lg:text-4xl">
              What customers say
            </h2>
          </div>
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
          <p className="mt-6 text-[0.92rem] text-ink-soft sm:mt-7">
            <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold text-copper-700 underline underline-offset-4 hover:text-ink">
              Read or leave a Google review
            </a>
            .
          </p>
        </div>
      ) : null}
    </section>
  );
}
