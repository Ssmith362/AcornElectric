import Link from "next/link";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./json-ld";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail, tone = "dark" }: { trail: Crumb[]; tone?: "dark" | "light" }) {
  const all = [{ name: "Home", path: "/" }, ...trail];
  const muted = tone === "dark" ? "text-mist-400" : "text-ink-mute";
  const current = tone === "dark" ? "text-mist-100" : "text-ink";
  return (
    <>
      <nav aria-label="Breadcrumb" className="label-mono">
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${muted}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={current}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-4 hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden="true" className="text-copper-400">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
