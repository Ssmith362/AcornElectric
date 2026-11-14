import "server-only";
import {
  REQUEST_BODY_LIMIT,
  RESUME_FILE,
  SERVICE_ATTACHMENTS,
  attachmentListError,
  formatBytes,
  kindFromBytes,
  kindFromName,
  mimeFor,
  resumeKindFromName,
  resumeSignatureOk,
  safeFilename,
  safeResumeName,
  type AttachmentMeta,
  type FileKind,
} from "./attachments.ts";
import { clientIp, looksLikeBot, rateLimited } from "./guard.ts";
import { sendMail, type Attachment } from "./mail.ts";
import { validateApplication, validateInquiry } from "./rules.ts";

/**
 * Request handlers for the two form endpoints. The route files only re-export
 * these, so tests can call them directly with a Request.
 *
 * Responses the forms understand:
 *   200 { ok: true }                 sent (or a silently dropped bot)
 *   400                              malformed request
 *   413 { errors: {field: message} } too large for the host to accept
 *   415                              not multipart/form-data
 *   422 { errors: {field: message} } validation failed
 *   429                              too many submissions
 *   502 { error: "send-failed" }     email provider failed: form says "please call"
 *   503 { error: "unconfigured" }    email not set up: form says "please call"
 *
 * Files are checked in memory (count, size, extension AND file signature) and
 * attached to the email. Nothing is written to disk or kept by the website.
 */

const json = (body: unknown, status = 200) => Response.json(body, { status });

async function readForm(req: Request): Promise<FormData | Response> {
  const type = req.headers.get("content-type") || "";
  if (!type.toLowerCase().startsWith("multipart/form-data")) return json({ error: "Unsupported content type." }, 415);
  try {
    return await req.formData();
  } catch {
    return json({ error: "Malformed request." }, 400);
  }
}

function textFields(form: FormData) {
  return Object.fromEntries(Array.from(form.entries()).filter(([, v]) => typeof v === "string")) as Record<string, string>;
}

const tooLarge = (field: string, message: string) => json({ errors: { [field]: message } }, 413);

/* ------------------------------------------------------------------ inquiry */

export async function handleInquiry(req: Request): Promise<Response> {
  if (Number(req.headers.get("content-length") || 0) > REQUEST_BODY_LIMIT) {
    return tooLarge(
      SERVICE_ATTACHMENTS.field,
      `The files are too large to send (limit ${formatBytes(SERVICE_ATTACHMENTS.maxTotalBytes)} in total).`,
    );
  }
  const form = await readForm(req);
  if (form instanceof Response) return form;

  const fields = textFields(form);
  if (looksLikeBot(fields.company_site, fields.startedAt)) return json({ ok: true });
  if (rateLimited(clientIp(req))) return json({ error: "Too many requests." }, 429);

  const { data, errors } = validateInquiry(fields);

  const files = form.getAll(SERVICE_ATTACHMENTS.field).filter((f): f is File => typeof f !== "string" && f.size > 0);
  const attachments: Attachment[] = [];
  if (files.length > SERVICE_ATTACHMENTS.maxFiles) {
    errors.attachments = `Please attach no more than ${SERVICE_ATTACHMENTS.maxFiles} files.`;
  } else if (files.length) {
    const metas: (AttachmentMeta & { bytes: Uint8Array })[] = [];
    for (const f of files) {
      const bytes = new Uint8Array(await f.arrayBuffer());
      const byBytes = kindFromBytes(bytes);
      const byName = kindFromName(f.name);
      // The content decides; the name must agree (a .jpg must really be a JPEG).
      const kind: FileKind | null = byBytes && byName && byBytes === byName ? byBytes : null;
      metas.push({ name: f.name, size: f.size, kind, bytes });
    }
    const err = attachmentListError(metas);
    if (err) {
      errors.attachments = err;
    } else {
      const used = new Set<string>();
      metas.forEach((m, i) => {
        let name = safeFilename(m.name, m.kind!, `photo-${i + 1}`);
        if (used.has(name.toLowerCase())) name = name.replace(/(\.[a-z]+)$/, `-${i + 1}$1`);
        used.add(name.toLowerCase());
        attachments.push({ filename: name, content: Buffer.from(m.bytes).toString("base64"), contentType: mimeFor(m.kind!) });
      });
    }
  }

  if (Object.keys(errors).length) return json({ errors }, 422);

  const result = await sendMail({
    to: "leads",
    subject: `Website inquiry: ${data.service || "General request"} (${data.name})`,
    replyTo: data.email || undefined,
    rows: [
      ["Service page", data.service || "none (general form)"],
      ["Name", data.name],
      ["Phone", data.phone || "not given"],
      ["Email", data.email || "not given"],
      ["Address / ZIP", data.location],
      ["Prefers", data.contactMethod],
      ["Details", data.message],
      ["Attachments", attachments.length ? attachments.map((a) => a.filename).join(", ") : "none"],
      ["Sent from page", data.source || "unknown"],
    ],
    attachments: attachments.length ? attachments : undefined,
  });

  if (result === "unconfigured") return json({ error: "unconfigured" }, 503);
  if (result === "failed") return json({ error: "send-failed" }, 502);
  return json({ ok: true });
}

/* -------------------------------------------------------------- application */

export async function handleApplication(req: Request): Promise<Response> {
  if (Number(req.headers.get("content-length") || 0) > REQUEST_BODY_LIMIT) {
    return tooLarge("resume", `Resume must be ${RESUME_FILE.label}.`);
  }
  const form = await readForm(req);
  if (form instanceof Response) return form;

  const fields = textFields(form);
  if (looksLikeBot(fields.company_site, fields.startedAt)) return json({ ok: true });
  if (rateLimited(clientIp(req))) return json({ error: "Too many requests." }, 429);

  const { data, errors } = validateApplication(fields);

  const file = form.get(RESUME_FILE.field);
  let attachment: Attachment | undefined;
  if (file && typeof file !== "string" && file.size > 0) {
    const kind = resumeKindFromName(file.name);
    if (!kind || file.size > RESUME_FILE.maxBytes) {
      errors.resume = `Resume must be ${RESUME_FILE.label}.`;
    } else {
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!resumeSignatureOk(bytes, kind)) {
        errors.resume = "That file doesn't look like a PDF or Word document.";
      } else {
        attachment = {
          filename: safeResumeName(file.name, kind),
          content: Buffer.from(bytes).toString("base64"),
          contentType:
            kind === "pdf"
              ? "application/pdf"
              : kind === "docx"
                ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                : "application/msword",
        };
      }
    }
  }

  if (Object.keys(errors).length) return json({ errors }, 422);

  const result = await sendMail({
    to: "careers",
    subject: `Application: ${data.opening} (${data.name})`,
    replyTo: data.email,
    rows: [
      ["Role", data.opening],
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Based in", data.city],
      ["WA certificate", data.certificate],
      ["Certificate #", data.certNumber || "not given"],
      ["Experience", data.experience],
      ["Residential service experience", data.residentialService],
      ["Valid driver's license", data.driversLicense],
      ["About", data.about],
      ["Resume", attachment ? `attached (${attachment.filename})` : "none"],
    ],
    attachments: attachment ? [attachment] : undefined,
  });

  if (result === "unconfigured") return json({ error: "unconfigured" }, 503);
  if (result === "failed") return json({ error: "send-failed" }, 502);
  return json({ ok: true });
}
