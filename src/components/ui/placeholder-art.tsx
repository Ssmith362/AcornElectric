import type { Art } from "@/content/images";

/**
 * Drawn placeholders, one per subject, in the site's line style. They exist so
 * layouts can be judged before Acorn's photos arrive, without stock photos
 * pretending to be Acorn jobs. Purely decorative (aria-hidden); the frame
 * around them carries the visible "placeholder" label.
 *
 * viewBox is 400 × 275 (the 1600 × 1100 landscape ratio) except "crew".
 */

const L = { fill: "none", stroke: "var(--color-mist-300)", strokeWidth: 1.4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const C = { ...L, stroke: "var(--color-copper-400)" };
const V = { ...L, stroke: "var(--color-volt-400)", strokeWidth: 1.8 };
const glow = { filter: "url(#acorn-glow)" };

/**
 * Shared filter/gradients, rendered ONCE in the root layout so ids are unique
 * on the page. Not display:none: Chrome drops gradients defined that way.
 */
export function ArtDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
    <defs>
      <filter id="acorn-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="acorn-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="var(--color-volt-300)" stopOpacity=".35" />
        <stop offset="1" stopColor="var(--color-volt-300)" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="acorn-halo">
        <stop offset="0" stopColor="var(--color-volt-300)" stopOpacity=".45" />
        <stop offset="1" stopColor="var(--color-volt-300)" stopOpacity="0" />
      </radialGradient>
    </defs>
    </svg>
  );
}

