import Link from "next/link";
import { publishedServices as services } from "@/content/services";

/**
 * The services index, drawn as a breaker panel directory: two columns of
 * numbered positions, each with a label and a status light that comes on
 * when you point at it. Used on the homepage and /services.
 */
export function PanelSchedule({ exclude = [] as string[] }) {
  const list = services.filter((s) => !exclude.includes(s.slug));
  return (
    <div className="border border-white/12 bg-night-900/80 p-2 sm:p-3">
      <div className="flex items-center justify-between border-b border-white/10 px-3 pt-2 pb-3">
        <span className="label-mono text-[0.62rem] text-mist-400">Circuit directory</span>
        <span className="label-mono text-[0.62rem] text-mist-400">{list.length} circuits</span>
      </div>
      <ol className="grid sm:grid-cols-2">
        {list.map((s) => {
          return (
            <li key={s.slug} className="border-b border-white/8 bg-night-900 sm:odd:border-r" data-reveal>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full items-center gap-4 px-3 py-4 transition-colors hover:bg-night-800 sm:px-4"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-copper-400" />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-sans text-lg leading-tight font-semibold text-white group-hover:text-volt-200">
                    {s.short}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="relative h-7 w-3.5 shrink-0 border border-white/20 bg-night-950"
                >
                  <span className="absolute inset-x-0.5 bottom-0.5 h-2.5 bg-night-600 transition-all duration-300 group-hover:bottom-auto group-hover:top-0.5 group-hover:bg-volt-400 group-hover:shadow-[0_0_10px_var(--color-volt-400)]" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
