"use client";

import { useId, useState } from "react";

/**
 * Accordion for secondary detail, following the W3C APG accordion pattern
 * (https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):
 *   heading > button[aria-expanded][aria-controls]  +  role="region" panel.
 * Enter/Space toggle (native button); Tab moves between headers.
 *
 * `collapse="mobile"` (default): collapsible below the `lg` breakpoint only.
 * On desktop every panel is open and the header renders as a plain heading,
 * so desktop and mobile carry the same content; mobile just stacks it shorter.
 * `collapse="always"`: collapsible at every width.
 *
 * Every panel's content is in the server-rendered HTML. Toggling only changes
 * CSS display; nothing is fetched on click.
 */
export type AccordionItem = { title: string; body: React.ReactNode };

export function Accordion({
  items,
  headingLevel = 3,
  collapse = "mobile",
  tone = "mist",
  className = "",
}: {
  items: AccordionItem[];
  /** Extra classes for the list, e.g. a two-column grid on desktop. */
  className?: string;
  headingLevel?: 2 | 3 | 4;
  collapse?: "mobile" | "always";
  tone?: "mist" | "night";
}) {
  const base = useId();
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const night = tone === "night";
  const mobileOnly = collapse === "mobile";

  const rule = night ? "border-white/12" : "border-ink/15";
  const titleCls = `font-sans text-[1.05rem] font-semibold leading-snug sm:text-lg ${night ? "text-white" : "text-ink"}`;
  const bodyCls = `leading-relaxed ${night ? "text-mist-300" : "text-ink-soft"}`;

  return (
    <div className={`border-t ${rule} ${className}`}>
      {items.map((item, i) => {
        const expanded = !!open[i];
        const btnId = `${base}-h${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.title} className={`border-b ${rule}`}>
            <H className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
                className={`flex min-h-12 w-full items-center justify-between gap-4 py-3.5 text-left ${mobileOnly ? "lg:hidden" : ""}`}
              >
                <span className={titleCls}>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={`relative h-3.5 w-3.5 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-3.5 after:absolute after:top-0 after:left-1/2 after:h-3.5 after:w-px after:transition-transform ${
                    night ? "before:bg-volt-400 after:bg-volt-400" : "before:bg-copper-600 after:bg-copper-600"
                  } ${expanded ? "after:scale-y-0" : ""}`}
                />
              </button>
              {mobileOnly ? <span className={`hidden pt-5 lg:block ${titleCls}`}>{item.title}</span> : null}
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`${expanded ? "acc-panel-open block" : "hidden"} ${mobileOnly ? "lg:block" : ""} pb-5 ${mobileOnly ? "lg:pt-2" : ""}`}
            >
              <div className={bodyCls}>{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