const scenes: Record<Art, React.ReactNode> = {
  ev: (
    <>
      <path {...L} d="M0 222h400M40 40v182M40 40h320" opacity=".5" />
      {/* charger */}
      <rect {...L} x="70" y="92" width="34" height="54" rx="4" />
      <circle cx="87" cy="108" r="3" fill="var(--color-volt-400)" style={glow} />
      <path {...C} d="M87 30v62" strokeDasharray="3 4" />
      {/* cable */}
      <path {...V} d="M87 146c0 40 40 52 110 40 26-4 40 2 50 12" style={glow} />
      <path {...V} className="flow" stroke="var(--color-volt-200)" d="M87 146c0 40 40 52 110 40 26-4 40 2 50 12" />
      {/* car */}
      <path
        {...L}
        strokeWidth={1.8}
        d="M178 214h-8c-6 0-8-4-8-10v-14c0-8 6-12 14-14l40-8c18-22 40-30 72-30 34 0 56 10 72 32l22 4c10 2 14 8 14 16v14c0 6-4 10-10 10h-12"
      />
      <path {...L} d="M224 168c14-16 32-22 58-22 26 0 42 6 56 22z" />
      <circle {...L} strokeWidth={1.8} cx="214" cy="214" r="18" />
      <circle {...L} strokeWidth={1.8} cx="352" cy="214" r="18" />
      <path {...L} d="M232 214h102" />
    </>
  ),
  panel: (
    <>
      <rect {...L} x="120" y="22" width="160" height="232" rx="3" strokeWidth={1.8} />
      <rect {...L} x="134" y="36" width="132" height="204" opacity=".6" />
      <rect {...C} x="172" y="46" width="56" height="22" />
      <path {...C} d="M200 46v-24" />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect {...L} x="146" y={80 + i * 19} width="44" height="13" opacity={i === 2 || i === 5 ? 1 : 0.7} />
          <rect {...L} x="210" y={80 + i * 19} width="44" height="13" opacity=".7" />
          <path {...L} d={`M190 ${86 + i * 19}h20`} opacity=".35" />
        </g>
      ))}
      <rect x="146" y="118" width="44" height="13" fill="var(--color-volt-400)" opacity=".85" style={glow} />
      <rect x="210" y="175" width="44" height="13" fill="var(--color-volt-400)" opacity=".85" style={glow} />
      <path {...L} d="M60 254h280" opacity=".4" />
    </>
  ),
  subpanel: (
    <>
      <path {...L} d="M0 200h400" opacity=".5" />
      <path {...L} strokeWidth={1.8} d="M30 200V110l60-44 60 44v90z" />
      <rect {...L} x="64" y="140" width="20" height="30" />
      <path {...L} strokeWidth={1.8} d="M260 200v-80h110v80M250 124l65-40 65 40" />
      <rect {...C} x="300" y="140" width="24" height="34" />
      <rect x="306" y="148" width="12" height="4" fill="var(--color-volt-400)" style={glow} />
      <path {...C} d="M74 170v52h238v-48" strokeDasharray="5 5" />
      <path {...V} className="flow" d="M74 170v52h238v-48" />
      <path {...L} d="M60 236h270" opacity=".25" strokeDasharray="2 6" />
    </>
  ),
  hottub: (
    <>
      <path {...L} d="M0 220h400M60 220V30" opacity=".5" />
      <rect {...C} x="78" y="104" width="30" height="40" />
      <circle cx="93" cy="118" r="3" fill="var(--color-volt-400)" style={glow} />
      <path {...C} d="M93 144v76" />
      <path {...V} className="flow" d="M93 220v-76" />
      <path {...L} strokeWidth={1.8} d="M170 220v-58h200v58" />
      <path {...L} d="M170 162h200" />
      <path {...L} d="M186 178c12-6 24 6 36 0s24 6 36 0 24 6 36 0 24 6 36 0 24 6 36 0" opacity=".6" />
      <path {...L} d="M220 140c-6-10 6-16 0-26M270 140c-6-10 6-16 0-26M320 140c-6-10 6-16 0-26" opacity=".5" />
      <path {...C} d="M108 124h22" strokeDasharray="2 3" />
      <text x="114" y="98" fill="var(--color-copper-300)" fontSize="9" fontFamily="monospace" letterSpacing="1">
        ≥ 5 FT
      </text>
      <path {...C} d="M108 104h62" opacity=".5" />
    </>
  ),
  recessed: (
    <>
      <path {...L} d="M0 36h400" strokeWidth={1.8} />
      {[60, 140, 220, 300, 360].map((x) => (
        <g key={x}>
          <path d={`M${x - 10} 38L${x - 46} 250h92L${x + 10} 38z`} fill="url(#acorn-cone)" />
          <rect x={x - 11} y="35" width="22" height="4" fill="var(--color-volt-300)" style={glow} />
        </g>
      ))}
      <path {...L} d="M0 250h400" opacity=".5" />
      <path {...L} strokeWidth={1.6} d="M150 250v-36c0-8 6-12 14-12h96c8 0 14 4 14 12v36M138 222h12M274 222h12" />
    </>
  ),
  mast: (
    <>
      <path {...L} strokeWidth={1.8} d="M20 250V150l130-90 130 90v100" />
      <path {...L} d="M0 250h400" opacity=".5" />
      <path {...C} strokeWidth={2.4} d="M182 250V40" />
      <path {...C} strokeWidth={2.4} d="M182 40c0-10 12-12 16-4" />
      <rect {...L} x="168" y="170" width="28" height="40" rx="12" />
      <circle cx="182" cy="190" r="4" fill="var(--color-volt-400)" style={glow} />
      <path {...L} d="M196 46c60 18 120 22 180 14M196 52c60 20 120 26 180 18" />
      <path {...L} strokeWidth={1.8} d="M376 20v230M366 40h20" />
      <path {...C} d="M168 112h28" opacity=".7" />
    </>
  ),
  inspection: (
    <>
      <rect {...L} strokeWidth={1.8} x="70" y="40" width="120" height="190" rx="6" />
      {[90, 160].map((y) => (
        <g key={y}>
          <rect {...L} x="100" y={y} width="60" height="46" rx="18" />
          <path {...L} d={`M118 ${y + 14}v12M142 ${y + 14}v12`} />
          <path {...L} d={`M126 ${y + 34}a4 4 0 0 1 8 0`} />
        </g>
      ))}
      <circle cx="130" cy="70" r="3" fill="var(--color-volt-400)" style={glow} />
      <rect {...C} x="240" y="50" width="110" height="170" rx="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path {...(i < 3 ? V : L)} d={`M256 ${88 + i * 26}l5 5 9-10`} />
          <path {...L} d={`M282 ${90 + i * 26}h52`} opacity=".6" />
        </g>
      ))}
    </>
  ),
  atticfan: (
    <>
      <path {...L} strokeWidth={1.8} d="M40 250V130L200 30l160 100v120" />
      <path {...L} d="M0 250h400" opacity=".5" />
      <circle {...C} cx="200" cy="120" r="34" />
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} {...L} d={`M168 ${104 + i * 7}h64`} opacity=".55" />
      ))}
      <path {...V} d="M246 108c20-4 36 0 52 8M246 124c22 0 40 6 58 18M246 140c18 4 30 12 40 24" style={glow} />
      <path {...L} d="M60 250v-60h60v60M280 250v-60h60v60" opacity=".6" />
    </>
  ),
  exterior: (
    <>
      <path {...L} d="M0 240h400" opacity=".5" />
      <path {...L} strokeWidth={1.8} d="M70 240V120l130-80 130 80v120" />
      <rect {...L} x="174" y="160" width="52" height="80" />
      {[148, 252].map((x) => (
        <g key={x}>
          <circle cx={x} cy="160" r="38" fill="url(#acorn-halo)" />
          <rect {...C} x={x - 6} y="150" width="12" height="18" />
          <rect x={x - 3} y="154" width="6" height="8" fill="var(--color-volt-300)" style={glow} />
        </g>
      ))}
      <rect {...L} x="100" y="150" width="34" height="34" opacity=".6" />
      <rect {...L} x="266" y="150" width="34" height="34" opacity=".6" />
      <path {...L} d="M30 240v-30M370 240v-30" />
      <circle cx="30" cy="206" r="14" fill="url(#acorn-halo)" />
      <circle cx="370" cy="206" r="14" fill="url(#acorn-halo)" />
      <circle cx="30" cy="207" r="3" fill="var(--color-volt-300)" />
      <circle cx="370" cy="207" r="3" fill="var(--color-volt-300)" />
    </>
  ),
  repair: (
    <>
      <rect {...L} strokeWidth={1.8} x="64" y="70" width="90" height="140" rx="6" />
      <rect {...L} x="96" y="112" width="26" height="56" rx="3" />
      <path {...C} d="M154 140h70l30 -30h70" />
      <path {...V} className="flow" d="M154 140h70l30 -30h70" />
      <rect {...L} x="324" y="86" width="48" height="48" />
      <path d="M234 128l8-14 4 10 8-16" fill="none" stroke="var(--color-copper-300)" strokeWidth="1.8" style={glow} />
      <circle cx="224" cy="140" r="4" fill="var(--color-volt-400)" style={glow} />
      <path {...L} d="M40 230h320" opacity=".3" strokeDasharray="2 6" />
    </>
  ),
  van: (
    <>
      <path {...L} d="M0 226h400" opacity=".5" />
      <path
        {...L}
        strokeWidth={1.8}
        d="M44 206V96c0-10 6-16 16-16h200c8 0 14 4 18 10l40 52 34 10c10 3 14 8 14 18v36c0 6-4 10-10 10h-14"
      />
      <path {...L} d="M282 96l30 44h-44V96z" />
      <circle {...L} strokeWidth={1.8} cx="110" cy="210" r="20" />
      <circle {...L} strokeWidth={1.8} cx="306" cy="210" r="20" />
      <path {...L} d="M130 210h156M44 206h46" />
      <path {...C} d="M80 130h140" />
      <path {...V} d="M80 140h90" style={glow} />
    </>
  ),
  crew: (
    <>
      {/* hard hat */}
      <path {...L} strokeWidth={1.8} d="M78 150c0-44 30-70 72-70s72 26 72 70z" />
      <path {...L} strokeWidth={1.8} d="M60 150h180" />
      <path {...C} d="M150 80V64" />
      <rect {...C} x="134" y="112" width="32" height="10" />
      {/* tool bag */}
      <path {...L} strokeWidth={1.8} d="M70 330V236h160v94z" />
      <path {...L} d="M112 236c0-26 16-38 38-38s38 12 38 38" />
      <path {...C} d="M70 262h160" />
      <path {...L} d="M96 236v-30M98 206l-6-8M98 206l6-8M206 236v-40" opacity=".7" />
      <path {...V} d="M120 290h60" style={glow} />
      <path {...L} d="M40 330h220" opacity=".4" />
    </>
  ),
};

export function PlaceholderArt({ art }: { art: Art }) {
  const tall = art === "crew";
  return (
    <svg
      viewBox={tall ? "0 0 300 375" : "0 0 400 275"}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full p-[6%]"
      aria-hidden="true"
      focusable="false"
    >
      {scenes[art]}
    </svg>
  );
}
