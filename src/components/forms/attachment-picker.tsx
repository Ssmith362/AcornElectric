"use client";

import { useState } from "react";
import {
  SERVICE_ATTACHMENTS as RULE,
  formatBytes,
  kindFromBytes,
  kindFromName,
  shortName,
  type FileKind,
} from "@/lib/forms/attachments";
import { shrinkPhoto } from "@/lib/forms/compress-image";

export type PickedFile = { key: string; file: File; kind: FileKind };

const IMAGE_MIME: Record<string, FileKind> = { "image/jpeg": "jpeg", "image/png": "png", "image/webp": "webp" };

/** What the browser can tell about a file before upload. The server checks again. */
async function sniff(file: File): Promise<FileKind | null> {
  try {
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    return kindFromBytes(head);
  } catch {
    return kindFromName(file.name);
  }
}

/**
 * Optional photo/PDF attachments for the service request form.
 *
 * The real <input type="file"> covers the drop area (transparent), so click,
 * keyboard, drag-and-drop and phone photo pickers all behave natively. Picked
 * files are kept in React state (not the input), so they survive a failed
 * send and can be removed one by one. Photos are resized before they're added.
 */
export function AttachmentPicker({
  id,
  files,
  onFilesChange,
  error,
  onError,
  onBusyChange,
  disabled = false,
}: {
  id: string;
  files: PickedFile[];
  onFilesChange: (next: PickedFile[]) => void;
  error?: string;
  onError: (message: string) => void;
  onBusyChange: (busy: boolean) => void;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const total = files.reduce((t, f) => t + f.file.size, 0);
  const full = files.length >= RULE.maxFiles;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  async function add(list: FileList | null) {
    const incoming = Array.from(list ?? []);
    if (!incoming.length) return;
    setBusy(true);
    onBusyChange(true);
    setStatus(incoming.length === 1 ? "Preparing 1 file…" : `Preparing ${incoming.length} files…`);

    const problems: string[] = [];
    const next = [...files];
    let sum = total;

    for (const original of incoming) {
      const name = shortName(original.name);
      const named = kindFromName(original.name) ?? IMAGE_MIME[original.type] ?? null;
      const looksImage = original.type.startsWith("image/") || (named !== null && named !== "pdf");
      let file: File = original;
      let kind: FileKind | null = null;

      if (looksImage) {
        if (original.size > RULE.maxOriginalImageBytes) {
          problems.push(`“${name}” is too large to prepare. Try a smaller photo.`);
          continue;
        }
        const small = await shrinkPhoto(original);
        // Prefer the re-encoded copy: smaller, and free of embedded location data.
        if (small) {
          file = small;
          kind = "jpeg";
        } else {
          kind = await sniff(original);
          if (!kind || kind === "pdf") {
            problems.push(`“${name}” couldn't be read. Please use a JPG, PNG or WebP photo.`);
            continue;
          }
        }
      } else if (named === "pdf") {
        kind = await sniff(original);
        if (kind !== "pdf") {
          problems.push(`“${name}” doesn't look like a PDF.`);
          continue;
        }
      } else {
        problems.push(`“${name}” isn't a photo or PDF. Accepted: JPG, PNG, WebP or PDF.`);
        continue;
      }

      if (file.size > RULE.maxFileBytes) {
        problems.push(`“${name}” is ${formatBytes(file.size)}. Each file must be under ${formatBytes(RULE.maxFileBytes)}.`);
        continue;
      }
      if (next.length >= RULE.maxFiles) {
        problems.push(`Only ${RULE.maxFiles} files can be attached, so “${name}” was left off.`);
        continue;
      }
      if (sum + file.size > RULE.maxTotalBytes) {
        problems.push(`“${name}” would take the total over ${formatBytes(RULE.maxTotalBytes)}. Email large plans to us instead.`);
        continue;
      }
      sum += file.size;
      next.push({ key: `${Date.now()}-${Math.random().toString(36).slice(2)}`, file, kind });
    }

    onFilesChange(next);
    onError(problems.join(" "));
    const added = next.length - files.length;
    setStatus(
      added
        ? `${added === 1 ? "1 file added" : `${added} files added`}. ${next.length} of ${RULE.maxFiles} attached.`
        : "No files were added.",
    );
    setBusy(false);
    onBusyChange(false);
  }

  function remove(key: string) {
    const removed = files.find((f) => f.key === key);
    const next = files.filter((f) => f.key !== key);
    onFilesChange(next);
    onError("");
    setStatus(`${removed ? shortName(removed.file.name) : "File"} removed. ${next.length} of ${RULE.maxFiles} attached.`);
  }

  const describedBy = [error ? errorId : "", hintId].filter(Boolean).join(" ");

  return (
    <div className="sm:col-span-2">
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        Photos or PDFs
        <span className="label-mono text-[0.6rem] font-normal text-ink-mute">Optional</span>
      </label>
      <div
        className={`relative flex min-h-16 items-center gap-3 border border-dashed bg-peach-50 px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper-500 ${
          error ? "border-danger" : "border-ink/30 hover:border-ink"
        } ${full || disabled ? "opacity-60" : ""}`}
      >
        <input
          id={id}
          type="file"
          multiple
          accept={RULE.accept}
          disabled={busy || full || disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onChange={(e) => {
            const input = e.currentTarget;
            void add(input.files).finally(() => {
              input.value = "";
            });
          }}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
        <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-copper-600" aria-hidden="true">
          <path d="M13.5 6.5l-6 6a2 2 0 102.8 2.8l6.4-6.4a3.5 3.5 0 10-5-5L5 10.6a5 5 0 007 7l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span aria-hidden="true">
          <span className="font-semibold text-ink underline underline-offset-4">
            {busy ? "Preparing…" : full ? `${RULE.maxFiles} files attached` : files.length ? "Add more" : "Add photos or PDFs"}
          </span>
          <span className="text-ink-mute"> {busy || full ? "" : "or drop them here"}</span>
        </span>
      </div>
      <p id={hintId} className="mt-1.5 text-sm text-ink-mute">
        {RULE.label} A panel photo, charger model or spec sheet helps us quote.
      </p>
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-danger">
          <span className="sr-only">Error: </span>
          {error}
        </p>
      ) : null}

      {files.length ? (
        <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10" aria-label="Attached files">
          {files.map((f) => (
            <li key={f.key} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="min-w-0">
                <span className="block truncate font-medium text-ink">{shortName(f.file.name)}</span>
                <span className="text-ink-mute">
                  {f.kind === "pdf" ? "PDF" : "Photo"} · {formatBytes(f.file.size)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => remove(f.key)}
                disabled={disabled}
                className="inline-flex min-h-11 shrink-0 items-center px-2 font-semibold text-copper-700 underline underline-offset-4 hover:text-ink"
              >
                Remove<span className="sr-only"> {shortName(f.file.name)}</span>
              </button>
            </li>
          ))}
          <li className="py-2 text-xs text-ink-mute">
            {files.length} of {RULE.maxFiles} files · {formatBytes(total)} of {formatBytes(RULE.maxTotalBytes)}
          </li>
        </ul>
      ) : null}
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
