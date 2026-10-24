# Acorn Electric website: handoff

Flourish Now Digital · October 2026

## 1. Architecture and design

**Stack:** Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4.
Runtime dependencies are only `next`, `react`, `react-dom`. Fonts are
self-hosted. Every page is prerendered at build time; the two form endpoints
(`/api/inquiry`, `/api/apply`) are the only code that runs per request.

**Deploy as a Node app** (Vercel, or Hostinger Business/Cloud with Node):
`npm run build` then `npm run start`. Unlike the Everclean/EREP builds there is
no static-export route, because the forms need a server.

**Content is data, not markup.** Pages are templates fed by:

| File | Controls |
|---|---|
| `src/lib/site.ts` | Name, phone, email, license, address, hours, socials, Google links. Each fact has a `verified` flag |
| `src/content/services.ts` | Every service page: copy, FAQs, related services, `confirmed` flag |
| `src/content/areas.ts` | Service-area pages and other communities |
| `src/content/careers.ts` | Job openings: `open` / `paused` / `closed`, pay and posting details |
| `src/content/reviews.ts` | Real customer reviews (empty until supplied) |
| `src/content/images.ts` | Every image slot; set `src` to swap a placeholder for a real photo |

**Design system** (`src/app/globals.css`): a temporary identity built to be
clearly different from the Everclean and EREP sites, and easy to re-skin
when Acorn's brand kit arrives:

- Palette: *night* (deep green-black stage), *volt* (live-wire chartreuse, used
  only as light: a lit word, a status dot, a trace), *copper* (the acorn and
  the conductor: numbers and hairlines), *mist* (cool light surface).
- Type: Bricolage Grotesque (display), Geist (body), Geist Mono (small labels).
- Shape: square corners and 1px rules; no rounded card grids.
- Signature motifs: the **panel schedule** (services index drawn as a breaker
  directory whose "breaker" lights up on hover), a **circuit trace** with
  animated current, registration-mark photo frames, an "example job ticket" in
  the hero, and a not-to-scale **circuit diagram of the service area**.
- Motion: reveal-on-scroll and current flow, all disabled under
  `prefers-reduced-motion`. Content is visible without JavaScript.
- Placeholders: drawn line illustrations per subject, each visibly labelled
  "Placeholder" with a shot brief for the real photo. Nothing pretends to be an
  Acorn job.

**Homepage journey:** hero (outcome headline, request + call) → "Sound
familiar?" (the Fred Meyer/Tesla story + six customer problems, each linked
to its page) → featured services (EV, panels, hot tubs) + full panel schedule →
how we work (five non-negotiables) → reviews (hidden until real ones exist) →
4-step process → service-area diagram → careers teaser → request form.

## 2. Pages

