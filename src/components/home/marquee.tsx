"use client";

import { useId, useState } from "react";

/**
 * Review ribbons pause on touch, click, hover or keyboard interaction.
 *
 * - Paused, the ribbons stop, the full review text shows (no 3-line clamp) and
 *   the row becomes a scrollable region you can swipe or arrow through.
 * - Hover (on devices that have it) and keyboard focus inside also pause it.
 * - prefers-reduced-motion: the ribbons never move and are scrollable from the
 *   start.
 * - Without JavaScript the CSS animation still runs and hover/focus pause it.
 */
export function PausableMarquee({ children, label }: { children: React.ReactNode; label: string }) {
  const [paused, setPaused] = useState(false);
  const id = useId();
  return (
    <div className="mt-6 sm:mt-8">
      <p id={id} className="sr-only">Select the reviews, or press Enter or Space, to pause or resume. Reviews also stop while hovered or focused.</p>
      <div
        className="marquee grid gap-4"
        data-paused={paused ? "true" : "false"}
        role="region"
        aria-label={label}
        aria-describedby={id}
        tabIndex={0}
        onClick={() => setPaused((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setPaused((value) => !value);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
