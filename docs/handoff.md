# Acorn Electric website: handoff

Flourish Now Digital · October 2026, updated November 13, 2026

## November 13, 2026: final quality pass (branch `final-quality-fixes`)

Built on `main` at `f0cf4d3`, the commit serving acornelectric.vercel.app.
Owner decisions applied: confirmed services, areas and careers perks (new work
vans, provided tools and materials, team book club); Google Business Profile
hours; requests and applications, with attachments, go to
eric@callacornelectric.com; some photos are stock or AI-generated and must not
be presented as Acorn's projects.

### What changed

- **No drafting notes on the site.** "To confirm" markers are now off unless
  `NEXT_PUBLIC_SHOW_REVIEW_FLAGS` is exactly `"true"`. Hours, careers and
  privacy no longer need them. Open owner questions are tracked below and in
  `client-facts-checklist.md`.
- **Hours:** Monday–Saturday 8 a.m.–5 p.m., Sunday closed (`site.hours`), on
  the contact page, in the footer and as `openingHoursSpecification` in the
  Electrician schema.
- **Careers:** the title no longer names a certificate class; the requirement
  reads "a current Washington electrician certificate for residential work".
  Unconfirmed terms are left off, and one line says employment type, pay,
  schedule and benefits aren't listed yet. JobPosting schema stays off.
- **Service request attachments** (every page with the shared form): up to 5
  JPG/PNG/WebP photos or PDFs, 4 MB total. Photos are resized in the browser
  (2000 px long edge, JPEG, metadata stripped). The server checks count, size,
  extension and file signature, makes filenames safe and attaches the files to
  the Resend email. Upload progress, per-file removal, clear errors, and
  entered text and files survive a failed send.
- **Careers resume limit 5 MB → 4 MB.** Vercel refuses request bodies over
  4.5 MB before our code runs, so a 4.6 MB resume used to fail with no useful
  message. Same signature checks as before.
- **Form validation:** phone is required for a call or text, email for email;
  whatever is typed is still checked. Required fields carry `aria-required`
  (radios use native `required`), errors and hints are both announced, focus
  moves to the first problem (also after a server 422), and the honeypot is
  `inert`.
- **Mail:** recipients default to eric@callacornelectric.com (`LEADS_TO`,
  `CAREERS_TO` override). Logs carry status codes and counts only; Resend's
  error text is no longer logged because it can echo addresses.
  `MAIL_TRANSPORT=log|fail` is a local/preview test mode, ignored on Vercel
  production.
- **Privacy notice** rewritten from the actual code: what's collected, Resend
  delivery, no website storage, photo resizing, Vercel hosting logs, the
  in-memory IP rate limit, no analytics/ads/cookies (verified in the browser:
  no cookies, no third-party requests).
