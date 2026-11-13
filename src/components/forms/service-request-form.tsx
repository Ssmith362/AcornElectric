"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { SERVICE_ATTACHMENTS } from "@/lib/forms/attachments";
import { CONTACT_METHODS, LIMITS, contactRequirements, validateInquiry, type Errors } from "@/lib/forms/rules";
import { mailto, site, tel } from "@/lib/site";
import { AttachmentPicker, type PickedFile } from "./attachment-picker";
import { Field, Honeypot, RequiredNote, SendProblem, describedBy, inputCls } from "./fields";
import { postForm } from "./post-form";

type State = "idle" | "sending" | "sent" | "unconfigured" | "failed" | "ratelimited";

/** Time the form became interactive, for the server's time trap. */
const subscribe = () => () => {};
let mountedAt = 0;
function getStartedAt() {
  if (!mountedAt) mountedAt = Date.now();
  return mountedAt;
}

/** Field order on screen, so focus goes to the first problem. */
const ORDER = ["name", "contactMethod", "phone", "email", "location", "message", "attachments"] as const;

export function ServiceRequestForm({
  defaultService,
  source,
  heading = "Request service",
  headingLevel = 3,
  idPrefix = "sr",
}: {
  /** Service page the form sits on. Sent with the request as context; the form itself has no service picker. */
  defaultService?: string;
  /** Page path, so Acorn can see which page produced the lead. */
  source: string;
  heading?: string;
  /** 2 when the form sits directly under the page's h1 (contact page). */
  headingLevel?: 2 | 3;
  /** Keeps ids unique if a page ever renders two forms. */
  idPrefix?: string;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const p = idPrefix;
  const startedAt = useSyncExternalStore(subscribe, getStartedAt, () => 0);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [preparing, setPreparing] = useState(false);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: defaultService ?? "",
    message: "",
    contactMethod: "Phone call",
  });

  const need = contactRequirements(values.contactMethod);
  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  function focusFirst(errs: Errors) {
    const first = ORDER.find((k) => errs[k]);
    if (!first) return;
    const el =
      first === "contactMethod"
        ? formRef.current?.querySelector<HTMLInputElement>(`input[name="contactMethod"]:checked`)
        : document.getElementById(`${p}-${first}`);
    el?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (preparing || state === "sending") return;
    const { errors: errs } = validateInquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirst(errs);
      return;
    }

    const fd = new FormData();
    for (const [k, v] of Object.entries(values)) fd.set(k, v);
    fd.set("source", source);
    fd.set("startedAt", String(startedAt));
    fd.set("company_site", String(new FormData(e.currentTarget).get("company_site") ?? ""));
    for (const f of files) fd.append(SERVICE_ATTACHMENTS.field, f.file, f.file.name);

    setProgress(0);
    setState("sending");
    const res = await postForm("/api/inquiry", fd, files.length ? setProgress : undefined);
    if (res.status === 200) return setState("sent");
    if (res.status === 422 || res.status === 413) {
      const serverErrors = (res.data.errors as Errors) || { attachments: "The files couldn't be sent. Remove one and try again." };
      setErrors(serverErrors);
      setState("idle");
      focusFirst(serverErrors);
      return;
    }
    setState(res.status === 503 ? "unconfigured" : res.status === 429 ? "ratelimited" : "failed");
  }

  if (state === "sent") {
    const first = values.name.split(" ")[0];
    const how =
      values.contactMethod === "Email" ? "by email" : values.contactMethod === "Text" ? "by text" : "with a phone call";
    return (
      <div role="status" className="relative bg-mist-50 p-6 text-ink sm:p-8">
        <p className="label-mono flex items-center gap-2 text-ok">
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" /> Request received
        </p>
        <H className="mt-4 text-3xl font-bold">Thanks{first ? `, ${first}` : ""}. It&apos;s in.</H>
        <p className="mt-3 text-ink-soft">
          Your request{files.length ? ` and ${files.length === 1 ? "1 attachment" : `${files.length} attachments`}` : ""} went
          to the Acorn team. We&apos;ll get back to you {how} to discuss the project.
        </p>
        <p className="mt-4 text-sm text-ink-mute">
          If anything is sparking, smoking or smells like burning, don&apos;t wait for us: turn off the circuit if
          it&apos;s safe and call 911.
        </p>
      </div>
    );
  }

  const sending = state === "sending";
  const fallbackBody = encodeURIComponent(
    `Name: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\nAddress/ZIP: ${values.location}\nBest way to reach me: ${values.contactMethod}\n\n${values.message}${
      files.length ? "\n\n(I'll attach my photos/PDFs to this email.)" : ""
    }`,
  );

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative bg-mist-50 p-5 text-ink sm:p-8"
      aria-labelledby={`${p}-heading`}
      aria-busy={sending}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <H id={`${p}-heading`} className="text-[1.6rem] leading-tight text-night-900">
          {heading}
        </H>
        <span className="label-mono hidden text-[0.6rem] text-ink-mute sm:inline">Work order · 2 min</span>
      </div>
      <RequiredNote />
      <Honeypot />
      {/* The page this form sits on, sent as context. Visible in the HTML so it can be checked. */}
      <input type="hidden" name="service" value={values.service} />

      <fieldset disabled={sending} className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id={`${p}-name`} label="Your name" error={errors.name} className="sm:col-span-2">
          <input
            id={`${p}-name`}
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={set("name")}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy(`${p}-name`, errors.name)}
            className={inputCls}
          />
        </Field>

        <fieldset className="sm:col-span-2" aria-describedby={`${p}-method-hint`}>
          <legend className="mb-1.5 text-sm font-semibold">Best way to reach you</legend>
          <div className="grid grid-cols-3 gap-2">
            {CONTACT_METHODS.map((m) => (
              <label
                key={m}
                className="flex min-h-11 cursor-pointer items-center justify-center border border-ink/20 bg-peach-50 px-2 text-center text-sm font-medium has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-mist-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-copper-500"
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={m}
                  checked={values.contactMethod === m}
                  onChange={(e) => {
                    set("contactMethod")(e);
                    // A requirement that no longer applies shouldn't keep showing.
                    setErrors(({ phone, email, ...rest }) => ({
                      ...rest,
                      ...(phone && values.phone ? { phone } : {}),
                      ...(email && values.email ? { email } : {}),
                    }));
                  }}
                  className="sr-only"
                />
                {m}
              </label>
            ))}
          </div>
          <p id={`${p}-method-hint`} className="mt-1.5 text-sm text-ink-mute">
            {need.email
              ? "We'll reply by email, so an email address is needed. Phone is optional."
              : values.contactMethod === "Text"
                ? "We'll text you back, so a mobile number is needed. Email is optional."
                : "We'll call you back, so a phone number is needed. Email is optional."}
          </p>
        </fieldset>

        <Field id={`${p}-phone`} label={values.contactMethod === "Text" ? "Mobile phone" : "Phone"} optional={!need.phone} error={errors.phone}>
          <input
            id={`${p}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={set("phone")}
            aria-required={need.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy(`${p}-phone`, errors.phone)}
            className={inputCls}
          />
        </Field>
        <Field id={`${p}-email`} label="Email" optional={!need.email} error={errors.email}>
          <input
            id={`${p}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={set("email")}
            aria-required={need.email}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy(`${p}-email`, errors.email)}
            className={inputCls}
          />
        </Field>
        <Field
          id={`${p}-location`}
          label="Service address or ZIP"
          hint="So we can confirm we cover your area."
          error={errors.location}
          className="sm:col-span-2"
        >
          <input
            id={`${p}-location`}
            name="location"
            autoComplete="street-address"
            maxLength={LIMITS.location}
            value={values.location}
            onChange={set("location")}
            aria-required="true"
            aria-invalid={!!errors.location}
            aria-describedby={describedBy(`${p}-location`, errors.location, "So we can confirm we cover your area.")}
            className={inputCls}
          />
        </Field>
        <Field
          id={`${p}-message`}
          label="Tell us what's going on"
          hint="What's happening or what you'd like done. A sentence or two is plenty."
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id={`${p}-message`}
            name="message"
            rows={5}
            maxLength={LIMITS.message}
            value={values.message}
            onChange={set("message")}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy(
              `${p}-message`,
              errors.message,
              "What's happening or what you'd like done. A sentence or two is plenty.",
            )}
            className={inputCls}
          />
        </Field>

        <AttachmentPicker
          id={`${p}-attachments`}
          files={files}
          onFilesChange={setFiles}
          error={errors.attachments || undefined}
          onError={(message) => setErrors((x) => ({ ...x, attachments: message }))}
          onBusyChange={setPreparing}
          disabled={sending}
        />
      </fieldset>

      {state === "unconfigured" || state === "failed" || state === "ratelimited" ? (
        <div className="mt-6">
          <SendProblem status={state}>
            Everything you entered is still here, so you can try again. Or call{" "}
            <a href={tel} className="font-semibold text-ink underline">
              {site.phone.value.display}
            </a>
            , or{" "}
            <a href={`${mailto}?subject=${encodeURIComponent("Service request")}&body=${fallbackBody}`} className="font-semibold text-ink underline">
              email your request
            </a>{" "}
            (we&apos;ve filled in what you typed{files.length ? "; attach your files to that email" : ""}).
          </SendProblem>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending || preparing}
          className="inline-flex min-h-12 items-center justify-between gap-8 bg-volt-500 px-6 font-semibold text-night-950 transition-colors hover:bg-night-900 hover:text-mist-100 disabled:opacity-60"
        >
          {sending
            ? files.length && progress < 1
              ? `Uploading… ${Math.round(progress * 100)}%`
              : "Sending…"
            : preparing
              ? "Preparing files…"
              : state === "idle"
                ? "Send request"
                : "Try sending again"}
          <span aria-hidden="true" className="text-base">↗</span>
        </button>
        <p className="text-sm text-ink-mute">
          Prefer to talk?{" "}
          <a href={tel} className="font-semibold text-ink underline underline-offset-4">
            {site.phone.value.display}
          </a>
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {sending ? (files.length ? "Sending your request and files." : "Sending your request.") : ""}
      </p>
      <p className="mt-4 text-xs text-ink-mute">
        We use these details and files only to respond to your request. <Link href="/privacy" className="underline">Privacy</Link>
      </p>
    </form>
  );
}
