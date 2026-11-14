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
  const [desktopHover, setDesktopHover] = useState<string | null>(null);
  const [desktopFocus, setDesktopFocus] = useState<string | null>(null);
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
    "flex h-11 w-11 items-center justify-center border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-volt-400 disabled:opacity-35 disabled:hover:border-ink/25 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Services we do most" className="mt-5 sm:mt-6">
      <div className="xl:hidden">
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
              className="relative flex w-[80%] shrink-0 snap-start flex-col border border-ink/15 bg-peach-50 sm:w-[44%] md:w-[calc((100%-2rem)/2.4)] lg:w-[calc((100%-2.5rem)/3.2)]"
            >
              <Photo id={s.image} ticks={false} compactLabel sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 80vw" className="aspect-[16/10]!" />
              <div className="flex flex-1 flex-col p-4 lg:p-6">
                <Title className="font-sans text-lg leading-snug font-bold text-ink lg:text-xl">
                  <Link href={`/services/${s.slug}`} className="block hover:text-copper-700">
                    {s.short}
                  </Link>
                </Title>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{s.problem}</p>
                <div id={detailId} className={isOpen ? "deck-detail mt-2 border-l-2 border-volt-500 pl-3 text-[0.92rem] leading-relaxed text-ink-soft" : "hidden"}>
                  {s.lede}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={() => setOpen((o) => ({ ...o, [s.slug]: !o[s.slug] }))}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-copper-700 hover:text-ink"
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
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-ink underline decoration-volt-500 decoration-2 underline-offset-4 hover:text-copper-700"
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
                      className={`block h-2 transition-all duration-200 ${inView ? "w-5 bg-ink" : "w-2 bg-ink/25"}`}
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
      </div>
      <div className="hidden h-[25rem] gap-2 xl:flex" role="list" aria-label="Featured services">
        {items.map((service) => {
          const expanded = desktopHover === service.slug || desktopFocus === service.slug;
          return (
            <article
              key={service.slug}
              role="listitem"
              onMouseEnter={() => setDesktopHover(service.slug)}
              onMouseLeave={(event) => {
                setDesktopHover(null);
                if (event.currentTarget.contains(document.activeElement)) return;
              }}
              onFocusCapture={() => setDesktopFocus(service.slug)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopFocus(null);
              }}
              style={{ flexGrow: expanded ? 3 : 1 }}
              className="group relative min-w-0 flex-1 overflow-hidden border border-ink/15 bg-night-950 transition-[flex-grow,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:shadow-[0_18px_40px_rgb(8_38_26/.22)] focus-within:shadow-[0_18px_40px_rgb(8_38_26/.22)]"
            >
              <Photo id={service.image} ticks={false} compactLabel sizes="(min-width: 1280px) 42vw, 100vw" className="absolute inset-0 h-full w-full" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-night-950/5 transition-colors duration-500 group-hover:from-night-950/95 group-focus-within:from-night-950/95" />
              <div className="absolute inset-x-0 bottom-0 p-4 2xl:p-5">
                <Title className="font-display text-lg leading-tight font-semibold text-white drop-shadow-sm 2xl:text-xl">
                  <Link href={`/services/${service.slug}`} className="inline-block rounded-sm focus-visible:outline-offset-4">
                    {service.short}
                  </Link>
                </Title>
                <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ${expanded ? "mt-2 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-[34ch] text-sm leading-relaxed text-mist-100">{service.problem}</p>
                    <Link href={`/services/${service.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-volt-300 underline decoration-volt-400/70 underline-offset-4 hover:text-white">
                      Explore {service.name}<span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-volt-400/80 opacity-60 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" />
              <span aria-hidden="true" className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-volt-400/80 opacity-60 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" />
            </article>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
