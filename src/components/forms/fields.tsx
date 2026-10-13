import type { ReactNode } from "react";

/**
 * Form primitives. Every input gets a visible <label>, an optional hint, and an
 * error message wired up with aria-describedby / aria-invalid.
 */

export const inputCls =
  "block w-full rounded-sq border border-ink/20 bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-mute/70 transition-colors focus:border-copper-500 focus:outline-2 focus:outline-offset-0 focus:outline-copper-500/30 aria-[invalid=true]:border-danger";

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
  className = "",
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="label-mono text-[0.6rem] font-normal text-ink-mute">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-mute">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/** Off-screen honeypot. Real people never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input type="text" name="company_site" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function RadioPair({
  name,
  legend,
  error,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-1.5 text-sm font-semibold text-ink">{legend}</legend>
      <div className="flex gap-2">
        {["Yes", "No"].map((opt) => (
          <label
            key={opt}
            className="flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-ink/20 bg-white text-sm font-medium has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-mist-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-copper-500"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            {opt}
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

type Status = "unconfigured" | "failed" | "ratelimited";

export function SendProblem({ status, children }: { status: Status; children?: ReactNode }) {
  const head =
    status === "unconfigured"
      ? "Online sending isn't switched on yet, so this was NOT sent."
      : status === "ratelimited"
        ? "Too many attempts from this connection. Your message was NOT sent."
        : "Something went wrong and your message was NOT sent.";
  return (
    <div role="alert" className="border-l-2 border-danger bg-danger/5 p-4 text-sm text-ink">
      <p className="font-semibold">{head}</p>
      <div className="mt-1 text-ink-soft">{children}</div>
    </div>
  );
}
