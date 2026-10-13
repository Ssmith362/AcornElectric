import type { Faq } from "@/content/types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "./json-ld";

/**
 * Native <details> accordion: keyboard and screen-reader friendly with no JS.
 * FAQPage schema is emitted alongside so the markup matches what's visible.
 */
export function FaqList({ faqs, schema = true }: { faqs: Faq[]; schema?: boolean }) {
  return (
    <>
      <div className="border-t border-ink/15">
        {faqs.map((f, i) => (
          <details key={f.q} className="group border-b border-ink/15" {...(i === 0 ? { open: true } : {})}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-xl">{f.q}</span>
              <span
                aria-hidden="true"
                className="relative mt-1.5 h-4 w-4 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-4 before:bg-copper-600 after:absolute after:top-0 after:left-1/2 after:h-4 after:w-px after:bg-copper-600 after:transition-transform group-open:after:scale-y-0"
              />
            </summary>
            <p className="prose-acorn pb-6 pr-10">{f.a}</p>
          </details>
        ))}
      </div>
      {schema ? <JsonLd data={faqSchema(faqs)} /> : null}
    </>
  );
}
