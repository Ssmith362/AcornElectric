/**
 * Form endpoint tests. Run with `npm test` (Node's built-in runner, no extra
 * dependencies). Nothing here contacts Resend: global fetch is replaced by a
 * stub that records the payload, so no request or application is ever sent.
 */
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, test } from "node:test";
import {
  SERVICE_ATTACHMENTS,
  attachmentListError,
  kindFromBytes,
  safeFilename,
} from "../src/lib/forms/attachments.ts";
import { handleApplication, handleInquiry } from "../src/lib/forms/handlers.ts";
import { recipients, transportMode } from "../src/lib/forms/mail.ts";
import { validateInquiry } from "../src/lib/forms/rules.ts";

/* ----------------------------------------------------------------- fixtures */

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 1]);
const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13]);
const WEBP = new Uint8Array([0x52, 0x49, 0x46, 0x46, 4, 0, 0, 0, 0x57, 0x45, 0x42, 0x50, 0x56, 0x50, 0x38]);
const PDF = new TextEncoder().encode("%PDF-1.7\n%test\n");
const EXE = new Uint8Array([0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]);

const file = (bytes: Uint8Array, name: string, type = "application/octet-stream") => new File([new Uint8Array(bytes)], name, { type });
const big = (n: number, head: Uint8Array) => {
  const b = new Uint8Array(n);
  b.set(head);
  return b;
};

let ipCounter = 0;
function post(path: string, fields: Record<string, string>, files: [string, File][] = [], headers: Record<string, string> = {}) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  for (const [k, f] of files) fd.append(k, f, f.name);
  return new Request(`http://localhost${path}`, {
    method: "POST",
    body: fd,
    headers: { "x-forwarded-for": `10.0.0.${++ipCounter}`, ...headers },
  });
}

const inquiry = (over: Record<string, string> = {}) => ({
  name: "Pat Tester",
  phone: "(509) 555-0100",
  email: "",
  location: "99201",
  message: "Panel is buzzing in the garage.",
  contactMethod: "Phone call",
  source: "/contact",
  startedAt: String(Date.now() - 30_000),
  company_site: "",
  ...over,
});

const application = (over: Record<string, string> = {}) => ({
  opening: "Residential Electrician",
  name: "Sam Applicant",
  email: "sam@example.com",
  phone: "509-555-0101",
  city: "Spokane",
  certificate: "02 Residential specialty",
  certNumber: "",
  experience: "5–9 years",
  residentialService: "Yes",
  driversLicense: "Yes",
  about: "Ten years of residential service work, mostly panels and troubleshooting.",
  startedAt: String(Date.now() - 30_000),
  company_site: "",
  ...over,
});

/* ------------------------------------------------- fake Resend + env control */

type Sent = { url: string; body: Record<string, unknown> };
let sent: Sent[] = [];
let providerStatus = 200;
const realFetch = globalThis.fetch;
const savedEnv = { ...process.env };

beforeEach(() => {
  sent = [];
  providerStatus = 200;
  for (const k of ["MAIL_TRANSPORT", "LEADS_TO", "CAREERS_TO", "VERCEL_ENV"]) delete process.env[k];
  process.env.RESEND_API_KEY = "re_test_not_a_real_key";
  process.env.MAIL_FROM = "Acorn Electric website <website@send.example.test>";
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    sent.push({ url: String(url), body: JSON.parse(String(init?.body)) });
    return new Response(providerStatus === 200 ? '{"id":"test"}' : '{"message":"bad"}', { status: providerStatus });
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = realFetch;
  process.env = { ...savedEnv };
});

/* --------------------------------------------------------------- unit rules */

