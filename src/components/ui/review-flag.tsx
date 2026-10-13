/**
 * Visible "needs client confirmation" marker for preview builds.
 *
 * Shown while NEXT_PUBLIC_SHOW_REVIEW_FLAGS is not "false". Set it to "false"
 * on the production deploy ONLY after every flag has been resolved; the
 * launch checklist in docs/handoff.md walks through them.
 */
export const SHOW_REVIEW_FLAGS = process.env.NEXT_PUBLIC_SHOW_REVIEW_FLAGS !== "false";

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
