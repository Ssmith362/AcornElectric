import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { PhoneGlyph } from "@/components/ui/button";
import { site, tel } from "@/lib/site";

/** Closing conversion block: dark stage, the work-order form on top of it. */
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
    <section id={id} className="on-night relative overflow-hidden bg-night-950 py-14 text-white sm:py-20 lg:py-28" aria-labelledby={`${id}-title`}>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_30%,rgb(255_239_31/.10),transparent_70%)]" />
      <div className="container-x relative grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="label-mono flex items-center gap-3 text-mist-300">
            <span className="h-2 w-2 animate-pulse-node rounded-full bg-volt-400" aria-hidden="true" />
            Ready when you are
          </p>
          <h2 id={`${id}-title`} className="mt-4 text-[2.1rem] leading-[1.04] font-bold sm:mt-5 sm:text-5xl sm:leading-[1.02] lg:text-6xl">
            {title}
          </h2>
          <div className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-mist-300 sm:mt-6 sm:text-lg">{body}</div>
          <div className="mt-6 border-t border-white/10 pt-5 sm:mt-10 sm:pt-8">
            <p className="label-mono text-[0.62rem] text-mist-400">Rather talk it through?</p>
            <a href={tel} className="mt-2 inline-flex min-h-11 items-center gap-3 font-display text-[1.75rem] font-semibold hover:text-volt-300 sm:mt-3 sm:text-4xl">
              <PhoneGlyph className="h-7 w-7 text-volt-400" />
              {site.phone.value.display}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <div className="shadow-[0_30px_80px_-20px_rgb(0_0_0/.7)]">
            <ServiceRequestForm source={source} defaultService={defaultService} />
          </div>
        </div>
      </div>
    </section>
  );
}
