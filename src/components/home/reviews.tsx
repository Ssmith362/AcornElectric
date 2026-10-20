import { SectionHead } from "@/components/ui/section-head";
import { ReviewFlag, SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import { reviews } from "@/content/reviews";
import { site } from "@/lib/site";

/**
 * Proof. Real Google reviews from src/content/reviews.ts, shown the way the
 * Therapy in Motion site does: the customer's words, their name, "via Google",
 * and links out to Google. No stars or review count on purpose: those live on
 * the Google profile so they are always current. No review schema either.
 */
export function Reviews() {
  if (!reviews.length && !SHOW_REVIEW_FLAGS) return null;
  const link = site.google.reviewUrl || site.google.profileUrl;

  return (
    <section className="bg-mist-50 py-20 lg:py-28" aria-labelledby="reviews-title">
      <div className="container-x">
        <SectionHead label="In their own words" title={<span id="reviews-title">What customers say.</span>} />
        {reviews.length ? (
          <ul className="mt-12 gap-5 md:columns-2 lg:columns-3">
            {reviews.map((r) => (
              <li
                key={r.name}
                className="mb-5 break-inside-avoid border border-ink/10 bg-white p-7"
                data-reveal
              >
                <blockquote className="font-sans text-[1.02rem] leading-relaxed whitespace-pre-line text-ink">
                  “{r.quote}”
                </blockquote>
                <p className="mt-5 text-sm text-ink-mute">
                  <em className="font-semibold text-ink">{r.name}</em>
                  <span className="label-mono ml-2 text-[0.62rem]">via {r.source}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col gap-4 border border-dashed border-copper-500/50 p-8">
            <ReviewFlag>add real Google reviews</ReviewFlag>
          </div>
        )}
        <p className="mt-8 max-w-2xl text-sm text-ink-soft">
          Ratings and review counts live on our Google Business Profile, so they are always current there.
        </p>
        {link ? (
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            <a href={link} rel="noopener" className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">
              Read them on Google <span aria-hidden="true">↗</span>
            </a>
            <a href={link} rel="noopener" className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">
              Read or leave a Google review <span aria-hidden="true">↗</span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
