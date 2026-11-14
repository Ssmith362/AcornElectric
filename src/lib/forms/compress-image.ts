/**
 * Browser-only: shrink a phone photo before upload so several fit under the
 * host's 4.5 MB request limit (see attachments.ts).
 *
 * The photo is drawn onto a canvas at no more than MAX_EDGE pixels on its long
 * side and re-encoded as JPEG. Re-encoding also drops embedded metadata such
 * as GPS location. EXIF orientation is applied first, so photos stay upright.
 *
 * Returns null when the browser can't decode the image (for example a HEIC
 * file in a browser without HEIC support); the caller then decides whether
 * the original is small enough to send as-is.
 */

const MAX_EDGE = 2000;
const QUALITY = 0.82;

export async function shrinkPhoto(file: File): Promise<File | null> {
  if (typeof createImageBitmap !== "function" || typeof document === "undefined") return null;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return null;
  }
  try {
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    // White behind transparent PNGs, which JPEG can't store.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
    if (!blob) return null;
    const base = file.name.replace(/\.[^.]*$/, "") || "photo";
    return new File([blob], `${base}.jpg`, { type: "image/jpeg", lastModified: file.lastModified });
  } finally {
    bitmap.close();
  }
}
