import type { ReactNode } from "react";

/**
 * Section heading with a numbered index, like a breaker position: "03 —".
 * `tone` follows the section surface.
 */
export function SectionHead({
  index,
  label,
  title,
  intro,
  tone = "mist",
  as: Tag = "h2",
  className = "",
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "mist" | "night";
  as?: "h1" | "h2";
  className?: string;
}) {
  const night = tone === "night";
  return (
    <header className={`max-w-3xl ${className}`} data-reveal>
      <p className={`label-mono flex items-center gap-3 ${night ? "text-mist-300" : "text-copper-700"}`}>
        {index ? <span className={night ? "text-volt-400" : "text-copper-600"}>{index}</span> : null}
        <span aria-hidden="true" className={`h-px w-8 ${night ? "bg-volt-400/60" : "bg-copper-500/60"}`} />
        <span>{label}</span>
      </p>
      <Tag
        className={`mt-5 text-[2.1rem] leading-[1.02] font-bold sm:text-5xl lg:text-[3.6rem] ${night ? "text-white" : "text-ink"}`}
      >
        {title}
      </Tag>
      {intro ? (
        <div className={`mt-5 max-w-2xl text-lg leading-relaxed ${night ? "text-mist-300" : "text-ink-soft"}`}>{intro}</div>
      ) : null}
    </header>
  );
}
