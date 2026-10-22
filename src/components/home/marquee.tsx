"use client";

import { useState } from "react";

/**
 * Wraps the moving review ribbons with a Pause/Play control. Auto-moving
 * content that runs longer than five seconds needs a way to stop it
 * (WCAG 2.2.2). Hover and keyboard focus also pause it (globals.css); reduced
 * motion turns the movement off entirely and makes the ribbons scrollable.
 */
export function PausableMarquee({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="mt-6 sm:mt-8">
      <div className="container-x mb-3 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 border border-ink/25 px-4 text-sm font-semibold text-ink hover:bg-ink/5"
        >
          <span aria-hidden="true" className="flex h-3 w-3 items-center justify-center">
            {paused ? (
              <svg viewBox="0 0 10 12" className="h-3 w-2.5" fill="currentColor"><path d="M0 0l10 6-10 6z" /></svg>
            ) : (
              <svg viewBox="0 0 10 12" className="h-3 w-2.5" fill="currentColor"><path d="M0 0h3.5v12H0zM6.5 0H10v12H6.5z" /></svg>
            )}
          </span>
          {paused ? "Play reviews" : "Pause reviews"}
        </button>
      </div>
      <div className="marquee grid gap-4" data-paused={paused ? "true" : undefined}>
        {children}
      </div>
    </div>
  );
}
