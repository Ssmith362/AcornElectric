"use client";

import Link from "next/link";
import { useState } from "react";
import { AreaMap } from "@/components/sections/area-map";
import { communities } from "@/content/areas";

/**
 * "Where we work" below the desktop breakpoint: pick a community from a row of
 * chips, see it lit up on the service-area diagram directly beneath, and get
 * that community's note plus the next step.
 *
 * The chips are native radio buttons (visually restyled), so they come with
 * standard keyboard behaviour for free: Tab into the group, arrow keys to move
 * and select, and screen readers announce "radio, n of 12, checked".
 */
const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export function AreaSelector() {
  const [selected, setSelected] = useState("Spokane");
  const c = communities.find((x) => x.name === selected) ?? communities[0];

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8">
      <div>
        <fieldset>
          <legend className="label-mono mb-3 text-mist-300">Choose your area</legend>
          <div className="flex flex-wrap gap-2">
            {communities.map((x) => (
              <label
                key={x.name}
                className="inline-flex min-h-10 cursor-pointer items-center border border-white/20 px-3 text-[0.9rem] font-medium text-mist-100 transition-colors hover:border-volt-400/70 has-[:checked]:border-volt-400 has-[:checked]:bg-volt-400 has-[:checked]:text-night-950 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt-400"
              >
                <input
                  type="radio"
                  name="area"
                  value={x.name}
                  checked={selected === x.name}
                  onChange={() => setSelected(x.name)}
                  className="sr-only"
                />
                {x.name}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Tablet: the details sit under the chips, beside the map. */}
        <AreaDetail c={c} className="mt-5 hidden md:block" />
      </div>

      <div>
        <AreaMap selected={selected} interactive={false} titleId="area-selector-map-title" />
        {/* Phone: the details sit right under the map. */}
        <AreaDetail c={c} className="mt-3 md:hidden" />
      </div>
    </div>
  );
}

function AreaDetail({ c, className = "" }: { c: (typeof communities)[number]; className?: string }) {
  return (
    <div className={`border-l-2 border-volt-400 pl-4 ${className}`} aria-live="polite">
      <p className="font-display text-xl text-white">{c.name}</p>
      <p className="mt-1 text-[0.95rem] leading-relaxed text-mist-300">{c.note}</p>
      {c.page ? (
        <Link
          href={`/areas/${c.page}`}
          className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-volt-300 underline underline-offset-4 hover:text-volt-200"
        >
          Electrician in {c.name} <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <Link
          href={c.name === "Spokane" ? "/areas" : `/areas#${slug(c.name)}`}
          className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-volt-300 underline underline-offset-4 hover:text-volt-200"
        >
          {c.name === "Spokane" ? "All service areas" : `${c.name} on the service-area page`} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
