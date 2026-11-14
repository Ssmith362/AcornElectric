import "server-only";
import { site } from "../site.ts";

/**
 * Sends form submissions by email through Resend (https://resend.com), using
 * its HTTP API directly, so no extra dependency.
 *
 * Environment variables (server-only, never NEXT_PUBLIC_):
 *   RESEND_API_KEY   API key from Resend
 *   MAIL_FROM        Verified sender, e.g. "Acorn Electric website <website@send.callacornelectric.com>"
 *   LEADS_TO         Service requests. Defaults to Acorn's business inbox (site.email).
 *   CAREERS_TO       Applications. Defaults to LEADS_TO, then the business inbox.
 *
 * If the key or sender is missing, sendMail() returns "unconfigured" and the
 * API answers 503, so the visitor is told plainly to call instead. Nothing is
 * ever reported as sent when it wasn't.
 *
 * TEST MODE (local and preview only): MAIL_TRANSPORT=log builds the full
 * message, sends nothing, and logs only counts and sizes. MAIL_TRANSPORT=fail
 * simulates a provider failure so the form's error state can be checked.
 * Both are ignored on Vercel production deployments.
 *
 * Logs never contain names, contact details, message text or file contents.
 */

export type MailResult = "sent" | "unconfigured" | "failed";

export type Attachment = { filename: string; content: string /* base64 */; contentType?: string };

export type MailInput = {
  to: "leads" | "careers";
  subject: string;
  rows: [string, string][];
  replyTo?: string;
  attachments?: Attachment[];
};

type Env = Record<string, string | undefined>;

export function recipients(kind: MailInput["to"], env: Env = process.env) {
  const leads = env.LEADS_TO?.trim() || site.email.value;
  const list = kind === "careers" ? env.CAREERS_TO?.trim() || leads : leads;
  return list
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function transportMode(env: Env = process.env): "resend" | "log" | "fail" {
  if (env.VERCEL_ENV === "production") return "resend";
  return env.MAIL_TRANSPORT === "log" ? "log" : env.MAIL_TRANSPORT === "fail" ? "fail" : "resend";
}

/** The exact JSON body sent to Resend. Exported so tests can inspect it. */
export function buildPayload(opts: MailInput, from: string, to: string[]) {
  const text = opts.rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:15px system-ui,sans-serif">${opts.rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#56665c;vertical-align:top;white-space:nowrap"><strong>${esc(k)}</strong></td><td style="color:#082019;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
  return {
    from,
    to,
    subject: opts.subject.replace(/[\r\n]+/g, " ").slice(0, 200),
    text,
    html,
    ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    ...(opts.attachments?.length
      ? {
          attachments: opts.attachments.map((a) => ({
            filename: a.filename,
            content: a.content,
            ...(a.contentType ? { content_type: a.contentType } : {}),
          })),
        }
      : {}),
  };
}

export async function sendMail(opts: MailInput, env: Env = process.env): Promise<MailResult> {
  const mode = transportMode(env);
  const files = opts.attachments ?? [];
  const bytes = files.reduce((t, a) => t + Math.floor((a.content.length * 3) / 4), 0);

  if (mode === "log") {
    buildPayload(opts, env.MAIL_FROM || "test@example.invalid", recipients(opts.to, env));
    console.info(`[mail:test] ${opts.to} message built, not sent (${opts.rows.length} fields, ${files.length} attachments, ~${bytes} bytes)`);
    return "sent";
  }
  if (mode === "fail") {
    console.info(`[mail:test] ${opts.to} simulated provider failure`);
    return "failed";
  }

  const key = env.RESEND_API_KEY;
  const from = env.MAIL_FROM;
  const to = recipients(opts.to, env);
  if (!key || !from || !to.length) return "unconfigured";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(opts, from, to)),
    });
    if (!res.ok) {
      // Status only: Resend's error text can echo addresses from the request.
      console.error(`Resend rejected ${opts.to} email: HTTP ${res.status} (${files.length} attachments, ~${bytes} bytes)`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error(`Resend request failed for ${opts.to} email: ${err instanceof Error ? err.name : "unknown error"}`);
    return "failed";
  }
}

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
