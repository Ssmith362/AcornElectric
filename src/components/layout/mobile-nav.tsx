"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, tel } from "@/lib/site";
import { primaryNav, serviceNav } from "./nav";

/**
 * Mobile menu. A native <dialog> gives focus trapping, Escape-to-close and
 * inert background for free.
 */
export function MobileNav() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  function show() {
    ref.current?.showModal();
    setOpen(true);
  }
  function hide() {
    ref.current?.close();
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center border border-white/15 text-white"
      >
        <span className="sr-only">Open menu</span>
        <svg viewBox="0 0 20 14" className="h-3.5 w-5" aria-hidden="true">
          <path d="M0 1h20M0 7h20M8 13h12" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        aria-label="Menu"
        className="on-night m-0 h-dvh max-h-none w-full max-w-none bg-night-950 p-0 text-white backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col">
          <div className="container-x flex h-16 items-center justify-between border-b border-white/10">
            <span className="label-mono text-mist-400">Menu</span>
            <button
              type="button"
              onClick={hide}
              className="flex h-11 w-11 items-center justify-center border border-white/15"
            >
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto py-6">
            <ul className="space-y-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={hide} className="block py-2 font-display text-3xl font-semibold tracking-tight">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label-mono mt-8 mb-3 text-mist-400">Services</p>
            <ul className="grid grid-cols-1 border-t border-white/10">
              {serviceNav.map((s) => (
                <li key={s.href} className="border-b border-white/10">
                  <Link href={s.href} onClick={hide} className="flex items-center gap-3 py-3 text-mist-100">
                    <span className="label-mono text-[0.62rem] text-copper-400">{s.pos}</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-x grid grid-cols-2 gap-2 border-t border-white/10 py-4">
            <a href={tel} className="flex min-h-12 items-center justify-center border border-white/25 font-semibold">
              Call {site.phone.value.display}
            </a>
            <Link
              href="/contact"
              onClick={hide}
              className="flex min-h-12 items-center justify-center bg-volt-400 font-semibold text-night-950"
            >
              Request service
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );
}
