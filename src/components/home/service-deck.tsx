"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Photo } from "@/components/ui/photo";
import type { ImageKey } from "@/content/images";

export type DeckItem = { slug: string; name: string; short: string; problem: string; lede: string; image: ImageKey };

/**
 * "What we do most": a side-scrolling card rail on the cream surface, at every
 * screen size, always with a peek of the next card so it reads as scrollable:
 * one card on phones, two on tablets, three on desktop.
 *
 * Built on CSS scroll-snap, so swiping, trackpads and shift+wheel all work
 * natively. Previous/Next buttons, dot buttons and a position readout drive
 * it too. Accessibility follows the APG carousel pattern: a labelled region
 * with aria-roledescription="carousel", each card a "slide" group labelled
 * "n of N", a polite live region announcing the position after a button
 * press, and no auto-rotation. Each card's short detail is a disclosure
 * button (aria-expanded); the detail stays in the HTML either way. Nothing
 * depends on hover. `titleAs` sets the card heading level for the outline.
 */
export function ServiceDeck({ items, titleAs: Title = "h3" }: { items: DeckItem[]; titleAs?: "h3" | "h4" }) {
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
    // Whole cards in view; the peek of the next one doesn't count.
    const css = getComputedStyle(el);
    const inner = el.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight) + parseFloat(css.columnGap || "0");
    const whole = Math.max(1, Math.min(n, Math.floor(inner / step + 0.05)));
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setIndex(end ? Math.max(best, n - whole) : best);
    setVisible(whole);
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
    "flex h-11 w-11 items-center justify-center border border-line text-night-900 transition-colors hover:border-night-900 hover:bg-night-900 hover:text-mist-100 disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-night-900";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Services we do most" className="mt-8 sm:mt-11">
      <div
        ref={track}
        id={`${id}-track`}
        className="deck-track relative -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:gap-4 lg:mx-0 lg:scroll-px-0 lg:gap-5 lg:px-0"
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
              className="group/card relative flex w-[82%] shrink-0 snap-start flex-col border border-line bg-mist-50 transition-colors hover:border-night-900/40 sm:w-[44%] md:w-[calc((100%-2rem)/2.4)] lg:w-[calc((100%-2.5rem)/3.2)]"
            >
              <div className="relative overflow-hidden">
                <Photo id={s.image} ticks={false} compactLabel sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 82vw" className="aspect-[16/10]! [&_img]:transition-transform [&_img]:duration-500 group-hover/card:[&_img]:scale-[1.025]" />
                <span aria-hidden="true" className="absolute top-0 left-0 bg-night-900 px-3 py-2 text-[0.7rem] font-medium tracking-[0.08em] text-volt-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-5 pt-5 pb-3 lg:px-6 lg:pt-6">
                <Title className="font-display text-[1.65rem] leading-[1.02] font-semibold text-night-900">
                  <Link href={`/services/${s.slug}`} className="block hover:text-copper-600">
                    {s.short}
                  </Link>
                </Title>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed font-medium text-[#2f3f34]">{s.problem}</p>
                <div id={detailId} className={isOpen ? "deck-detail mt-3 border-l border-volt-500 pl-3 text-[0.85rem] leading-relaxed text-ink-mute" : "hidden"}>
                  {s.lede}
                </div>
                <div className="flex-1" aria-hidden="true" />
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-1.5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={() => setOpen((o) => ({ ...o, [s.slug]: !o[s.slug] }))}
                    className="inline-flex min-h-11 items-center gap-2 text-[0.8rem] font-semibold text-ink-mute hover:text-night-900"
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
                    className="inline-flex min-h-11 items-center gap-2.5 text-[0.8rem] font-semibold text-copper-600 hover:text-night-900"
                  >
                    Details<span className="sr-only">: {s.name}</span> <span aria-hidden="true" className="text-base">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 lg:mt-7">
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
                      className={`block h-[3px] transition-all duration-200 ${inView ? "w-6 bg-copper-500" : "w-3 bg-night-900/20"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="label-mono min-w-[3.6rem] text-right text-ink-mute" aria-hidden="true">
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
