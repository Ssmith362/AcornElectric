/**
 * Visible "needs client confirmation" marker for internal review builds.
 *
 * OFF unless NEXT_PUBLIC_SHOW_REVIEW_FLAGS is exactly "true". Drafting notes
 * must never reach visitors by default, including on shared previews; open
 * owner questions live in docs/client-facts-checklist.md. Turn it on only in
 * a local or private build when you want to see where unconfirmed facts sit.
 */
export const SHOW_REVIEW_FLAGS = process.env.NEXT_PUBLIC_SHOW_REVIEW_FLAGS === "true";

export function ReviewFlag({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  if (!SHOW_REVIEW_FLAGS) return null;
  const color =
    tone === "dark"
      ? "border-copper-300/50 bg-copper-500/15 text-copper-200"
      : "border-copper-500/40 bg-copper-200/40 text-copper-700";
  return (
    <span className={`label-mono inline-flex items-center gap-1.5 border border-dashed px-2 py-1 text-[0.62rem] ${color}`}>
      <span aria-hidden="true">●</span>
      <span>To confirm: {children}</span>
    </span>
  );
}
