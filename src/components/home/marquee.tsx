/**
 * Wraps the moving review ribbons with a Pause/Play control. Auto-moving
 * content that runs longer than five seconds needs a way to stop it
 * (WCAG 2.2.2). Hover and keyboard focus also pause it (globals.css); reduced
 * motion turns the movement off entirely and makes the ribbons scrollable.
 */
export function PausableMarquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="marquee grid gap-4">
        {children}
      </div>
    </div>
  );
}
