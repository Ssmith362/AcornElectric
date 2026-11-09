import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "volt" | "outline-night" | "outline-mist" | "ink";

// Orange buttons carry dark text: white on this orange doesn't reach 4.5:1.
const styles: Record<Variant, string> = {
  volt: "bg-volt-500 text-night-950 hover:bg-mist-100 hover:text-night-900",
  "outline-night": "border border-white/60 text-white hover:border-white hover:bg-white hover:text-night-950",
  "outline-mist": "border border-ink/25 text-ink hover:border-night-900 hover:bg-night-900 hover:text-mist-100",
  ink: "bg-night-900 text-mist-100 hover:bg-volt-500 hover:text-night-950",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-5 px-5 py-3 text-[0.9rem] font-semibold transition-[background-color,border-color,color] duration-200";

/** The diagonal "go" arrow from the Option 4 design. */
export function Arrow() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
      <path d="M2.5 9.5l7-7M4 2.5h5.5V8" fill="none" stroke="currentColor" strokeWidth="1.6" />
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
