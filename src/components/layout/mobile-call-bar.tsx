import Link from "next/link";
import { PhoneGlyph } from "@/components/ui/button";
import { tel } from "@/lib/site";

/** Always-reachable call + request on phones. Body gets matching bottom padding. */
export function MobileCallBar() {
  return (
    <nav aria-label="Quick contact" className="on-night fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-night-950/95 backdrop-blur-md md:hidden pb-[env(safe-area-inset-bottom)]">
      <a href={tel} className="flex min-h-14 items-center justify-center gap-2 font-semibold text-white">
        <PhoneGlyph className="h-5 w-5 text-volt-400" />
        Call now
      </a>
      <Link href="/contact" className="flex min-h-14 items-center justify-center bg-volt-400 font-semibold text-night-950">
        Request service
      </Link>
    </nav>
  );
}
