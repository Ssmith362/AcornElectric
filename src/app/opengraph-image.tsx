import { ImageResponse } from "next/og";

/**
 * Site-wide share card, generated at build time. Temporary until a real
 * branded photo exists; then drop a 1200×630 image in /public/og/ and pass it
 * as `image` to pageMetadata() instead.
 */
export const alt = "Acorn Electric, residential electrician in Spokane, WA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a110f",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#d2f455", boxShadow: "0 0 24px #d2f455" }} />
          <div style={{ fontSize: 30, letterSpacing: 8, color: "#bdc6b8" }}>ACORN ELECTRIC</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          <span>Wired right.</span>
          <span style={{ color: "#d2f455" }}>One less thing</span>
          <span>to worry about.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#bdc6b8" }}>
          <span>Residential electrician · Spokane, WA</span>
          <span style={{ color: "#da8b52" }}>callacornelectric.com</span>
        </div>
      </div>
    ),
    size,
  );
}
