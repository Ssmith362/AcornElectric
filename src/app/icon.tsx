import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default async function Icon() {
  const mascot = await readFile(path.join(process.cwd(), "public", "brand", "acorn-mascot-900.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f3a24",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${mascot.toString("base64")}`}
          alt=""
          width={145}
          height={178}
        />
      </div>
    ),
    size,
  );
}
