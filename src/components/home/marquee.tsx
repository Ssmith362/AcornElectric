"use client";

import { useState } from "react";

/**
 * Wraps the moving review ribbons with a visible Pause/Play button. Content
 * that moves for more than five seconds needs a way to stop it (WCAG 2.2.2).
 *
 * - The button works with mouse, touch and keyboard, and says what it will do.
 * - Paused, the ribbons stop, the full review text shows (no 3-line clamp) and
 *   the row becomes a scrollable region you can swipe or arrow through.
 * - Hover (on devices that have it) and keyboard focus inside also pause it.
 * - prefers-reduced-motion: the ribbons never move and are scrollable from the
 *   start, so the button isn't needed and is hidden (globals.css).
 * - Without JavaScript the CSS animation still runs and hover/focus pause it.
 */
export function PausableMarquee({ children, label }: { children: React.ReactNode; label: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="mt-6 sm:mt-8">
      <div className="container-x mb-3 flex">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="marquee-toggle inline-flex min-h-11 items-center gap-2.5 border border-white/25 px-4 text-sm font-semibold text-mist-100 hover:border-volt-400 hover:text-white"
        >
          {paused ? (
            <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
              <path d="M2.5 1.5v9l8-4.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
              <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" />
            </svg>
          )}
          {paused ? "Play reviews" : "Pause reviews"}
        </button>
      </div>
      <div
        className="marquee grid gap-4"
        data-paused={paused ? "true" : "false"}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
