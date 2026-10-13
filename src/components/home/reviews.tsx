import { ReviewFlag, SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import { SectionHead } from "@/components/ui/section-head";
import { reviews } from "@/content/reviews";
import { site } from "@/lib/site";

/**
 * Proof. Renders real reviews from src/content/reviews.ts. With none added,
 * it shows only in preview builds (as a reminder) and is hidden in production.
 */
export function Reviews() {
  if (!reviews.length && !SHOW_REVIEW_FLAGS) return null;
  const link = site.google.reviewUrl || site.google.profileUrl;

  return (
    <section className="bg-mist-50 py-20 lg:py-28" aria-labelledby="reviews-title">
      <div className="container-x">
        <SectionHead label="From customers" title={<span id="reviews-title">In their words.</span>} />
        {reviews.length ? (
          <ul className="mt-12 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.name + r.quote.slice(0, 20)} className="flex flex-col justify-between bg-mist-50 p-7" data-reveal>
                <blockquote className="font-display text-xl leading-snug">“{r.quote}”</blockquote>
                <p className="label-mono mt-6 text-[0.65rem] text-ink-mute">
                  {r.name} · {r.source}
                  {r.service ? ` · ${r.service}` : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex flex-col gap-4 border border-dashed border-copper-500/50 p-8">
            <ReviewFlag>add real Google reviews</ReviewFlag>
            <p className="max-w-2xl text-ink-soft">
              This section stays hidden on the live site until real reviews are added to{" "}
              <code className="label-mono text-xs">src/content/reviews.ts</code>. Copy 3–6 genuine Google reviews word
              for word (with permission where needed) and add the Google review link in{" "}
              <code className="label-mono text-xs">src/lib/site.ts</code>. No review count is shown until it&apos;s
              verified.
            </p>
          </div>
        )}
        {link ? (
          <a href={link} rel="noopener" className="mt-8 inline-flex items-center gap-2 font-semibold underline underline-offset-4">
            Read more reviews on Google <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
