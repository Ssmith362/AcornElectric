import Image from "next/image";
import Link from "next/link";
import { images, type ImageKey } from "@/content/images";

/** Three real Acorn jobs, big and quiet (Option 4 "Project showcase"). */
const work: { id: ImageKey; title: string; tag?: string; href: string }[] = [
  { id: "home-hero", title: "Kitchen remodel", tag: "Lighting", href: "/services/lighting-installation" },
  { id: "remodel", title: "Covered patio addition", tag: "Fan & lights", href: "/services/remodel-and-addition-wiring" },
  { id: "service-upgrade", title: "Service upgrade", tag: "Panel & meter", href: "/services/electrical-panel-upgrades" },
];

export function Showcase() {
  return (
    <section className="bg-mist-200 py-16 sm:py-24 lg:py-28" aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6" data-reveal>
          <h2 id="work-title" className="text-[2.3rem] leading-none text-night-900 sm:text-[clamp(2.2rem,4vw,3.4rem)]">
            Project showcase
          </h2>
          <p className="label-mono text-copper-600">Real Acorn jobs</p>
        </div>
        <div className="mt-7 grid gap-2.5 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-[1.15fr_0.9fr_0.9fr]" data-reveal>
          {work.map((w, i) => {
            const img = images[w.id];
            if (!img.src) return null;
            return (
              <Link
                key={w.id}
                href={w.href}
                className={`group relative block min-h-[17rem] overflow-hidden bg-night-900 sm:min-h-[20rem] lg:min-h-[23rem] ${i === 0 ? "sm:col-span-2 sm:min-h-[22rem] lg:col-span-1 lg:min-h-[27.5rem]" : ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  style={"focus" in img && img.focus ? { objectPosition: img.focus } : undefined}
                />
                <span aria-hidden="true" className="absolute inset-x-0 top-1/2 bottom-0 bg-[linear-gradient(transparent,rgb(6_23_15/.78))]" />
                <span className="absolute right-4 bottom-4 left-4 flex items-baseline justify-between gap-3 text-white sm:right-5 sm:bottom-5 sm:left-5">
                  <span className="font-display text-[1.3rem] leading-tight font-semibold">{w.title}</span>
                  {w.tag ? <span className="label-mono shrink-0 text-[0.62rem] tracking-[0.06em]">{w.tag}</span> : null}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
