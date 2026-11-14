"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Photo } from "@/components/ui/photo";
import type { ImageKey } from "@/content/images";

export type DeckItem = { slug: string; name: string; short: string; problem: string; image: ImageKey };

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
 * press, and no auto-rotation. Headings and Details link directly to the full
 * service pages. Nothing depends on hover. `titleAs` sets the card heading
 * level for the outline.
 */
export function ServiceDeck({ items, titleAs: Title = "h3" }: { items: DeckItem[]; titleAs?: "h3" | "h4" }) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [announce, setAnnounce] = useState("");
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
  const number = (value: number) => String(value).padStart(2, "0");
  const readout = visible > 1 && shown > index + 1 ? `${number(index + 1)}–${number(shown)} / ${number(n)}` : `${number(index + 1)} / ${number(n)}`;

  const btn =
    "flex h-11 w-11 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-volt-400 disabled:opacity-35 disabled:hover:border-ink/25 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Services we do most" className="mt-5 sm:mt-6">
      <div
        ref={track}
        id={`${id}-track`}
        className="deck-track relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pt-2 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-6 lg:px-0"
      >
        {items.map((s, i) => (
            <div
              key={s.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${s.short}`}
              className="service-card group relative flex w-[84%] shrink-0 snap-start flex-col border border-ink/12 bg-[#fffaf2] sm:w-[44%] md:w-[calc((100%-2rem)/2.4)] lg:w-[calc((100%-3rem)/3.2)]"
            >
              <Link href={`/services/${s.slug}`} className="service-card-image relative block overflow-hidden" aria-label={`Explore ${s.name}`} tabIndex={-1}>
                <Photo id={s.image} ticks={false} compactLabel sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 84vw" className="aspect-[16/11]!" />
                <span aria-hidden="true" className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center border border-white/40 bg-night-950/70 text-white backdrop-blur-sm">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M4 16 16 4M4 4h12v12" stroke="currentColor" strokeWidth="1.4" /></svg>
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <p aria-hidden="true" className="label-mono mb-3 text-copper-600">{number(i + 1)}</p>
                <Title className="text-[1.7rem] leading-[1.08] font-semibold text-night-900 lg:text-[1.85rem]">
                  <Link href={`/services/${s.slug}`} className="block hover:text-copper-700">
                    {s.short}
                  </Link>
                </Title>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{s.problem}</p>
                <div className="mt-auto pt-6">
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex min-h-11 items-center justify-between border-t border-ink/15 pt-3 text-[0.8rem] font-semibold text-night-900 hover:text-copper-700"
                  >
                    View service<span className="sr-only">: {s.name}</span>
                    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none"><path d="M3 10h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
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
                    className="flex h-11 w-6 items-center justify-center sm:w-9"
                  >
                    <span className="sr-only">Show {s.short}</span>
                    <span
                      aria-hidden="true"
                      className={`block h-px w-5 transition-colors duration-200 sm:w-8 ${inView ? "bg-copper-600" : "bg-ink/20"}`}
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
