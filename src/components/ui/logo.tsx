/**
 * TEMPORARY MARK. Acorn's real logo files haven't been supplied yet; this is
 * a stand-in drawn to sit in the design system. When the real logo arrives,
 * replace this component's contents with it (inline SVG keeps it crisp and
 * lets it take colour from CSS). Every header/footer use goes through here.
 */
export function AcornMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      {/* stem that turns into a trace */}
      <path d="M16 7.5V4.5l3-3" fill="none" stroke="var(--color-volt-400)" strokeWidth="1.6" strokeLinecap="square" />
      <circle cx="19.6" cy="1.6" r="1.4" fill="var(--color-volt-400)" />
      {/* cap */}
      <path d="M5.5 13.2c0-4.6 4.7-6.4 10.5-6.4s10.5 1.8 10.5 6.4z" fill="var(--color-copper-500)" />
      <path d="M8 10.2h16M7 12h18" stroke="var(--color-copper-700)" strokeWidth=".8" opacity=".55" />
      {/* nut */}
      <path
        d="M7.6 14.6h16.8c0 7.2-3.6 13-8.4 15-4.8-2-8.4-7.8-8.4-15z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* filament */}
      <path d="M16 16.5v6.2" stroke="var(--color-volt-400)" strokeWidth="1.6" />
      <circle cx="16" cy="25" r="1.3" fill="var(--color-volt-400)" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const word = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-mist-300" : "text-ink-mute";
  return (
    <span className="inline-flex items-center gap-2.5">
      <AcornMark className={`h-9 w-9 ${word}`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.35rem] font-bold tracking-[-0.03em] ${word}`}>Acorn</span>
        <span className={`label-mono mt-1 text-[0.6rem] tracking-[0.32em] ${sub}`}>Electric</span>
      </span>
    </span>
  );
}
