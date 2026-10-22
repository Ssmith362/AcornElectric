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

1. `npm run check` (case check, typecheck, lint, build). It must pass.
2. `npm run start`, then `npm run check:site -- http://localhost:3000`.

## Where things live

- Business facts: `src/lib/site.ts` (each fact has a `verified` flag)
- Services / areas / jobs / reviews / images: `src/content/*.ts`
  (site order of services is the `order` list in `services.ts`; the three
  scan groups for /services and the mobile menu are `serviceGroups` there too)
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

Deliberately NOT the Everclean/EREP template: no rounded cards, no Archivo/Inter.
Square corners, 1px rules, panel-schedule and circuit-trace motifs.
Token names night/volt/copper/mist now carry Acorn's real brand colours,
sampled from the logo (Oct 2026): night = forest green, volt = electric
yellow, copper = squirrel orange, mist = light cream. Real logo and mascot
live in `public/brand/` and render through `src/components/ui/logo.tsx`.

Homepage "What we do most" is a side-scrolling card deck at every width
(`home/service-deck.tsx`: 1 card on phones, 2 on small tablets, 3 from 768px),
with the "Everything on the panel" circuit list under it on desktop. "How we
work" is one four-step section (`sections/process.tsx`), shared with service
pages; on the homepage it is a job-sheet checklist that ticks itself off on
scroll (CSS under "CHECKLIST" in globals.css; shows complete without JS or with
reduced motion). "Where we work" shows Spokane and the towns with their own
page; the rest sit behind `ui/collapsible.tsx` ("Show all 12").

## SEO rules

- Indexing is off (`NEXT_PUBLIC_ALLOW_INDEXING=false`) until launch.
- One service per page, one community per area page; no keyword-swapped clones.
- No aggregateRating/review schema for Acorn's own reviews.
- WA contractor license number shown in header and footer.
- Before launch, map every indexed URL of the old site in `legacyRedirects`.
