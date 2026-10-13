"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveal-on-scroll. Anything already on screen is marked visible BEFORE the
 * page is "armed", so nothing above the fold ever blinks out. Without JS (or
 * with reduced motion, see globals.css) everything is simply visible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const vh = window.innerHeight;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < vh) el.classList.add("is-in");
    });
    document.documentElement.classList.add("is-armed");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => {
      if (!el.classList.contains("is-in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
