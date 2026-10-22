"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Photo } from "@/components/ui/photo";
import type { ImageKey } from "@/content/images";

export type DeckItem = { slug: string; name: string; short: string; lede: string; image: ImageKey };

/**
 * "What we do most" below the desktop breakpoint.
 *
 * Phone: a swipeable card carousel (CSS scroll-snap) with Previous/Next
 * buttons, dot buttons and a "2 / 6" position readout. Tablet: the same cards
 * as a 3 × 2 grid, no carousel controls needed.
 *
 * Accessibility follows the APG carousel pattern: a labelled region with
 * aria-roledescription="carousel", each card a "slide" group labelled
 * "n of N", a polite live region announcing the position after a button
 * press, and no auto-rotation. Each card's short detail is a disclosure
 * button (aria-expanded). Nothing depends on hover.
 */
export function ServiceDeck({ items }: { items: DeckItem[] }) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const n = items.length;

  // Which card is showing: the one whose left edge is nearest the track's.
  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sync]);

  function go(to: number) {
    const el = track.current;
    if (!el) return;
    const i = Math.max(0, Math.min(n - 1, to));
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    setIndex(i);
    setAnnounce(`Showing ${i + 1} of ${n}: ${items[i].short}`);
  }

  const btn =
    "flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-volt-400 hover:text-volt-300 disabled:opacity-35 disabled:hover:border-white/25 disabled:hover:text-white";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Services we do most" className="mt-7 md:mt-9">
      <div
        ref={track}
        id={`${id}-track`}
        className="deck-track relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0"
      >
        {items.map((s, i) => {
          const isOpen = !!open[s.slug];
          const detailId = `${id}-d${i}`;
          return (
            <div
              key={s.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${s.short}`}
              className="relative flex w-[78%] shrink-0 snap-start flex-col border border-white/12 bg-night-950/60 sm:w-[46%] md:w-auto"
            >
              <Photo id={s.image} ticks={false} compactLabel sizes="(min-width: 768px) 30vw, 80vw" className="aspect-[16/10]!" />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-sans text-lg leading-snug font-bold text-white">
                  <Link href={`/services/${s.slug}`} className="hover:text-volt-300">
                    {s.short}
                  </Link>
                </h3>
                <div id={detailId} className={isOpen ? "deck-detail mt-2 text-[0.92rem] leading-relaxed text-mist-300" : "hidden"}>
                  {s.lede}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={() => setOpen((o) => ({ ...o, [s.slug]: !o[s.slug] }))}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-volt-300 hover:text-volt-200"
                  >
                    <span
                      aria-hidden="true"
                      className={`relative h-3 w-3 before:absolute before:top-1/2 before:left-0 before:h-px before:w-3 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-3 after:w-px after:bg-current after:transition-transform ${isOpen ? "after:scale-y-0" : ""}`}
                    />
                    {isOpen ? "Hide" : "Quick look"}
                    <span className="sr-only"> at {s.short}</span>
                  </button>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-volt-400 underline-offset-4 hover:text-volt-300"
                  >
                    Details<span className="sr-only">: {s.name}</span> <span aria-hidden="true">&nbsp;→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phone controls. Tablet shows every card in the grid, so none needed. */}
      <div className="mt-4 flex items-center justify-between gap-3 md:hidden">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-controls={`${id}-track`} className={btn}>
          <span className="sr-only">Previous service</span>
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
            <path d="M8 1L3 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <ol className="flex items-center" aria-label="Choose a service card">
            {items.map((s, i) => (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-controls={`${id}-track`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span className="sr-only">Show {s.short}</span>
                  <span
                    aria-hidden="true"
                    className={`block h-2 transition-all duration-200 ${i === index ? "w-5 bg-volt-400" : "w-2 bg-white/35"}`}
                  />
                </button>
              </li>
            ))}
          </ol>
          <p className="label-mono min-w-[3.2rem] text-right text-mist-300" aria-hidden="true">
            {index + 1} / {n}
          </p>
        </div>
        <button type="button" onClick={() => go(index + 1)} disabled={index === n - 1} aria-controls={`${id}-track`} className={btn}>
          <span className="sr-only">Next service</span>
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
            <path d="M4 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
