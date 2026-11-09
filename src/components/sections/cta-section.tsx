import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { PhoneGlyph } from "@/components/ui/button";
import { site, tel } from "@/lib/site";

/** Closing conversion block (Option 4): copy on the left, the work-order form on a paper card. */
export function CtaSection({
  title,
  body,
  source,
  defaultService,
  id = "request",
}: {
  title: React.ReactNode;
  body: React.ReactNode;
  source: string;
  defaultService?: string;
  id?: string;
}) {
  return (
    <section id={id} className="bg-mist-200 py-16 sm:py-24 lg:py-28" aria-labelledby={`${id}-title`}>
      <div className="container-x grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-[clamp(2.25rem,8vw,7.5rem)]">
        <div data-reveal>
          <p className="label-mono text-copper-600">Ready when you are</p>
          <h2 id={`${id}-title`} className="mt-3 text-[3.2rem] leading-[0.86] text-night-900 [&_.text-lit]:text-copper-600 sm:text-[4.6rem] lg:text-[clamp(3.6rem,8vw,6.75rem)]">
            {title}
          </h2>
          <div className="mt-5 max-w-[39ch] text-[0.9rem] leading-relaxed text-ink-soft">{body}</div>
          <p className="mt-8 text-[0.72rem] text-ink-mute">Rather talk it through?</p>
          <a href={tel} className="mt-0.5 inline-flex min-h-11 items-center gap-2.5 font-display text-[1.6rem] font-semibold text-night-900 hover:text-copper-600">
            <PhoneGlyph className="h-6 w-6 text-copper-600" />
            {site.phone.value.display}
          </a>
        </div>
        <div className="shadow-[0_18px_46px_rgb(24_42_31/.08)]" data-reveal>
          <ServiceRequestForm source={source} defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
