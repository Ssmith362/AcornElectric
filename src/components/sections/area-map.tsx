import Link from "next/link";
import { publishedAreas as areas } from "@/content/areas";

/**
 * Abstract, not-to-scale diagram of the Spokane area as a circuit: Spokane is
 * the main panel, each served community a node on a trace. Nodes link to the
 * area pages.
 */
const pos: Record<string, { x: number; y: number; lx: number; ly: number; anchor: "start" | "middle" | "end" }> = {
  spokane: { x: 190, y: 200, lx: 190, ly: 180, anchor: "middle" },
  "north-spokane": { x: 200, y: 120, lx: 186, ly: 124, anchor: "end" },
  mead: { x: 236, y: 52, lx: 250, ly: 56, anchor: "start" },
  "spokane-valley": { x: 330, y: 206, lx: 330, ly: 188, anchor: "middle" },
};

export function AreaMap() {
  const nodes = [{ slug: "spokane", name: "Spokane" }, ...areas.map((a) => ({ slug: a.slug, name: a.name }))];
  return (
    <figure className="relative">
      <svg viewBox="0 0 420 270" className="h-auto w-full" role="group" aria-labelledby="map-title">
        <title id="map-title">Diagram of Acorn Electric&apos;s service area around Spokane (not to scale)</title>
        {/* river */}
        <path
          d="M10 226c40-8 70-30 110-26s60 16 92 10 70-10 110-4 70 10 92 6"
          fill="none"
          stroke="var(--color-copper-500)"
          strokeOpacity=".35"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text x="16" y="250" className="fill-copper-300" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1.5">
          SPOKANE RIVER
        </text>
        {/* traces */}
        <g fill="none" stroke="var(--color-mist-300)" strokeOpacity=".35" strokeWidth="1.2">
          <path d="M190 200V140l10-20" />
          <path d="M200 120v-36l36-32" />
          <path d="M190 200h70l20 6h50" />
        </g>
        <g fill="none" stroke="var(--color-volt-400)" strokeWidth="1.6" className="flow">
          <path d="M190 200V140l10-20" />
          <path d="M200 120v-36l36-32" />
          <path d="M190 200h70l20 6h50" />
        </g>
        {nodes.map((n) => {
          const p = pos[n.slug];
          if (!p) return null;
          const main = n.slug === "spokane";
          return (
            <Link key={n.slug} href={main ? "/areas" : `/areas/${n.slug}`}>
              <g className="group">
                <rect
                  x={p.x - (main ? 9 : 6)}
                  y={p.y - (main ? 9 : 6)}
                  width={main ? 18 : 12}
                  height={main ? 18 : 12}
                  fill={main ? "var(--color-volt-400)" : "var(--color-night-900)"}
                  stroke="var(--color-volt-400)"
                  strokeWidth="1.6"
                />
                <text
                  x={p.lx}
                  y={p.ly}
                  textAnchor={p.anchor}
                  fontSize={main ? 15 : 12}
                  fontWeight={600}
                  fill="white"
                  className="font-display group-hover:fill-[var(--color-volt-300)]"
                >
                  {n.name}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>
      <figcaption className="label-mono mt-2 text-right text-[0.6rem] text-mist-400">Diagram · not to scale</figcaption>
    </figure>
  );
}
