# Acorn Electric website: notes for Claude Code

Client site built by Flourish Now Digital (Spencer Smith). Use "Flourish Now
Digital" on any client-facing output.

## Stack

- Next.js 16 App Router, TypeScript, Tailwind CSS v4. No runtime deps beyond
  next/react/react-dom without a good reason.
- Pages are statically generated; `/api/inquiry` and `/api/apply` are the only
  request-time routes. Deploy as a Node app (`npm run build` → `npm run start`).
  There is no static-export route, because the forms need the API.
- `next.config.mjs` stays plain JS (see its header comment).

## Before you call anything done

1. `npm run check` (case check, typecheck, lint, tests, build). It must pass.
2. `npm run start`, then `npm run check:site -- http://localhost:3000`.

## Where things live

- Business facts: `src/lib/site.ts` (each fact has a `verified` flag)
- Services / areas / jobs / reviews / images: `src/content/*.ts`
  (`service-index.ts` owns the 16 service names, order and three scan groups;
  `services.ts` owns server-rendered page copy. Client navigation and forms
  import only the small index. `services-added.ts` was consolidated and removed.)
- Accordion for secondary detail: `src/components/ui/accordion.tsx` (APG
  pattern; collapses on phones only, open on desktop). Use it sparingly.
- Design tokens: `src/app/globals.css` (`@theme`)
- Structured data rules: `src/lib/schema.ts`
- Handoff, launch checklist, roadmap: `docs/`

## Client facts

`docs/client-facts-checklist.md` lists every fact and its source. Never invent
a phone number, license number, address, review, rating, year founded, price,
warranty, certification, pay rate or benefit. Mark it `verified: false` or
leave it null, and the site shows a "To confirm" flag in preview builds.

## Design

"Option 4" theme (Nov 2026): calm, professional, built around the real Acorn
truck photo. Barlow Semi Condensed headings, Inter body (self-hosted, see
`src/app/fonts/README.md`); the logo keeps its own lettering (Eric approved).
Square corners, 1px rules, paper/cream surfaces, deep forest green, Acorn
orange as the only accent. Token NAMES are historical: night = forest green,
volt = orange accent for DARK surfaces, copper = orange for text on LIGHT
surfaces, mist = paper/cream. Orange buttons carry dark text (white fails AA).

Homepage order: truck hero + "Done right." process strip (`home/hero.tsx`),
the Tesla-at-Fred-Meyer intro and "What we do most" side-scroll rail
(`home/featured-services.tsx`, `home/service-deck.tsx`: always a peek of the
next card; 1 on phones, 2 on tablets, 3 on desktop; labelled "Common
electrical projects": some photos are stock or AI-generated, so never call them
Acorn's work), "We'd rather do it once." four steps
(`sections/process.tsx`), review ribbons on forest green with the squirrel
(`home/reviews.tsx`), the service-area map (`sections/area-map.tsx`, the original
circuit-trace diagram restyled to Option 4), careers teaser, and the request form CTA.

## Forms

- Shared rules: `src/lib/forms/rules.ts` (fields), `attachments.ts` (files).
  Handlers: `src/lib/forms/handlers.ts`; the API routes only re-export them.
- Attachments: 5 files, 4 MB total (Vercel's 4.5 MB request limit is the real
  ceiling). Resumes 4 MB. Never raise these without a different upload path.
- Test with `MAIL_TRANSPORT=log` in `.env.local`; never send test submissions
  to Eric. `npm test` stubs Resend.
- Keep `src/app/privacy/page.tsx` true to the code: change it in the same
  commit as any new storage, analytics or third-party service.

## SEO rules

- Indexing is off until launch. Rules and the env matrix: `src/lib/seo.ts`
  and `docs/handoff.md` (November section). Previews can never be indexed.
- One distinct search purpose per page; related small jobs can share sections.
- Current service decisions and redirects: `docs/service-consolidation-2026-10-24.md`.
- No em dashes in new customer-facing copy. No arbitrary service-count claims.
- Homes and businesses are both served; listed services are common examples.
- One community per area page; no keyword-swapped clones.
- No aggregateRating/review schema for Acorn's own reviews.
- WA contractor license number shown in header and footer.
- Before launch, map every indexed URL of the old site in `legacyRedirects`.
