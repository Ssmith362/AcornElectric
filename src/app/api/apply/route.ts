import { clientIp, looksLikeBot, rateLimited } from "@/lib/forms/guard";
import { sendMail } from "@/lib/forms/mail";
import { RESUME, resumeNameOk, validateApplication } from "@/lib/forms/rules";

/**
 * Careers application endpoint (multipart/form-data, for the optional resume).
 *
 * The resume is never written to disk. It's checked (size, extension AND file
 * signature) in memory and attached to the email that goes to CAREERS_TO, so
 * nothing depends on a host filesystem that may be wiped on redeploy.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** First bytes of each allowed type. Stops renamed executables etc. */
function signatureOk(bytes: Uint8Array, name: string) {
  const ext = name.toLowerCase().split(".").pop();
  const starts = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (ext === "pdf") return starts([0x25, 0x50, 0x44, 0x46]); // %PDF
  if (ext === "docx") return starts([0x50, 0x4b, 0x03, 0x04]); // zip container
  if (ext === "doc") return starts([0xd0, 0xcf, 0x11, 0xe0]); // OLE2
  return false;
}

export async function POST(req: Request) {
  // Reject oversized bodies before parsing (resume + text fields + headroom).
  const len = Number(req.headers.get("content-length") || 0);
  if (len > RESUME.maxBytes + 200_000) {
    return Response.json({ errors: { resume: `Resume must be ${RESUME.label}.` } }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const fields = Object.fromEntries(
    Array.from(form.entries()).filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;

  if (looksLikeBot(fields.company_site, fields.startedAt)) return Response.json({ ok: true });
  if (rateLimited(clientIp(req))) return Response.json({ error: "Too many requests." }, { status: 429 });

  const { data, errors } = validateApplication(fields);

  const file = form.get("resume");
  let attachment: { filename: string; content: string } | undefined;
  if (file && typeof file !== "string" && file.size > 0) {
    if (file.size > RESUME.maxBytes || !resumeNameOk(file.name)) {
      errors.resume = `Resume must be ${RESUME.label}.`;
    } else {
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!signatureOk(bytes, file.name)) {
        errors.resume = "That file doesn't look like a PDF or Word document.";
      } else {
        const safeName = file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 100);
        attachment = { filename: safeName, content: Buffer.from(bytes).toString("base64") };
      }
    }
  }

  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

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

  if (result === "unconfigured") return Response.json({ error: "unconfigured" }, { status: 503 });
  if (result === "failed") return Response.json({ error: "send-failed" }, { status: 502 });
  return Response.json({ ok: true });
}
