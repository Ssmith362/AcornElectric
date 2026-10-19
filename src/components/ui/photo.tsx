import Image from "next/image";
import { images, type ImageKey } from "@/content/images";
import { PlaceholderArt } from "./placeholder-art";

/**
 * Every photo on the site goes through here. Reads the registry in
 * src/content/images.ts: a real photo if `src` is set, otherwise a drawn,
 * clearly labelled placeholder. The frame reserves its aspect ratio either
 * way, so swapping photos in never shifts layout.
 */
export function Photo({
  id,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  ticks = true,
  label = "bottom",
}: {
  id: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  ticks?: boolean;
  /** Where the placeholder label sits; move it if something overlaps the frame. */
  label?: "top" | "bottom";
}) {
  const img = images[id];
  return (
    <figure
      className={`relative overflow-hidden bg-grid-night ${className}`}
      style={{ aspectRatio: `${img.width} / ${img.height}` }}
    >
      {img.src ? (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={"focus" in img && img.focus ? { objectPosition: img.focus } : undefined}
        />
      ) : (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(255_239_31/.07),transparent_60%)]" />
          <PlaceholderArt art={img.art} />
          <figcaption className={`absolute right-7 left-7 flex justify-end ${label === "top" ? "top-3" : "bottom-3"}`}>
            <span className="label-mono max-w-full truncate border border-white/15 bg-night-950/80 px-2.5 py-1.5 text-[0.6rem] text-mist-300 backdrop-blur-sm">
              Placeholder · {img.brief}
            </span>
          </figcaption>
        </>
      )}
      {ticks ? <Ticks /> : null}
    </figure>
  );
}

/** Registration marks in the corners. Pure decoration. */
function Ticks() {
  const t = "absolute h-3 w-3 border-volt-400/70";
  return (
    <span aria-hidden="true">
      <span className={`${t} top-2 left-2 border-t border-l`} />
      <span className={`${t} top-2 right-2 border-t border-r`} />
      <span className={`${t} bottom-2 left-2 border-b border-l`} />
      <span className={`${t} right-2 bottom-2 border-r border-b`} />
    </span>
  );
}
