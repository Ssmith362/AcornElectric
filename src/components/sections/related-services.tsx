import Link from "next/link";
import { getService } from "@/content/services";

export function RelatedServices({ slugs, title = "Often part of the same project" }: { slugs: string[]; title?: string }) {
  const list = slugs.map(getService).filter((s) => !!s);
  if (!list.length) return null;
  return (
    <section className="border-t border-ink/10 bg-mist-100 py-12 sm:py-16" aria-labelledby="related-title">
      <div className="container-x">
        <h2 id="related-title" className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <ul className="mt-6 grid gap-px sm:mt-8 border border-ink/10 bg-ink/10 md:grid-cols-3">
          {list.map((s) => (
            <li key={s.slug} className="bg-mist-50">
              <Link href={`/services/${s.slug}`} className="group flex h-full flex-col justify-between gap-3 p-5 hover:bg-white sm:gap-6 sm:p-6">
                <span>
                  <span className="block font-display text-xl leading-tight font-semibold sm:text-2xl">{s.short}</span>
                  <span className="mt-2 block text-ink-soft">{s.problem}</span>
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  Learn more
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