describe("attachment rules", () => {
  test("file signatures decide the type", () => {
    assert.equal(kindFromBytes(JPEG), "jpeg");
    assert.equal(kindFromBytes(PNG), "png");
    assert.equal(kindFromBytes(WEBP), "webp");
    assert.equal(kindFromBytes(PDF), "pdf");
    assert.equal(kindFromBytes(EXE), null);
  });

  test("filenames lose paths, odd characters and wrong extensions", () => {
    assert.equal(safeFilename("../../etc/pa<ss>wd.jpg", "jpeg"), "pa_ss_wd.jpg");
    assert.equal(safeFilename("C:\\Users\\me\\Panel photo (1).PNG", "png"), "Panel_photo_1.png");
    assert.equal(safeFilename("plans.exe", "pdf"), "plans.pdf");
    assert.equal(safeFilename("\r\nBcc: x@y.z.jpg", "jpeg"), "Bcc_x_y.z.jpg");
    assert.equal(safeFilename("....", "jpeg", "photo-1"), "photo-1.jpg");
  });

  test("count, per-file and total limits", () => {
    const ok = { name: "a.jpg", size: 500_000, kind: "jpeg" as const };
    assert.equal(attachmentListError([ok, ok, ok]), null);
    assert.match(attachmentListError(Array(SERVICE_ATTACHMENTS.maxFiles + 1).fill(ok)) ?? "", /no more than 5/);
    assert.match(attachmentListError([{ ...ok, size: SERVICE_ATTACHMENTS.maxFileBytes + 1 }]) ?? "", /larger than/);
    assert.match(attachmentListError([{ ...ok, size: 2.5 * 1024 * 1024 }, { ...ok, size: 2 * 1024 * 1024 }]) ?? "", /limit is 4\.0 MB/);
    assert.match(attachmentListError([{ name: "x.docx", size: 10, kind: null }]) ?? "", /isn't a JPG/);
  });
});

describe("contact requirements follow the chosen method", () => {
  test("phone call needs a phone, not an email", () => {
    const { errors } = validateInquiry(inquiry({ phone: "" }));
    assert.match(errors.phone, /call you back/);
    assert.equal(errors.email, undefined);
  });

  test("text needs a mobile number", () => {
    const { errors } = validateInquiry(inquiry({ phone: "", contactMethod: "Text" }));
    assert.match(errors.phone, /text you back/);
  });

  test("email needs an email, and phone becomes optional", () => {
    const missing = validateInquiry(inquiry({ phone: "", contactMethod: "Email" }));
    assert.match(missing.errors.email, /reply by email/);
    assert.equal(missing.errors.phone, undefined);
    const ok = validateInquiry(inquiry({ phone: "", email: "pat@example.com", contactMethod: "Email" }));
    assert.deepEqual(ok.errors, {});
  });

  test("anything typed is still checked", () => {
    const { errors } = validateInquiry(inquiry({ phone: "555-01", email: "nope", contactMethod: "Email" }));
    assert.ok(errors.phone);
    assert.ok(errors.email);
  });

  test("an unknown contact method falls back to phone", () => {
    const { data } = validateInquiry(inquiry({ contactMethod: "Carrier pigeon" }));
    assert.equal(data.contactMethod, "Phone call");
  });
});

/* -------------------------------------------------------- inquiry endpoint */

describe("POST /api/inquiry", () => {
  test("delivers details and attachments to Acorn's inbox by default", async () => {
    const res = await handleInquiry(
      post("/api/inquiry", inquiry({ email: "pat@example.com" }), [
        ["attachments", file(JPEG, "../panel photo.jpg", "image/jpeg")],
        ["attachments", file(PDF, "charger spec.pdf", "application/pdf")],
        ["attachments", file(PNG, "label.png", "image/png")],
      ]),
    );
    assert.equal(res.status, 200);
    assert.equal(sent.length, 1);
    const body = sent[0].body as { to: string[]; reply_to: string; text: string; attachments: { filename: string; content: string; content_type: string }[] };
    assert.equal(sent[0].url, "https://api.resend.com/emails");
    assert.deepEqual(body.to, ["eric@callacornelectric.com"]);
    assert.equal(body.reply_to, "pat@example.com");
    assert.deepEqual(
      body.attachments.map((a) => [a.filename, a.content_type]),
      [
        ["panel_photo.jpg", "image/jpeg"],
        ["charger_spec.pdf", "application/pdf"],
        ["label.png", "image/png"],
      ],
    );
    assert.deepEqual(new Uint8Array(Buffer.from(body.attachments[1].content, "base64")), PDF);
    assert.match(body.text, /Attachments: panel_photo\.jpg, charger_spec\.pdf, label\.png/);
  });

  test("LEADS_TO overrides the recipient", async () => {
    process.env.LEADS_TO = "office@example.test, eric@example.test";
    assert.deepEqual(recipients("leads"), ["office@example.test", "eric@example.test"]);
    assert.deepEqual(recipients("careers"), ["office@example.test", "eric@example.test"]);
  });

  test("works with no attachments and no email", async () => {
    const res = await handleInquiry(post("/api/inquiry", inquiry()));
    assert.equal(res.status, 200);
    assert.equal((sent[0].body as { attachments?: unknown }).attachments, undefined);
  });

  test("rejects a renamed file whose bytes aren't an image or PDF", async () => {
    const res = await handleInquiry(post("/api/inquiry", inquiry(), [["attachments", file(EXE, "photo.jpg", "image/jpeg")]]));
    assert.equal(res.status, 422);
    assert.match((await res.json()).errors.attachments, /photo\.jpg/);
    assert.equal(sent.length, 0);
  });

  test("rejects a real PDF named as a photo", async () => {
    const res = await handleInquiry(post("/api/inquiry", inquiry(), [["attachments", file(PDF, "photo.jpg")]]));
    assert.equal(res.status, 422);
  });

  test("rejects more than five files", async () => {
    const six = Array.from({ length: 6 }, (_, i) => ["attachments", file(JPEG, `p${i}.jpg`)] as [string, File]);
    const res = await handleInquiry(post("/api/inquiry", inquiry(), six));
    assert.equal(res.status, 422);
    assert.match((await res.json()).errors.attachments, /no more than 5/);
  });

  test("rejects attachments over the total limit", async () => {
    const res = await handleInquiry(
      post("/api/inquiry", inquiry(), [
        ["attachments", file(big(2_200_000, JPEG), "a.jpg")],
        ["attachments", file(big(2_200_000, PDF), "b.pdf")],
      ]),
    );
    assert.equal(res.status, 422);
    assert.match((await res.json()).errors.attachments, /limit is 4\.0 MB/);
  });

  test("answers 413 before parsing a body the host would refuse", async () => {
    const res = await handleInquiry(post("/api/inquiry", inquiry(), [], { "content-length": String(5 * 1024 * 1024) }));
    assert.equal(res.status, 413);
    assert.ok((await res.json()).errors.attachments);
  });

  test("refuses JSON now that the form is multipart", async () => {
    const res = await handleInquiry(
      new Request("http://localhost/api/inquiry", { method: "POST", body: JSON.stringify(inquiry()), headers: { "content-type": "application/json" } }),
    );
    assert.equal(res.status, 415);
  });

  test("returns field errors and sends nothing when validation fails", async () => {
    const res = await handleInquiry(post("/api/inquiry", inquiry({ phone: "", contactMethod: "Text", message: "" })));
    assert.equal(res.status, 422);
    const { errors } = await res.json();
    assert.ok(errors.phone && errors.message);
    assert.equal(sent.length, 0);
  });

  test("provider failure is reported, never shown as sent, and logs no personal data", async () => {
    providerStatus = 500;
    const logged: string[] = [];
    const orig = console.error;
    console.error = (...a: unknown[]) => void logged.push(a.map(String).join(" "));
    try {
      const res = await handleInquiry(post("/api/inquiry", inquiry({ email: "pat@example.com" }), [["attachments", file(JPEG, "a.jpg")]]));
      assert.equal(res.status, 502);
    } finally {
      console.error = orig;
    }
    assert.equal(logged.length, 1);
    assert.doesNotMatch(logged[0], /Pat|pat@example|555|99201|buzzing/);
  });

  test("missing email configuration answers 503", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await handleInquiry(post("/api/inquiry", inquiry()));
    assert.equal(res.status, 503);
    assert.equal(sent.length, 0);
  });

  test("honeypot and too-fast submissions get a quiet 200 and send nothing", async () => {
    assert.equal((await handleInquiry(post("/api/inquiry", inquiry({ company_site: "spam.example" })))).status, 200);
    assert.equal((await handleInquiry(post("/api/inquiry", inquiry({ startedAt: String(Date.now()) })))).status, 200);
    assert.equal(sent.length, 0);
  });

  test("test transport builds the message without sending; ignored on production", async () => {
    process.env.MAIL_TRANSPORT = "log";
    const info = console.info;
    console.info = () => {};
    try {
      const res = await handleInquiry(post("/api/inquiry", inquiry(), [["attachments", file(JPEG, "a.jpg")]]));
      assert.equal(res.status, 200);
      assert.equal(sent.length, 0);
      process.env.MAIL_TRANSPORT = "fail";
      assert.equal((await handleInquiry(post("/api/inquiry", inquiry()))).status, 502);
    } finally {
      console.info = info;
    }
    process.env.VERCEL_ENV = "production";
    assert.equal(transportMode(), "resend");
  });
});

