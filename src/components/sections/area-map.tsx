import Link from "next/link";
import { communities } from "@/content/areas";

/**
 * Abstract, not-to-scale diagram of the Spokane area as a circuit: Spokane is
 * the main panel, each served community a node on a trace. Communities with a
 * dedicated page link to it; the rest are labelled but not linked.
 */
type Pos = { x: number; y: number; anchor?: "start" | "middle" | "end"; dx?: number; dy?: number };
const HUB = { x: 175, y: 190 };
const pos: Record<string, Pos> = {
  "North Spokane": { x: 190, y: 125, anchor: "end", dx: -11, dy: 4 },
  Mead: { x: 232, y: 70, anchor: "start", dx: 11, dy: 4 },
  "Deer Park": { x: 190, y: 26, anchor: "start", dx: 11, dy: 4 },
  "Airway Heights": { x: 85, y: 168, anchor: "middle", dx: 0, dy: -12 },
  "Medical Lake": { x: 40, y: 200, anchor: "start", dx: 0, dy: 22 },
  Cheney: { x: 105, y: 238, anchor: "middle", dx: 0, dy: 22 },
  "South Hill": { x: 215, y: 238, anchor: "start", dx: 11, dy: 4 },
  "Spokane Valley": { x: 285, y: 190, anchor: "middle", dx: 0, dy: -13 },
  Greenacres: { x: 345, y: 150, anchor: "middle", dx: 0, dy: -13 },
  "Otis Orchards": { x: 392, y: 100, anchor: "end", dx: 0, dy: -13 },
  "Liberty Lake": { x: 395, y: 190, anchor: "end", dx: 0, dy: 24 },
};

export function AreaMap() {
  const nodes = communities.filter((c) => c.name !== "Spokane" && pos[c.name]);
  const route = (n: Pos) => `M${HUB.x} ${HUB.y}H${n.x}V${n.y}`;
  return (
    <figure className="relative">
      <svg viewBox="0 0 420 270" className="h-auto w-full" role="group" aria-labelledby="map-title">
        <title id="map-title">Diagram of Acorn Electric&apos;s service area: Spokane and eleven nearby communities (not to scale)</title>
        {/* river */}
        <path
          d="M10 214c40-8 70-30 110-26s60 16 92 10 70-10 110-4 70 10 92 6"
          fill="none"
          stroke="var(--color-copper-500)"
          strokeOpacity=".35"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* dim traces */}
        <g fill="none" stroke="var(--color-mist-300)" strokeOpacity=".3" strokeWidth="1.2">
          {nodes.map((c) => <path key={c.name} d={route(pos[c.name])} />)}
        </g>
        {/* a bolt runs out to each town, and the town lights up like a bulb when it arrives */}
        <g fill="none" stroke="var(--color-volt-400)" strokeWidth="1.8" strokeLinecap="round">
          {nodes.map((c, i) => (
            <path
              key={c.name}
              d={route(pos[c.name])}
              pathLength={100}
              className="map-bolt"
              style={{ animationDelay: `${(i * 0.85).toFixed(2)}s` }}
            />
          ))}
        </g>
        {nodes.map((c, i) => {
          const p = pos[c.name];
          const node = (
            <g className="group">
              <circle cx={p.x} cy={p.y} r={7} className="map-bulb" style={{ animationDelay: `${(i * 0.85).toFixed(2)}s` }} />
              <text
                x={p.x + (p.dx ?? 0)}
                y={p.y + (p.dy ?? 0)}
                textAnchor={p.anchor ?? "middle"}
                fontSize={11}
                fontWeight={600}
                fill="white"
                className={c.page ? "font-sans group-hover:fill-[var(--color-volt-300)]" : "font-sans"}
              >
                {c.name}
              </text>
            </g>
          );
          return c.page ? (
            <Link key={c.name} href={`/areas/${c.page}`}>{node}</Link>
          ) : (
            <g key={c.name}>{node}</g>
          );
        })}
        {/* hub */}
        <Link href="/areas">
          <circle cx={HUB.x} cy={HUB.y} r={10} className="map-hub" />
          <text x={HUB.x} y={HUB.y - 17} textAnchor="middle" fontSize={15} fill="white" className="font-display">
            Spokane
          </text>
        </Link>
      </svg>
      <figcaption className="label-mono mt-2 text-right text-[0.6rem] text-mist-400">Diagram · not to scale</figcaption>
    </figure>
  );
}
