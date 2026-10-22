"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Photo } from "@/components/ui/photo";
import type { ImageKey } from "@/content/images";

export type DeckItem = { slug: string; name: string; short: string; lede: string; image: ImageKey };

/**
 * "What we do most": a side-scrolling card deck at every screen size.
 * One card (plus a peek) on phones, two on small tablets, three from 768px up.
 *
 * Built on CSS scroll-snap, so swiping, trackpads and shift+wheel all work
 * natively. Previous/Next buttons, dot buttons and a position readout drive
 * it too. Accessibility follows the APG carousel pattern: a labelled region
 * with aria-roledescription="carousel", each card a "slide" group labelled
 * "n of N", a polite live region announcing the position after a button
 * press, and no auto-rotation. Each card's short detail is a disclosure
 * button (aria-expanded). Nothing depends on hover.
 */
export function ServiceDeck({ items }: { items: DeckItem[] }) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const n = items.length;

  /** Card start positions measured from the first card, so padding doesn't matter. */
  const starts = useCallback(() => {
    const el = track.current;
    if (!el || !el.children.length) return [] as number[];
    const first = (el.children[0] as HTMLElement).offsetLeft;
    return Array.from(el.children).map((c) => (c as HTMLElement).offsetLeft - first);
  }, []);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const xs = starts();
    let best = 0;
    xs.forEach((x, i) => {
      if (Math.abs(x - el.scrollLeft) < Math.abs(xs[best] - el.scrollLeft)) best = i;
    });
    const step = xs.length > 1 ? xs[1] - xs[0] : el.clientWidth;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setIndex(end ? Math.max(best, n - Math.max(1, Math.round(el.clientWidth / step))) : best);
    setVisible(Math.max(1, Math.min(n, Math.round(el.clientWidth / step))));
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(end);
  }, [n, starts]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sync]);

  function go(to: number) {
    const el = track.current;
    if (!el) return;
    const xs = starts();
    const i = Math.max(0, Math.min(n - 1, to));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: xs[i] ?? 0, behavior: reduce ? "auto" : "smooth" });
    const last = Math.min(n, i + visible);
    setAnnounce(
      visible > 1 && last > i + 1
        ? `Showing ${i + 1} to ${last} of ${n}`
        : `Showing ${i + 1} of ${n}: ${items[i].short}`,
    );
  }

  const shown = Math.min(n, index + visible);
  const readout = visible > 1 && shown > index + 1 ? `${index + 1}–${shown} / ${n}` : `${index + 1} / ${n}`;

  const btn =
    "flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-volt-400 hover:text-volt-300 disabled:opacity-35 disabled:hover:border-white/25 disabled:hover:text-white";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Services we do most" className="mt-7 md:mt-10 lg:mt-14">
      <div
        ref={track}
        id={`${id}-track`}
        className="deck-track relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:scroll-px-0 md:gap-4 md:px-0 lg:gap-6"
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
              className="relative flex w-[78%] shrink-0 snap-start flex-col border border-white/12 bg-night-950/60 sm:w-[46%] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/3)]"
            >
              <Photo id={s.image} ticks={false} compactLabel sizes="(min-width: 768px) 32vw, 80vw" className="aspect-[16/10]!" />
              <div className="flex flex-1 flex-col p-4 lg:p-6">
                <h3 className="font-sans text-lg leading-snug font-bold text-white lg:text-2xl">
                  <Link href={`/services/${s.slug}`} className="hover:text-volt-300">
                    {s.short}
                  </Link>
                </h3>
                <div id={detailId} className={isOpen ? "deck-detail mt-2 text-[0.92rem] leading-relaxed text-mist-300 lg:text-base" : "hidden"}>
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

      <div className="mt-4 flex items-center justify-between gap-3 lg:mt-6">
        <button type="button" onClick={() => go(index - 1)} disabled={atStart} aria-controls={`${id}-track`} className={btn}>
          <span className="sr-only">Previous service</span>
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
            <path d="M8 1L3 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <ol className="flex items-center" aria-label="Choose a service card">
            {items.map((s, i) => {
              const inView = i >= index && i < index + visible;
              return (
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
                      className={`block h-2 transition-all duration-200 ${inView ? "w-5 bg-volt-400" : "w-2 bg-white/35"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="label-mono min-w-[3.6rem] text-right text-mist-300" aria-hidden="true">
            {readout}
          </p>
        </div>
        <button type="button" onClick={() => go(index + 1)} disabled={atEnd} aria-controls={`${id}-track`} className={btn}>
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
