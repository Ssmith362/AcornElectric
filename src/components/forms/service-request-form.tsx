"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { publishedServiceIndex as services } from "@/content/service-index";
import { CONTACT_METHODS, LIMITS, validateInquiry, type Errors } from "@/lib/forms/rules";
import { mailto, site, tel } from "@/lib/site";
import { Field, Honeypot, SendProblem, describedBy, inputCls } from "./fields";

const OTHER = "Something else / not sure";
const options = [...services.map((s) => s.name), OTHER];

type State = "idle" | "sending" | "sent" | "unconfigured" | "failed" | "ratelimited";

/** Time the form became interactive, for the server's time trap. */
const subscribe = () => () => {};
let mountedAt = 0;
function getStartedAt() {
  if (!mountedAt) mountedAt = Date.now();
  return mountedAt;
}

export function ServiceRequestForm({
  defaultService,
  source,
  heading = "Request service",
  headingLevel = 3,
}: {
  /** Pre-selects the service when the form sits on a service page. */
  defaultService?: string;
  /** Page path, so Acorn can see which page produced the lead. */
  source: string;
  heading?: string;
  /** 2 when the form sits directly under the page's h1 (contact page). */
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const startedAt = useSyncExternalStore(subscribe, getStartedAt, () => 0);
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: defaultService && options.includes(defaultService) ? defaultService : "",
    message: "",
    contactMethod: "Phone call",
  });

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { errors: errs } = validateInquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`sr-${first}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, startedAt, company_site: fd.get("company_site") }),
      });
      if (res.ok) return setState("sent");
      if (res.status === 422) {
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
    const first = values.name.split(" ")[0];
    return (
      <div role="status" className="relative bg-mist-50 p-6 text-ink sm:p-8">
        <p className="label-mono flex items-center gap-2 text-ok">
          <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" /> Request received
        </p>
        <H className="mt-4 text-3xl font-bold">Thanks{first ? `, ${first}` : ""}. It&apos;s in.</H>
        <p className="mt-3 text-ink-soft">
          Your request about <strong>{values.service.toLowerCase()}</strong> went straight to the Acorn team. We&apos;ll
          get back to you by {values.contactMethod.toLowerCase()} to talk it through.
        </p>
        <p className="mt-4 text-sm text-ink-mute">
          If anything is sparking, smoking or smells like burning, don&apos;t wait for us: turn off the circuit if
          it&apos;s safe and call 911.
        </p>
      </div>
    );
  }

  const fallbackBody = encodeURIComponent(
    `Service: ${values.service}\nName: ${values.name}\nPhone: ${values.phone}\nAddress/ZIP: ${values.location}\n\n${values.message}`,
  );

  return (
    <form onSubmit={onSubmit} noValidate className="relative bg-mist-50 p-5 text-ink sm:p-8" aria-labelledby="sr-heading">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
        <H id="sr-heading" className="text-2xl font-bold">
          {heading}
        </H>
        <span className="label-mono hidden text-[0.6rem] text-ink-mute sm:inline">Work order · 2 min</span>
      </div>
      <Honeypot />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="sr-name" label="Your name" error={errors.name}>
          <input
            id="sr-name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("sr-name", errors.name)}
            className={inputCls}
          />
        </Field>
        <Field id="sr-phone" label="Phone" error={errors.phone}>
          <input
            id="sr-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("sr-phone", errors.phone)}
            className={inputCls}
          />
        </Field>
        <Field id="sr-email" label="Email" optional={values.contactMethod !== "Email"} error={errors.email}>
          <input
            id="sr-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("sr-email", errors.email)}
            className={inputCls}
          />
        </Field>
        <Field
          id="sr-location"
          label="Service address or ZIP"
          hint="So we can confirm we cover your area."
          error={errors.location}
        >
          <input
            id="sr-location"
            name="location"
            autoComplete="street-address"
            maxLength={LIMITS.location}
            value={values.location}
            onChange={set("location")}
            aria-invalid={!!errors.location}
            aria-describedby={describedBy("sr-location", errors.location, "So we can confirm we cover your area.")}
            className={inputCls}
          />
        </Field>
        <Field id="sr-service" label="What do you need?" error={errors.service} className="sm:col-span-2">
          <select
            id="sr-service"
            name="service"
            value={values.service}
            onChange={set("service")}
            aria-invalid={!!errors.service}
            aria-describedby={describedBy("sr-service", errors.service)}
            className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 6%22><path d=%22M1 1l4 4 4-4%22 fill=%22none%22 stroke=%22%230a110f%22 stroke-width=%221.4%22/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="sr-message"
          label="Tell us what's going on"
          hint="What's happening or what you'd like done. Panel age, equipment model or distances all help."
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="sr-message"
            name="message"
            rows={5}
            maxLength={LIMITS.message}
            value={values.message}
            onChange={set("message")}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy(
              "sr-message",
              errors.message,
              "What's happening or what you'd like done. Panel age, equipment model or distances all help.",
            )}
            className={inputCls}
          />
        </Field>
        <fieldset className="sm:col-span-2">
          <legend className="mb-1.5 text-sm font-semibold">Best way to reach you</legend>
          <div className="grid grid-cols-3 gap-2">
            {CONTACT_METHODS.map((m) => (
              <label
                key={m}
                className="flex min-h-11 cursor-pointer items-center justify-center border border-ink/20 bg-white px-2 text-center text-sm font-medium has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-mist-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-copper-500"
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={m}
                  checked={values.contactMethod === m}
                  onChange={set("contactMethod")}
                  className="sr-only"
                />
                {m}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {state === "unconfigured" || state === "failed" || state === "ratelimited" ? (
        <div className="mt-6">
          <SendProblem status={state}>
            Please call{" "}
            <a href={tel} className="font-semibold text-ink underline">
              {site.phone.value.display}
            </a>{" "}
            or{" "}
            <a href={`${mailto}?subject=${encodeURIComponent("Service request")}&body=${fallbackBody}`} className="font-semibold text-ink underline">
              email your request
            </a>{" "}
            (we&apos;ve filled in what you typed).
          </SendProblem>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-6 font-semibold text-mist-50 transition-colors hover:bg-night-700 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send request"}
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-volt-400 shadow-[0_0_8px_var(--color-volt-400)]" />
        </button>
        <p className="text-sm text-ink-mute">
          Prefer to talk?{" "}
          <a href={tel} className="font-semibold text-ink underline underline-offset-4">
            {site.phone.value.display}
          </a>
        </p>
      </div>
      <p className="mt-4 text-xs text-ink-mute">
        We use these details only to respond to your request. <Link href="/privacy" className="underline">Privacy</Link>
      </p>
    </form>
  );
}
