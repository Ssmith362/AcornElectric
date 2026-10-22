"use client";

import { useEffect, useRef, useState } from "react";

type Step = { title: string; body: string };

/**
 * "How we work" as a pinned stack of cards, like the "From call to launch"
 * section on the Flourish Now Digital site. The section is taller than the
 * screen; the card stack stays put while you scroll, and the front card tips
 * away to reveal the next one while the dashes under the intro fill in.
 *
 * Progressive: the server HTML (and anyone with reduced motion, or no JS) gets a
 * plain list of four cards. Only after mount, and only if motion is allowed, do
 * we switch on data-live and start writing one number, --s (0 = first card on
 * top … N-1 = last card), which the CSS under "PROCESS DECK" in globals.css
 * turns into every transform. All four steps stay in the DOM either way.
 */
export function ProcessDeck({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  const last = steps.length - 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setLive(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !live) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = el.offsetHeight - window.innerHeight;
      const t = travel > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel)) : 0;
      el.style.setProperty("--s", (t * last).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [live, last]);

  return (
    <section
      ref={root}
      className="pdeck on-night bg-night-900 text-white"
      data-live={live ? "true" : undefined}
      style={{ ["--n" as string]: steps.length }}
      aria-labelledby="process-title"
    >
      <div className="pdeck-pin">
        <div className="container-x grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-5">
            <p className="label-mono flex items-center gap-3 text-mist-300">
              <span aria-hidden="true" className="h-px w-8 bg-volt-400/60" />
              How we work
            </p>
            <h2 id="process-title" className="mt-3 text-[2.1rem] leading-[1.04] font-bold text-white sm:mt-5 sm:text-5xl lg:text-[3.6rem]">
              We&apos;d rather do it once.
            </h2>
            <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-mist-300 sm:text-lg">
              The same four steps on every job, big or small.
            </p>
            <div aria-hidden="true" className="pdeck-dashes mt-6 hidden gap-2">
              {steps.map((s, i) => (
                <span key={s.title} className="pdeck-dash" style={{ ["--i" as string]: i }}>
                  <span />
                </span>
              ))}
            </div>
          </header>

          <ol className="pdeck-stack lg:col-span-7">
            {steps.map((s, i) => (
              <li key={s.title} className="pdeck-card" style={{ ["--i" as string]: i, zIndex: steps.length - i }}>
                <p aria-hidden="true" className="font-display text-5xl leading-none text-copper-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-sans text-xl leading-snug font-bold text-ink sm:text-2xl">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <div aria-hidden="true" className="mt-4 h-[3px] bg-gradient-to-r from-copper-500 to-volt-400" />
                <p className="mt-4 leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
