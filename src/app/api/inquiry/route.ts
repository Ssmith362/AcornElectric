import { clientIp, looksLikeBot, rateLimited } from "@/lib/forms/guard";
import { sendMail } from "@/lib/forms/mail";
import { validateInquiry } from "@/lib/forms/rules";

/**
 * Service inquiry endpoint. The only part of the customer journey that runs at
 * request time; everything else is prerendered.
 *
 * Responses the form understands:
 *   200 { ok: true }                 sent (or silently dropped bot)
 *   422 { errors: {field: message} } validation failed
 *   429                              too many submissions
 *   503 { error: "unconfigured" }    email not set up: form says "please call"
 *   502                              email provider failed: form says "please call"
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  if (looksLikeBot(body.company_site, body.startedAt)) return Response.json({ ok: true });
  if (rateLimited(clientIp(req))) return Response.json({ error: "Too many requests." }, { status: 429 });

  const { data, errors } = validateInquiry(body);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const result = await sendMail({
    to: "leads",
    subject: `Website inquiry: ${data.service || "General request"} (${data.name})`,
    replyTo: data.email || undefined,
    rows: [
      ["Service page", data.service || "none (general form)"],
      ["Name", data.name],
      ["Phone", data.phone],
      ["Email", data.email || "not given"],
      ["Address / ZIP", data.location],
      ["Prefers", data.contactMethod || "no preference"],
      ["Details", data.message],
      ["Sent from page", data.source || "unknown"],
    ],
  });

  if (result === "unconfigured") return Response.json({ error: "unconfigured" }, { status: 503 });
  if (result === "failed") return Response.json({ error: "send-failed" }, { status: 502 });
  return Response.json({ ok: true });
}
