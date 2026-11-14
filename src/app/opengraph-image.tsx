import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Site-wide share card (1200×630), generated at build time and served from
 * /opengraph-image on whatever host serves the page, with Acorn's real logo
 * and the homepage line. Option 4 palette: forest green, Acorn orange, cream.
 * Every page inherits it; metadata URLs resolve against BASE_URL (src/lib/seo.ts).
 */
export const alt = "Acorn Electric: electrical repairs, upgrades and installations for Spokane homes and businesses";
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
          padding: "56px 80px 60px",
          background: "#0f3a24",
          borderBottom: "12px solid #e46c24",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>, not next/image */}
          <img src={logoSrc} width={340} height={174} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>
            <span>Powering&nbsp;</span>
            <span style={{ color: "#f0822e" }}>Spokane.</span>
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 34, color: "#f8eed7", lineHeight: 1.25 }}>
            Electrical repairs, upgrades and installations for homes and businesses.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#f0e2c3" }}>
          <span>Spokane, Washington</span>
          <span style={{ color: "#f7a468" }}>callacornelectric.com</span>
        </div>
      </div>
    ),
    size,
  );
}
