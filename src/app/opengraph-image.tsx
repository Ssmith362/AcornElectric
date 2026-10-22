import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Site-wide share card, generated at build time, with Acorn's real logo.
 */
export const alt = "Acorn Electric, residential electrician in Spokane, WA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/acorn-logo-horizontal-640.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 80px 64px",
          background: "#012730",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logoSrc} width={340} height={174} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          <span>Wired right.</span>
          <span style={{ color: "#ffef1f" }}>One less thing</span>
          <span>to worry about.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#ddd0ad" }}>
          <span>Residential electrician · Spokane, WA</span>
          <span style={{ color: "#ec8540" }}>callacornelectric.com</span>
        </div>
      </div>
    ),
    size,
  );
}
