/**
 * Attachment rules shared by the browser (instant feedback) and the API routes
 * (the check that counts). No browser-only or server-only imports here.
 *
 * WHY THESE LIMITS
 * The forms post to Vercel functions, which reject request bodies over 4.5 MB
 * before our code runs. Resend accepts up to 40 MB per email after base64
 * encoding, so Vercel's limit is the real ceiling. Attachments are capped at
 * 4 MB in total, leaving room for the text fields and multipart overhead.
 * Photos are resized in the browser before sending (see compress-image.ts),
 * so a normal phone photo ends up well under 1 MB and five of them fit.
 */

export const MB = 1024 * 1024;

/** Vercel's function request-body ceiling. Anything bigger never reaches us. */
export const REQUEST_BODY_LIMIT = 4.5 * MB;

export type FileKind = "jpeg" | "png" | "webp" | "pdf";

export const SERVICE_ATTACHMENTS = {
  field: "attachments",
  maxFiles: 5,
  /** Per file, after photos are resized in the browser. */
  maxFileBytes: 4 * MB,
  maxTotalBytes: 4 * MB,
  /** Largest original photo the browser will try to resize. */
  maxOriginalImageBytes: 30 * MB,
  kinds: ["jpeg", "png", "webp", "pdf"] as FileKind[],
  accept: "image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf",
  label: "Up to 5 files: JPG, PNG, WebP photos or PDF. 4 MB total. Photos are resized automatically.",
} as const;

export const RESUME_FILE = {
  field: "resume",
  maxBytes: 4 * MB,
  accept: ".pdf,.doc,.docx",
  label: "PDF or Word, up to 4 MB",
} as const;

const EXT: Record<FileKind, string[]> = {
  jpeg: ["jpg", "jpeg"],
  png: ["png"],
  webp: ["webp"],
  pdf: ["pdf"],
};

const MIME: Record<FileKind, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
};

export function extensionOf(name: string) {
  const m = /\.([a-z0-9]{1,8})$/i.exec(name.trim());
  return m ? m[1].toLowerCase() : "";
}

/** Kind implied by the file name (what the visitor picked). */
export function kindFromName(name: string): FileKind | null {
  const ext = extensionOf(name);
  for (const k of Object.keys(EXT) as FileKind[]) if (EXT[k].includes(ext)) return k;
  return null;
}

/** Kind proven by the first bytes of the file. Renamed files don't pass. */
export function kindFromBytes(b: Uint8Array): FileKind | null {
  const at = (sig: number[], offset = 0) => sig.every((v, i) => b[offset + i] === v);
  if (b.length >= 3 && at([0xff, 0xd8, 0xff])) return "jpeg";
  if (b.length >= 8 && at([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (b.length >= 12 && at([0x52, 0x49, 0x46, 0x46]) && at([0x57, 0x45, 0x42, 0x50], 8)) return "webp";
  if (b.length >= 5 && at([0x25, 0x50, 0x44, 0x46, 0x2d])) return "pdf"; // %PDF-
  return null;
}

export function mimeFor(kind: FileKind) {
  return MIME[kind];
}

/**
 * A filename that is safe in an email attachment header and on any disk:
 * no path, no control or shell characters, a bounded length, and an
 * extension that matches what the bytes actually are.
 */
export function safeFilename(original: string, kind: FileKind, fallbackBase = "attachment") {
  const leaf = original.split(/[\\/]/).pop() || "";
  const base = leaf
    .replace(/\.[^.]*$/, "")
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/[\s_]+/g, "_")
    .replace(/^[._-]+|[._-]+$/g, "")
    .slice(0, 60);
  return `${base || fallbackBase}.${EXT[kind][0]}`;
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < MB) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / MB).toFixed(1)} MB`;
}

export type AttachmentMeta = { name: string; size: number; kind: FileKind | null };

/**
 * Checks a list of files (names, sizes and detected kinds). Returns one
 * plain-language error, or null when the set is acceptable.
 */
export function attachmentListError(files: AttachmentMeta[]): string | null {
  const rule = SERVICE_ATTACHMENTS;
  if (files.length > rule.maxFiles) return `Please attach no more than ${rule.maxFiles} files.`;
  for (const f of files) {
    if (!f.kind || !rule.kinds.includes(f.kind)) return `“${shortName(f.name)}” isn't a JPG, PNG, WebP photo or a PDF.`;
    if (f.size === 0) return `“${shortName(f.name)}” is empty.`;
    if (f.size > rule.maxFileBytes) return `“${shortName(f.name)}” is larger than ${formatBytes(rule.maxFileBytes)}.`;
  }
  const total = files.reduce((t, f) => t + f.size, 0);
  if (total > rule.maxTotalBytes)
    return `Attachments add up to ${formatBytes(total)}. The limit is ${formatBytes(rule.maxTotalBytes)} in total; remove a file or email large plans instead.`;
  return null;
}

export function shortName(name: string) {
  const leaf = name.split(/[\\/]/).pop() || name;
  return leaf.length > 40 ? `${leaf.slice(0, 28)}…${leaf.slice(-8)}` : leaf;
}

/* ------------------------------------------------------------------ resume */

export type ResumeKind = "pdf" | "doc" | "docx";

export function resumeKindFromName(name: string): ResumeKind | null {
  const ext = extensionOf(name);
  return ext === "pdf" || ext === "doc" || ext === "docx" ? ext : null;
}

/** First bytes of each allowed resume type. Stops renamed executables etc. */
export function resumeSignatureOk(b: Uint8Array, kind: ResumeKind) {
  const at = (sig: number[]) => b.length >= sig.length && sig.every((v, i) => b[i] === v);
  if (kind === "pdf") return at([0x25, 0x50, 0x44, 0x46]); // %PDF
  if (kind === "docx") return at([0x50, 0x4b, 0x03, 0x04]); // zip container
  return at([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]); // OLE2 (.doc)
}

export function safeResumeName(original: string, kind: ResumeKind) {
  const leaf = original.split(/[\\/]/).pop() || "";
  const base = leaf
    .replace(/\.[^.]*$/, "")
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/[\s_]+/g, "_")
    .replace(/^[._-]+|[._-]+$/g, "")
    .slice(0, 60);
  return `${base || "resume"}.${kind}`;
}