| URL | Notes |
|---|---|
| `/` | Homepage |
| `/services` | Overview with panel schedule and summaries |
| `/services/electrical-repair` | Focused service page |
| `/services/electrical-panel-upgrades` | Focused service page |
| `/services/ev-charger-installation` | Focused service page |
| `/services/generator-installation` | Focused service page |
| `/services/ceiling-fan-installation` | Focused service page |
| `/services/commercial-electrical` | Focused service page |
| `/services/bathroom-fan-replacement` | Focused service page |
| `/services/lighting-installation` | Focused service page |
| `/services/hot-tub-wiring` | Focused service page |
| `/services/knob-and-tube-rewiring` | Focused service page |
| `/services/electrical-inspections` | Focused service page |
| `/services/dedicated-appliance-circuits` | Focused service page |
| `/services/subpanel-installation` | Focused service page |
| `/services/remodel-and-addition-wiring` | Focused service page |
| `/services/new-home-electrical` | Focused service page |
| `/services/service-mast-repair` | Focused service page |
| `/areas` | Service-area overview with Spokane section |
| `/areas/north-spokane`, `/areas/mead`, `/areas/spokane-valley` | Confirmed service-area pages |
| `/careers` | Culture, opening, application form |
| `/contact` | Request form, phone, email, hours, areas, license |
| `/privacy` | Plain-language notice (noindex) |
| 404 | Custom "open circuit" page with service links |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image` | Generated |

Each service page: unique title/description/H1, customer-situation intro, signs
you need it, what the work involves, code/safety/permit notes, what shapes the
scope, what to send us, the shared 4-step process, FAQs, related services, and a
request form pre-set to that service.

## 3. SEO features

- Unique `<title>`, meta description, canonical, Open Graph and Twitter card on
  every page; a generated 1200×630 share image.
- `BASE_URL` from `NEXT_PUBLIC_SITE_URL`, so previews never claim to be the
  live site.
- Indexing locked until launch: `robots.txt` disallows all and every page is
  `noindex` while `NEXT_PUBLIC_ALLOW_INDEXING` isn't `"true"`.
- Sitemap lists only confirmed, indexable pages.
- Structured data: `Electrician` (verified facts only: no address until
  resolved, no hours, no ratings), `Service` per service, `BreadcrumbList`,
  `FAQPage`, `WebSite`. `JobPosting` is emitted only when a posting has dates,
  type and pay (currently not).
- 301s for known old URLs (`/about` → `/`, `/book-online` → `/contact`) in
  `legacyRedirects` (`next.config.mjs`). **The full old-site crawl is still
  needed** (see blockers).
- Contractor license number in the header strip (tablet/desktop) and footer
  (all sizes), as Washington requires on advertising.
- Real 404 status for unknown URLs; breadcrumbs with schema; descriptive URLs.
- `npm run check:site` crawls the running site and fails on missing or
  duplicate titles/descriptions, bad canonicals, multiple H1s, skipped heading
  levels, unparseable JSON-LD, images without alt, and broken internal links.

Strategy, competitor notes and the keyword map: `docs/seo-strategy.md`.

## 4. Contact and careers forms

Both are real forms with client- **and** server-side validation sharing one
rule file (`src/lib/forms/rules.ts`).

**Service request** (homepage, every service/area page, `/contact`): name,
phone, email (required only if "Email" is the preferred contact method),
service address or ZIP, service (pre-selected on service pages), description,
preferred contact method. Each lead records the page it came from.

**Careers application** (`/careers`): role, name, location, email, phone, WA
certificate type and number, years of experience, residential service
experience (yes/no), driver's license (yes/no), about your work, optional
resume.

**Delivery:** submissions are emailed via [Resend](https://resend.com)'s HTTP
API (no SDK dependency). Resumes are checked for size (≤ 5 MB), extension
**and** file signature (real PDF/DOC/DOCX), then attached to the email: never
written to the server's disk.

**Abuse protection:** honeypot field, minimum time-to-submit, per-IP rate limit
(5 per 10 minutes, per server instance), input length caps, header-injection
guard, HTML-escaped email body. If spam still gets through, add Cloudflare
Turnstile.

**Honesty:** if email isn't configured, the API returns 503 and the visitor
sees "Online sending isn't switched on yet, so this was NOT sent", with the
phone number and a pre-filled email link. Provider errors show the same. A
success message only appears after the email provider accepts the message.

## 5. Environment variables and integrations

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | all | Canonical base URL. Preview URL on previews |
| `NEXT_PUBLIC_ALLOW_INDEXING` | prod only | `"true"` only on the launch deploy |
| `NEXT_PUBLIC_SHOW_REVIEW_FLAGS` | prod only | `"false"` hides "To confirm" markers **and** removes unconfirmed services/areas. Only after the checklist is done |
| `RESEND_API_KEY` | server secret | Resend API key |
| `MAIL_FROM` | server | Verified sender, e.g. `Acorn Electric website <website@send.callacornelectric.com>` |
| `LEADS_TO` | server | Inbox(es) for service requests (comma-separated) |
| `CAREERS_TO` | server | Inbox for applications (falls back to `LEADS_TO`) |

**Resend setup (about 20 minutes, needs DNS access for callacornelectric.com):**
create the account → add domain `send.callacornelectric.com` → add the DNS
records it shows → create an API key → set the variables above in the host →
redeploy → send a real test from `/contact` and `/careers` (with a PDF) and
confirm both arrive.

Not yet connected (need Acorn's accounts): Google Search Console, GA4 or
another analytics tool (with consent if required), Google Business Profile.

## 6. Client facts and assets still needed

Full list with sources: **`docs/client-facts-checklist.md`**. Headlines:
the public address decision, license verification, lead inbox, hours, which
areas are served, whether exterior lighting is offered, pay/type/benefits for
the job, Google Business Profile + review links, real reviews, logo files and
brand kit, and real photos (13 slots with briefs in `src/content/images.ts`).

## 7. Launch blockers and open issues

1. **Repository.** Code lives in `Ssmith362/AcornElectric`. Note the repo is
   **public**; no secrets are committed (`.env*` is ignored), but switch it to
   private if Acorn prefers.
2. **Address conflict** unresolved; no address in schema or on the page.
3. **License number** sourced from a third party; verify on L&I.
4. **Old-site redirects.** The current site couldn't be crawled from the build
   environment. Export every indexed URL (Search Console → Pages, or a crawler)
   and map each in `legacyRedirects`. The Netlify draft
   (acorn-electric.netlify.app) couldn't be reviewed either.
5. **Email delivery** not configured (forms correctly refuse to fake success).
6. **Service areas** unconfirmed, so no area pages go live until confirmed.
7. **Photos and logo** are placeholders.
8. Reviews section hidden until real reviews are added.
9. Competitor research was from search summaries only (live sites and SERP
   data blocked); validate against real SERPs and Search Console.
10. The in-memory rate limit is per server instance; fine for this traffic,
    but use Turnstile if spam appears.

## 8. Pre-launch checklist

- [ ] Every 🟡/❌ item in `docs/client-facts-checklist.md` resolved
- [ ] Real logo in `src/components/ui/logo.tsx`; brand tokens updated if a kit exists
- [ ] Priority photos in `src/content/images.ts` (hero, EV, panel, hot tub, van, crew), with real alt text
- [ ] Resend configured; live test of both forms (including a resume) received
- [ ] Old site crawled; every URL in `legacyRedirects`; tested with `curl -I`
- [ ] `NEXT_PUBLIC_SITE_URL` set to the final canonical host (www or not, matching DNS redirects)
- [ ] Production env: `NEXT_PUBLIC_ALLOW_INDEXING=true`, `NEXT_PUBLIC_SHOW_REVIEW_FLAGS=false`
- [ ] `npm run check` passes; `npm run check:site -- <production URL>` passes
- [ ] Structured data spot-checked in Google's Rich Results Test and schema.org validator
- [ ] Search Console verified, sitemap submitted; analytics + call/form conversions set up
- [ ] Google Business Profile updated to match the site (name, phone, website, categories, areas)
- [ ] Phone link tested on a real phone; mobile call bar visible on every page
- [ ] Old host switched off only after redirects are verified live

## 9. 12-month local SEO roadmap

See `docs/seo-strategy.md` → "12-month roadmap": foundation and NAP cleanup
(months 0–1), reviews and local signals (2–4), content depth driven by Search
Console (4–8), seasonal pushes and local links (8–12), with monthly reporting
on leads, booked jobs, clicks, GBP actions, reviews and applications.

## 10. Build and test results (final run, October 2026)

| Command | Result |
|---|---|
| `npm run check:case` | OK, 56 source files, no case/resolution problems |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, no warnings |
| `npm run build` | Pass: 24 routes (all pages static/SSG, 2 API routes dynamic) |
| `npm run check:site` (preview build) | OK: 19 pages, no problems |
| `npm run check:site` (launch-mode build: indexing on, flags off) | OK: 15 pages; unconfirmed pages return 404 with no links pointing at them; robots allows crawl; flags absent |
| axe-core 4.10 (10 pages × 390px and 1440px) | 0 violations |
| Form tests (Playwright) | Empty submit shows 5 inline errors and focuses the first; valid submit without email config → 503 + "NOT sent" message; success state renders on 200; service pages pre-select their service; disguised `.pdf` rejected server-side (422); honeypot and too-fast bots get a silent 200; invalid → 422; malformed → 400 |
| Redirects | `/about` → 301 `/`; `/book-online` → 301 `/contact` |
| Visual review | Desktop 1440, tablet 768, phone 390: no horizontal overflow, no console errors; mobile menu opens and closes with Escape |

## October 24 service consolidation

The catalog is now 16 pages. See `service-consolidation-2026-10-24.md` for
removed URLs, 301 destinations and the reasoning behind the merges. All menus,
forms, related links and sitemap use the current catalog. `service-index.ts`
is the small client-safe metadata list; full service copy stays in server pages.

After building and starting the site, run `npm run check:services -- URL` as
well as `npm run check:site -- URL`. The migration check covers the 16 sitemap
URLs, all seven old service redirects and their fragment targets, new search
titles, form selections, and exclusion of long service copy from loaded client
JavaScript. It makes no live enquiry submissions.
