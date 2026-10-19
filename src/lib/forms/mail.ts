import "server-only";

/**
 * Sends form submissions by email through Resend (https://resend.com), using
 * its HTTP API directly, so no extra dependency.
 *
 * Required environment variables (server-only, never NEXT_PUBLIC_):
 *   RESEND_API_KEY   API key from Resend
 *   MAIL_FROM        Verified sender, e.g. "Acorn Electric website <website@send.callacornelectric.com>"
 *   LEADS_TO         Where service inquiries go
 *   CAREERS_TO       Where applications go (falls back to LEADS_TO)
 *
 * If any are missing, sendMail() returns "unconfigured" and the API answers
 * 503, so the visitor is told plainly to call instead. Nothing is ever
 * reported as sent when it wasn't.
 */

export type MailResult = "sent" | "unconfigured" | "failed";

type Attachment = { filename: string; content: string /* base64 */ };

export async function sendMail(opts: {
  to: "leads" | "careers";
  subject: string;
  rows: [string, string][];
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const leads = process.env.LEADS_TO;
  const to = opts.to === "careers" ? process.env.CAREERS_TO || leads : leads;
  if (!key || !from || !to) return "unconfigured";

  const text = opts.rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:15px system-ui,sans-serif">${opts.rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#56665c;vertical-align:top;white-space:nowrap"><strong>${esc(k)}</strong></td><td style="color:#082019;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: opts.subject,
        text,
        html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        ...(opts.attachments?.length ? { attachments: opts.attachments } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend rejected email", res.status, await res.text());
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("Resend request failed", err);
    return "failed";
  }
}

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