- **Images:** eight photos re-encoded from Eric's larger originals
  (1536 or 2048 px, EXIF stripped). New-home page uses the finished kitchen
  instead of the empty garage. Alt text no longer claims a location ("Spokane-
  area home") or exact counts ("three pendants"). "Project showcase" →
  "Common electrical projects". Provenance rules are in `src/content/images.ts`.
- **Copy:** the five requested rewrites; "when required" on the homepage
  permit and inspection steps; commercial opener and scope line; a duplicated
  panel FAQ merged; unconfirmed "dust controlled, floors protected" claims
  replaced with cleanup (which reviews support); generic "The situation"
  heading → "About {service}"; area CTA wording aligned. Review quotes are
  untouched.
- **Motion:** a visible Pause/Play button for the review ribbons (keyboard,
  touch, mouse). Paused or under reduced motion, reviews show in full and the
  row scrolls. Review dates removed (Google's relative dates go stale).
  Print never leaves unrevealed sections blank. Scroll padding now clears the
  120 px desktop header and the phone call bar.
- **SEO / production:** see "Indexing and domains" below. Every page now has
  an explicit share image (the page-level Open Graph object had been replacing
  the generated card, so no page had one). Share card refreshed to the Option 4
  look. `/design-previews/homepage-directions` now 404s outside `next dev` (it
  loaded Google Fonts).
- **Tests:** `npm test` (Node's runner, no new dependencies): 31 tests for
  attachment rules, conditional contact rules, both endpoints with a stubbed
  Resend (delivery payload, recipients, signatures, limits, 413/415/422/502/503,
  honeypot, log hygiene, test transport) and the indexing rules per
  environment. `npm run check` now includes the tests.

### Indexing and domains

| Build | Base URL | Indexable |
|---|---|---|
| Local | https://www.callacornelectric.com | No |
| Vercel preview | the preview's own branch URL | Never, even with the flag |
| Vercel production before launch | acornelectric.vercel.app (`VERCEL_PROJECT_PRODUCTION_URL`) | No |
| Launch (`NEXT_PUBLIC_SITE_URL=https://www.callacornelectric.com`, `NEXT_PUBLIC_ALLOW_INDEXING=true`) | www | Yes, on the www host only |

Non-indexable builds allow crawling and answer `noindex` (meta + header), so
search engines can see the noindex. Any host other than www gets
`X-Robots-Tag: noindex, nofollow` from `next.config.mjs`, which keeps the
vercel.app alias out of search after launch. Checked with a launch-mode build:
www robots.txt allows `/` except `/api/` and lists the www sitemap; no noindex
on www pages except `/privacy`; alias and `/api` send noindex; the share image
and a real 404 resolve.

### Verified in this pass

- `npm run check` (case, types, lint, 31 tests, build): pass.
- `npm run check:site`: 25 pages, no problems. `npm run check:services`: pass
  (two assertions were stale on `main` and were updated: the form never had a
  service dropdown, and the generator title had changed).
- All 25 public pages at 390, 820 and 1440 px through Chrome device emulation,
  scrolled top to bottom: no horizontal overflow, broken images, console
  errors, multiple h1s or em dashes outside quotes; reveal content all shown.
- Forms in the browser with `MAIL_TRANSPORT=log`: empty submit, conditional
  phone/email, an 11 MB photo resized to 1.1 MB, PDF accepted, .docx rejected,
  simulated network failure (text and files kept, mailto fallback filled),
  retry succeeded and the server built the email with 2 attachments.
- Widgets: service carousel, quick look, community toggle, desktop dropdown on
  keyboard focus, mobile menu (Escape closes, focus inside), FAQs, phone
  accordions, review pause by keyboard.

### Still open (owner input or launch work)

**Live delivery is not verified.** The Vercel project has no environment
variables, so the forms there correctly say "NOT sent, please call". Nothing
was sent to Eric. To finish: create the Resend account, verify a sending
domain (e.g. send.callacornelectric.com) in DNS, set `RESEND_API_KEY` and
`MAIL_FROM` in Vercel, then, with Eric expecting it, send one request with two
photos and a PDF and one application with a resume, and confirm both arrive
with attachments and that Reply goes to the sender.

**Job details from Eric:** employment type, pay range, schedule, benefits,
the exact certificate requirement (02 only, or 01 as well), posting and
closing dates (needed before JobPosting schema can turn on), and whether
Washington's pay-transparency rule (RCW 49.58.110, 15+ employees) applies.
Also confirm he's happy with the photo of him and two children on /careers.

**Privacy facts for Eric to confirm:** that Acorn doesn't sell or share
contact details for marketing; how long request and application emails are
kept, and that deletion requests are handled from the inbox; who else can
read eric@callacornelectric.com; whether privacy requests should go to a
different address. Have the notice reviewed if anything else (CRM, analytics,
file storage) is added.

**Images needing better originals** (exact files in `public/images/`):

| File | Where it shows | Problem | What to send |
|---|---|---|---|
| `acorn-truck-washington-water-power.webp` (1672×941) | Homepage hero, full width | Soft on large and high-density screens; no larger original found | The original photo at ≥3200 px wide, same framing (truck right of centre). Confirm it's an unedited photo of Acorn's truck |
| `eric-beisley-service-pedestal.webp` (960×1280) | /careers hero | Original IMG_5165 is also 960×1280 | Full-size camera original, ≥1600 px tall |
| `service-mast-weatherhead.webp`, `panel-upgrade-breakers.webp`, `covered-deck-lighting.webp` (1200×1600) | Mast and inspections page heroes, lighting page | Originals in the share are also 1200×1600; fine on phones, soft on high-density desktops | Full-size camera originals of IMG_0750, IMG_5036, IMG_0714 |
| `kitchen-remodel-lighting.webp` (now the new-home image) | New custom home page | Stronger than the garage, but not established as a new build | A real Acorn new-build photo (finished exterior or interior) |
| AI stand-ins: `new-200-amp-panel`, `hot-tub-disconnect`, `outlet-fault-tracing`, `knob-and-tube-basement`, `commercial-led-lighting`, `bathroom-fan-controls`, `electrician-at-panel-careers` | Service pages, homepage rail, careers teaser | Plausible on inspection, illustrative only | Real Acorn photos of: a new panel, a hot tub disconnect, an electrician testing an outlet, knob and tube, a commercial space, a bathroom fan, the crew at work |
| `surge-protector-panel.webp`, `inspection-repair-fix.webp` | Not shown anywhere | AI artifacts (conductors across the breaker cover; unreadable report text) | Don't use; a real surge-protector photo if that slot is ever shown |

**Launch steps:** set `NEXT_PUBLIC_SITE_URL=https://www.callacornelectric.com`
and `NEXT_PUBLIC_ALLOW_INDEXING=true` on the Production environment only;
add www.callacornelectric.com and callacornelectric.com in Vercel Domains with
the apex redirecting to www (not the reverse); move DNS off Wix; then check
https://www.callacornelectric.com/robots.txt, `/sitemap.xml`,
`/opengraph-image`, a 404 URL and the page source for no `noindex`, and that
acornelectric.vercel.app still sends `X-Robots-Tag: noindex`. The older items
below (license verification, address decision, full Wix redirect map, Search
Console, Rich Results test) still apply.

---

The sections below are the October 2026 handoff, kept for history. Where they
disagree with the November section above, the November section is current.

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
- Indexing locked until launch (Nov 2026: crawl allowed, every page noindex; see above): every page is
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
API (no SDK dependency). Resumes are checked for size (≤ 4 MB since Nov 2026), extension
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
| `NEXT_PUBLIC_SHOW_REVIEW_FLAGS` | internal only | Off unless exactly `"true"` (Nov 2026). `"true"` shows "To confirm" markers and unconfirmed services/areas in a private review build |
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
- [ ] Production env: `NEXT_PUBLIC_SITE_URL=https://www.callacornelectric.com`, `NEXT_PUBLIC_ALLOW_INDEXING=true` (leave `NEXT_PUBLIC_SHOW_REVIEW_FLAGS` unset)
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