/* ---------------------------------------------------------- careers endpoint */

describe("POST /api/apply", () => {
  test("delivers the application and resume to Acorn's inbox by default", async () => {
    const res = await handleApplication(post("/api/apply", application(), [["resume", file(PDF, "Sam Resume.pdf", "application/pdf")]]));
    assert.equal(res.status, 200);
    const body = sent[0].body as { to: string[]; attachments: { filename: string; content_type: string }[] };
    assert.deepEqual(body.to, ["eric@callacornelectric.com"]);
    assert.deepEqual(body.attachments.map((a) => [a.filename, a.content_type]), [["Sam_Resume.pdf", "application/pdf"]]);
  });

  test("CAREERS_TO overrides the recipient", async () => {
    process.env.CAREERS_TO = "hiring@example.test";
    await handleApplication(post("/api/apply", application()));
    assert.deepEqual((sent[0].body as { to: string[] }).to, ["hiring@example.test"]);
  });

  test("rejects a disguised resume", async () => {
    const res = await handleApplication(post("/api/apply", application(), [["resume", file(EXE, "resume.pdf")]]));
    assert.equal(res.status, 422);
    assert.match((await res.json()).errors.resume, /doesn't look like/);
  });

  test("rejects a resume over 4 MB (Vercel would refuse anything near 4.5 MB)", async () => {
    const res = await handleApplication(post("/api/apply", application(), [["resume", file(big(4 * 1024 * 1024 + 1, PDF), "cv.pdf")]]));
    assert.equal(res.status, 422);
    assert.match((await res.json()).errors.resume, /up to 4 MB/);
  });

  test("rejects unsupported resume types", async () => {
    const res = await handleApplication(post("/api/apply", application(), [["resume", file(PDF, "cv.pages")]]));
    assert.equal(res.status, 422);
  });
});
