"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Collapsible (show more / show fewer), after the shadcn/Radix Collapsible:
 * a header row with a toggle button, content that is always visible, and
 * more content behind the toggle. The button carries aria-expanded and
 * aria-controls; hidden content is `inert`, so it can't be tabbed into, but
 * it stays in the server HTML for crawlers. The height animates with a
 * grid-template-rows 0fr→1fr transition (cut to ~0ms by reduced motion).
 */
export function Collapsible({
  title,
  showLabel,
  hideLabel = "Show fewer",
  always = null,
  children,
  className = "",
}: {
  title?: ReactNode;
  showLabel: string;
  hideLabel?: string;
  /** Always visible, above the collapsible part. */
  always?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <div className={`flex items-center gap-4 border-b border-white/15 pb-2 ${title ? "justify-between" : "justify-start"}`}>
        {title ? <p className="label-mono text-mist-300">{title}</p> : null}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex min-h-11 items-center gap-2.5 border border-white/25 px-3 text-sm font-semibold text-white transition-colors hover:border-volt-400 hover:text-volt-300"
        >
          {open ? hideLabel : showLabel}
          <svg viewBox="0 0 12 16" className="h-4 w-3" aria-hidden="true">
            <path
              d={open ? "M2 2l4 4 4-4M2 14l4-4 4 4" : "M2 6l4-4 4 4M2 10l4 4 4-4"}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>
      </div>
      {always}
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
