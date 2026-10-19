import Image from "next/image";

/**
 * Acorn's real logo (supplied by Eric Beisley, Oct 16 2026). Cut out from the
 * on-black JPG exports, so the cream keyline is intact and it sits on the dark
 * header and footer. Masters: Acorn Electric-01…08.jpg; Eric also has AI/EPS.
 *
 * Files in /public/brand:
 *   acorn-logo-horizontal-640  mascot + wordmark side by side (header, footer)
 *   acorn-wordmark-640         wordmark only
 *   acorn-mascot-900           the squirrel on its own
 */
export function Logo({ size = "md" }: { size?: "md" | "lg"; tone?: "light" | "dark" }) {
  const cls = size === "lg" ? "h-20 w-auto sm:h-24" : "h-12 w-auto sm:h-14 lg:h-[3.75rem]";
  return (
    <Image
      src="/brand/acorn-logo-horizontal-640.webp"
      alt="Acorn Electric"
      width={640}
      height={327}
      priority
      className={cls}
    />
  );
}

/** The squirrel on its own. Decorative unless you pass alt text. */
export function Mascot({ className = "h-40 w-auto", alt = "" }: { className?: string; alt?: string }) {
  return (
    <Image
      src="/brand/acorn-mascot-900.webp"
      alt={alt}
      width={900}
      height={1106}
      className={className}
      aria-hidden={alt ? undefined : true}
    />
  );
}
