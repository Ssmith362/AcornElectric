"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { certificateOptions, openings } from "@/content/careers";
import { EXPERIENCE_OPTIONS, LIMITS, RESUME, resumeNameOk, validateApplication, type Errors } from "@/lib/forms/rules";
import { mailto, site, tel } from "@/lib/site";
import { Field, Honeypot, RadioPair, SendProblem, describedBy, inputCls } from "./fields";

const GENERAL = "General interest (future openings)";

type State = "idle" | "sending" | "sent" | "unconfigured" | "failed" | "ratelimited";

const subscribe = () => () => {};
let mountedAt = 0;
const getStartedAt = () => (mountedAt ||= Date.now());

export function ApplicationForm() {
  const startedAt = useSyncExternalStore(subscribe, getStartedAt, () => 0);
  const open = openings.filter((o) => o.status === "open");
  const roles = [...open.map((o) => o.title), GENERAL];
  const fileRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [v, setV] = useState({
    opening: roles[0],
    name: "",
    email: "",
    phone: "",
    city: "",
    certificate: "",
    certNumber: "",
    experience: "",
    residentialService: "",
    driversLicense: "",
    about: "",
  });
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  function checkFile(): string | undefined {
    const f = fileRef.current?.files?.[0];
    if (!f) return undefined;
    if (f.size > RESUME.maxBytes || !resumeNameOk(f.name)) return `Resume must be ${RESUME.label}.`;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { errors: errs } = validateApplication(v);
    const fileErr = checkFile();
    if (fileErr) errs.resume = fileErr;
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`ap-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setState("sending");
    const fd = new FormData(e.currentTarget);
    fd.set("startedAt", String(startedAt));
    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      if (res.ok) return setState("sent");
      if (res.status === 422 || res.status === 413) {
        const body = await res.json().catch(() => ({}));
        setErrors(body.errors || {});
        return setState("idle");
      }
      setState(res.status === 503 ? "unconfigured" : res.status === 429 ? "ratelimited" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="bg-mist-50 p-6 text-ink sm:p-10">
        <p className="label-mono flex items-center gap-2 text-ok">
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" /> Application received
        </p>
        <h3 className="mt-4 text-3xl font-bold">Thanks, {v.name.split(" ")[0]}. We&apos;ve got it.</h3>
        <p className="mt-3 max-w-xl text-ink-soft">
          Your application for <strong>{v.opening}</strong> went straight to Acorn. Every application is read by a
          person. If it looks like a fit, we&apos;ll reach out at {v.email} or {v.phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate encType="multipart/form-data" className="relative bg-mist-50 p-5 text-ink sm:p-10" aria-labelledby="ap-heading">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
        <h3 id="ap-heading" className="text-2xl font-bold sm:text-3xl">Apply</h3>
        <span className="label-mono text-[0.6rem] text-ink-mute">About 5 minutes</span>
      </div>
      <Honeypot />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="ap-opening" label="Role" error={errors.opening} className="sm:col-span-2">
          <select id="ap-opening" name="opening" value={v.opening} onChange={set("opening")} className={inputCls}>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field id="ap-name" label="Full name" error={errors.name}>
          <input id="ap-name" name="name" autoComplete="name" maxLength={LIMITS.name} value={v.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={describedBy("ap-name", errors.name)} className={inputCls} />
        </Field>
        <Field id="ap-city" label="Where you're based" error={errors.city}>
          <input id="ap-city" name="city" autoComplete="address-level2" maxLength={LIMITS.short} value={v.city} onChange={set("city")} aria-invalid={!!errors.city} aria-describedby={describedBy("ap-city", errors.city)} className={inputCls} />
        </Field>
        <Field id="ap-email" label="Email" error={errors.email}>
          <input id="ap-email" name="email" type="email" autoComplete="email" maxLength={LIMITS.email} value={v.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={describedBy("ap-email", errors.email)} className={inputCls} />
        </Field>
        <Field id="ap-phone" label="Phone" error={errors.phone}>
          <input id="ap-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.phone} value={v.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={describedBy("ap-phone", errors.phone)} className={inputCls} />
        </Field>

        <Field id="ap-certificate" label="Washington electrician certificate" error={errors.certificate}>
          <select id="ap-certificate" name="certificate" value={v.certificate} onChange={set("certificate")} aria-invalid={!!errors.certificate} aria-describedby={describedBy("ap-certificate", errors.certificate)} className={inputCls}>
            <option value="" disabled>Choose one</option>
            {certificateOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id="ap-certNumber" label="Certificate number" optional hint="We'll verify it with L&I." error={errors.certNumber}>
          <input id="ap-certNumber" name="certNumber" maxLength={LIMITS.short} value={v.certNumber} onChange={set("certNumber")} aria-describedby={describedBy("ap-certNumber", errors.certNumber, "We'll verify it with L&I.")} className={inputCls} />
        </Field>

        <Field id="ap-experience" label="Years working as an electrician" error={errors.experience}>
          <select id="ap-experience" name="experience" value={v.experience} onChange={set("experience")} aria-invalid={!!errors.experience} aria-describedby={describedBy("ap-experience", errors.experience)} className={inputCls}>
            <option value="" disabled>Choose one</option>
            {EXPERIENCE_OPTIONS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>
        <div className="hidden sm:block" />

        <RadioPair name="residentialService" legend="Have you run residential service calls on your own?" value={v.residentialService} onChange={(x) => setV((s) => ({ ...s, residentialService: x }))} error={errors.residentialService} />
        <RadioPair name="driversLicense" legend="Do you have a valid driver's license?" value={v.driversLicense} onChange={(x) => setV((s) => ({ ...s, driversLicense: x }))} error={errors.driversLicense} />

        <Field id="ap-about" label="Tell us about your work" hint="The kind of jobs you've run, what you're proud of, and what you want next." error={errors.about} className="sm:col-span-2">
          <textarea id="ap-about" name="about" rows={6} maxLength={LIMITS.message} value={v.about} onChange={set("about")} aria-invalid={!!errors.about} aria-describedby={describedBy("ap-about", errors.about, "The kind of jobs you've run, what you're proud of, and what you want next.")} className={inputCls} />
        </Field>

        <Field id="ap-resume" label="Resume" optional hint={RESUME.label} error={errors.resume} className="sm:col-span-2">
          <input
            id="ap-resume"
            ref={fileRef}
            name="resume"
            type="file"
            accept={RESUME.accept}
            onChange={() => setErrors((e) => ({ ...e, resume: checkFile() || "" }))}
            aria-invalid={!!errors.resume}
            aria-describedby={describedBy("ap-resume", errors.resume, RESUME.label)}
            className="block w-full border border-dashed border-ink/25 bg-white p-3 text-sm file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:font-semibold file:text-mist-50"
          />
        </Field>
      </div>

      {state === "unconfigured" || state === "failed" || state === "ratelimited" ? (
        <div className="mt-6">
          <SendProblem status={state}>
            Please email your details and resume to{" "}
            <a href={`${mailto}?subject=${encodeURIComponent(`Application: ${v.opening}`)}`} className="font-semibold text-ink underline">
              {site.email.value}
            </a>{" "}
            or call{" "}
            <a href={tel} className="font-semibold text-ink underline">
              {site.phone.value.display}
            </a>
            .
          </SendProblem>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-7 font-semibold text-mist-50 transition-colors hover:bg-night-700 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send application"}
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-volt-400 shadow-[0_0_8px_var(--color-volt-400)]" />
        </button>
        <p className="text-xs text-ink-mute">
          Used only to consider you for work at Acorn. <Link href="/privacy" className="underline">Privacy</Link>
        </p>
      </div>
    </form>
  );
}
