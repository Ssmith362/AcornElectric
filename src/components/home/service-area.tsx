"use client";

import Link from "next/link";
import { useState } from "react";
import type { Community } from "@/content/areas";

/**
 * "Spokane and eleven communities around it", Option 4 style: a quiet range
 * map with the twelve communities at their approximate real positions, rings
 * at 5, 10 and 20 miles from downtown Spokane and the Spokane River, next to a
 * ruled directory. Pointing at (or focusing, or tapping) a town in either
 * place lights it in both and shows its note and who issues the permit, the
 * one fact that genuinely differs between towns.
 *
 * Positions are approximate town centres projected from latitude/longitude;
 * the caption says so. A slow sweep turns around Spokane; reduced motion
 * stops it (globals.css).
 */

const LAT0 = 47.7;
const LON0 = -117.4;
const KX = 673; // px per degree of longitude at this latitude (1000 × cos 47.7°)
const KY = 1000; // px per degree of latitude
const MILE = KY / 69; // ≈ 14.5 px

const coords: Record<string, [number, number]> = {
  Spokane: [47.658, -117.425],
  "Spokane Valley": [47.673, -117.239],
  "Liberty Lake": [47.675, -117.113],
  Greenacres: [47.667, -117.157],
  "Otis Orchards": [47.703, -117.115],
  Cheney: [47.487, -117.576],
  "Airway Heights": [47.645, -117.593],
  "Medical Lake": [47.573, -117.682],
  "North Spokane": [47.735, -117.41],
  "South Hill": [47.635, -117.4],
  Mead: [47.767, -117.355],
  "Deer Park": [47.954, -117.477],
};

/** Label placement so close neighbours don't collide. */
const label: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  Spokane: { dx: 0, dy: -16, anchor: "middle" },
  "South Hill": { dx: 12, dy: 12, anchor: "start" },
  "North Spokane": { dx: -12, dy: 2, anchor: "end" },
  Mead: { dx: 12, dy: 4, anchor: "start" },
  "Deer Park": { dx: 12, dy: 4, anchor: "start" },
  "Airway Heights": { dx: 0, dy: 22, anchor: "middle" },
  "Medical Lake": { dx: 0, dy: 22, anchor: "middle" },
  Cheney: { dx: 12, dy: 4, anchor: "start" },
  "Spokane Valley": { dx: 0, dy: -14, anchor: "middle" },
  Greenacres: { dx: -4, dy: 23, anchor: "middle" },
  "Liberty Lake": { dx: 4, dy: 23, anchor: "start" },
  "Otis Orchards": { dx: 0, dy: -14, anchor: "middle" },
};

const project = ([lat, lon]: [number, number]) => ({ x: (lon - LON0) * KX, y: (LAT0 - lat) * KY });

const river = [
  [47.69, -117.04],
  [47.681, -117.12],
  [47.678, -117.2],
  [47.672, -117.27],
  [47.665, -117.34],
  [47.661, -117.42],
  [47.672, -117.47],
  [47.71, -117.52],
  [47.77, -117.56],
  [47.83, -117.62],
].map((c) => project(c as [number, number]));

