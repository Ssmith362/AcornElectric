import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "volt" | "outline-night" | "outline-mist" | "ink";

const styles: Record<Variant, string> = {
  volt: "bg-volt-400 text-night-950 hover:bg-volt-300 shadow-[0_0_0_1px_rgb(255_239_31/.4),0_8px_30px_-8px_rgb(255_239_31/.45)]",
  "outline-night": "border border-white/25 text-white hover:border-volt-400 hover:text-volt-300",
  "outline-mist": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-mist-50",
  ink: "bg-ink text-mist-50 hover:bg-night-700",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-sq px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow] duration-200";

export function Arrow() {
  return (
    <svg viewBox="0 0 20 12" className="h-3 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
      <path d="M0 6h17M12 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PhoneGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        d="M5.2 2.5h2.6l1.4 3.8-1.9 1.3a10.4 10.4 0 0 0 5.1 5.1l1.3-1.9 3.8 1.4v2.6a2 2 0 0 1-2 2C9 16.8 3.2 11 3.2 4.5a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = { variant?: Variant; children: ReactNode; arrow?: boolean; className?: string };

export function ButtonLink({
  variant = "volt",
  arrow = false,
  className = "",
  children,
  ...rest
}: Props & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

/** Plain <a> for tel:/mailto: links, which must not go through next/link. */
export function ButtonAnchor({
  variant = "volt",
  arrow = false,
  className = "",
  children,
  ...rest
}: Props & ComponentProps<"a">) {
  return (
    <a className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}
