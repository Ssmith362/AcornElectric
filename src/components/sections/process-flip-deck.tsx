"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type Step = { title: string; body: string };
const MOBILE = "(max-width: 767px) and (min-height: 650px)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const clamp = (value: number) => Math.max(0, Math.min(1, value));

function subscribe(update: () => void) {
  const mobile = window.matchMedia(MOBILE);
  const reduced = window.matchMedia(REDUCED);
  mobile.addEventListener("change", update);
  reduced.addEventListener("change", update);
  return () => {
    mobile.removeEventListener("change", update);
    reduced.removeEventListener("change", update);
  };
}

/** Same peel-and-straighten deck as Bartkus, enhanced only on phones. */
export function ProcessFlipDeck({ steps, aside }: { steps: Step[]; aside: React.ReactNode }) {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE).matches && !window.matchMedia(REDUCED).matches,
    () => false,
  );
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const node = track.current;
    if (!node || !enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      // The sticky stage starts immediately below the 72px mobile header.
      const stage = node.querySelector<HTMLElement>(".process-deck-pin");
      const travel = rect.height - (stage?.offsetHeight ?? window.innerHeight);
      const progress = clamp((72 - rect.top) / Math.max(1, travel));
      const band = 0.76 / Math.max(1, steps.length - 1);
      let lifted = 0;
      cards.current.forEach((card, i) => {
        if (!card) return;
        const exit = i === steps.length - 1 ? 0 : clamp((progress - 0.1 - i * band) / band);
        const rest = Math.max(0, i - lifted);
        card.style.setProperty("--deck-x", `${-8 * exit}vw`);
        card.style.setProperty("--deck-y", `calc(${-64 * exit}svh + ${rest * 7}px)`);
        card.style.setProperty("--deck-rotation", `${rest * 2.5 + (-18 - rest * 2.5) * exit}deg`);
        card.style.setProperty("--deck-opacity", String(1 - clamp((exit - 0.5) / 0.4)));
        lifted += exit;
      });
      node.dataset.active = String(Math.min(steps.length - 1, Math.floor(lifted + 0.5)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [enabled, steps.length]);

  return (
    <div ref={track} className="process-deck-track" data-deck={enabled ? "on" : "off"} data-active="0">
      <div className="process-deck-pin">
        <div className="container-x process-deck-layout grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[clamp(2rem,5vw,4.5rem)]">
          <div className="process-deck-aside">
            {aside}
            <div className="process-deck-progress" aria-hidden="true">{steps.map((step) => <span key={step.title} />)}</div>
          </div>
          <ol className="process-deck-cards border-t border-line">
            {steps.map((step, i) => (
              <li key={step.title} ref={(node) => { cards.current[i] = node; }} className="process-deck-card grid grid-cols-[2.6rem_1fr] gap-3.5 border-b border-line py-5 sm:py-6" style={{ zIndex: steps.length - i }}>
                <span aria-hidden="true" className="process-deck-number pt-1.5 text-[0.7rem] font-medium tracking-[0.08em] text-copper-600">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.55rem] leading-tight text-night-900"><span className="sr-only">Step {i + 1}: </span>{step.title}</h3>
                  <p className="mt-1 max-w-[52ch] text-[0.85rem] leading-relaxed text-ink-mute">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