const riverPath = river.reduce((d, p, i) => {
  if (i === 0) return `M${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  const prev = river[i - 1];
  const mx = ((prev.x + p.x) / 2).toFixed(1);
  const my = ((prev.y + p.y) / 2).toFixed(1);
  return `${d} Q${prev.x.toFixed(1)} ${prev.y.toFixed(1)} ${mx} ${my}`;
}, "");

const permitLabel: Record<Community["permit"], string> = {
  city: "City of Spokane permit",
  lni: "Washington L&I permit",
  varies: "City or L&I, by address",
};

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const hrefFor = (c: Community) => (c.page ? `/areas/${c.page}` : c.name === "Spokane" ? "/areas" : `/areas#${slugify(c.name)}`);

function Pin({ permit, active }: { permit: Community["permit"]; active: boolean }) {
  const r = active ? 8 : 5.5;
  if (permit === "city") return <circle r={r} className="fill-copper-500 stroke-night-900 transition-all" strokeWidth={1.4} />;
  if (permit === "varies")
    return (
      <g className="transition-all">
        <circle r={r} className="fill-mist-50 stroke-night-900" strokeWidth={1.4} />
        <path d={`M0 ${-r}A${r} ${r} 0 0 1 0 ${r}Z`} className="fill-copper-500" />
        <circle r={r} fill="none" className="stroke-night-900" strokeWidth={1.4} />
      </g>
    );
  return <circle r={r} className="fill-mist-50 stroke-night-900 transition-all" strokeWidth={1.6} />;
}

export function ServiceArea({ communities }: { communities: Community[] }) {
  const [active, setActive] = useState("Spokane");
  const current = communities.find((c) => c.name === active) ?? communities[0];
  const hub = project(coords.Spokane);
  const towns = communities.filter((c) => coords[c.name]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
      <figure className="relative border border-line bg-mist-50">
        <svg viewBox="-235 -305 535 560" className="block h-auto w-full" role="img" aria-labelledby="area-map-title">
          <title id="area-map-title">Map of Spokane and the eleven communities around it that Acorn Electric serves</title>
          <defs>
            <linearGradient id="sweep-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-copper-500)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--color-copper-500)" stopOpacity=".16" />
            </linearGradient>
          </defs>

          {/* range rings */}
          <g fill="none" className="stroke-night-900/15" strokeWidth={1}>
            {[5, 10, 20].map((mi) => (
              <circle key={mi} cx={hub.x} cy={hub.y} r={mi * MILE} strokeDasharray={mi === 20 ? "3 5" : undefined} />
            ))}
            <path d={`M${hub.x} -305V255M-235 ${hub.y}H300`} className="stroke-night-900/8" />
          </g>
          {/* ring labels sit in the empty south-east quadrant */}
          <g className="fill-ink-mute" fontSize={10} fontWeight={500}>
            {([[5, 70], [10, 55], [20, 30]] as const).map(([mi, deg]) => {
              const a = (deg * Math.PI) / 180;
              return (
                <text key={mi} x={(hub.x + mi * MILE * Math.cos(a) + 5).toFixed(1)} y={(hub.y + mi * MILE * Math.sin(a) + 3).toFixed(1)}>
                  {mi} mi
                </text>
              );
            })}
          </g>

          {/* slow sweep around Spokane */}
          <g className="area-sweep" style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
            <path d={`M${hub.x} ${hub.y}L${hub.x + 320} ${hub.y}A320 320 0 0 0 ${(hub.x + 320 * Math.cos(-0.5)).toFixed(1)} ${(hub.y + 320 * Math.sin(-0.5)).toFixed(1)}Z`} fill="url(#sweep-fade)" />
          </g>

          {/* Spokane River */}
          <path d={riverPath} fill="none" className="stroke-night-500/45" strokeWidth={5} strokeLinecap="round" />
          <text x={42} y={56} textAnchor="middle" className="fill-night-500" fontSize={10} fontStyle="italic">
            Spokane River
          </text>

          {/* communities */}
          {towns.map((c) => {
            const p = project(coords[c.name]);
            const l = label[c.name];
            const on = c.name === active;
            const hubTown = c.name === "Spokane";
            return (
              <Link
                key={c.name}
                href={hrefFor(c)}
                aria-label={`${c.name}: ${permitLabel[c.permit]}`}
                onMouseEnter={() => setActive(c.name)}
                onFocus={() => setActive(c.name)}
                className="outline-none"
              >
                <g transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
                  {on ? <circle r={15} className="fill-copper-500/15" /> : null}
                  <Pin permit={c.permit} active={on} />
                  <text
                    x={l.dx}
                    y={l.dy}
                    textAnchor={l.anchor}
                    className={`font-sans transition-colors ${on ? "fill-copper-600" : "fill-night-900"} ${hubTown || on ? "" : "max-sm:hidden"}`}
                    fontSize={hubTown ? 15 : 12}
                    fontWeight={hubTown || on ? 700 : 500}
                  >
                    {c.name}
                  </text>
                </g>
              </Link>
            );
          })}
        </svg>
        <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3 text-[0.72rem] text-ink-mute sm:px-5">
          <span className="flex items-center gap-2">
            <svg viewBox="-7 -7 14 14" className="h-3 w-3" aria-hidden="true"><circle r={5.5} className="fill-copper-500 stroke-night-900" strokeWidth={1.4} /></svg>
            City of Spokane permit
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="-7 -7 14 14" className="h-3 w-3" aria-hidden="true"><circle r={5.5} className="fill-mist-50 stroke-night-900" strokeWidth={1.6} /></svg>
            Washington L&amp;I permit
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="-7 -7 14 14" className="h-3 w-3" aria-hidden="true"><Pin permit="varies" active={false} /></svg>
            Depends on address
          </span>
          <span className="sm:ml-auto">Approximate locations</span>
        </figcaption>
      </figure>

      <div className="flex flex-col">
        <ul className="grid grid-cols-2 gap-x-5 border-t border-[#c7bead]" aria-label="Communities we serve">
          {communities.map((c) => {
            const on = c.name === active;
            return (
              <li key={c.name} className="border-b border-[#c7bead]">
                <Link
                  href={hrefFor(c)}
                  onMouseEnter={() => setActive(c.name)}
                  onFocus={() => setActive(c.name)}
                  className={`flex min-h-12 items-center justify-between gap-2 py-2.5 text-[0.85rem] transition-colors ${on ? "font-semibold text-copper-600" : "text-ink hover:text-copper-600"}`}
                >
                  <span className="flex items-center gap-2.5">
                    <svg viewBox="-7 -7 14 14" className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
                      <Pin permit={c.permit} active={false} />
                    </svg>
                    {c.name}
                  </span>
                  <span aria-hidden="true" className="text-copper-600">↗</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* The town you're pointing at. Below the list, so its changing height never moves the rows under the pointer. */}
        <div className="mt-6 border-l-2 border-copper-500 bg-mist-50 px-5 py-4 lg:mt-7" aria-live="polite">
          <p className="label-mono text-copper-600">{permitLabel[current.permit]}</p>
          <p className="mt-1.5 font-display text-[1.6rem] leading-tight font-semibold text-night-900">{current.name}</p>
          <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-soft">{current.note}</p>
          {current.page ? (
            <Link href={`/areas/${current.page}`} className="mt-2 inline-flex min-h-11 items-center gap-2.5 text-[0.8rem] font-semibold text-copper-600 hover:text-night-900">
              Electrician in {current.name} <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>

      </div>
    </div>
  );
}
