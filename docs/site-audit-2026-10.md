# Site audit: October 22, 2026 (before changes)

Flourish Now Digital. Audited commit `80a390e` (the build live at
acornelectric.vercel.app). The live preview's careers page text matched the
local build exactly; the live site could not be screenshotted from the audit
environment (network policy), so visuals come from the local production build.

Method: `npm run check`, `npm run check:site` (28 pages), full-page captures at
1440×900, 768×1024 and 390×844 of home, services, three service pages, areas,
Mead, careers, contact, privacy and 404; axe-core 4.10 (WCAG 2.2 AA +
best practice) on seven pages at all three widths.

## Page length (390px mobile, before)

| Page | Height | Screens (844px) |
|---|---|---|
| Home | 16,819px | ~20 |
| /services | 13,870px | ~16 |
| EV charger page | 13,502px | ~16 |
| Knob & tube page | 12,492px | ~15 |
| /careers | 8,639px | ~10 |
| /contact | 4,492px | ~5 (form starts ~1,000px down) |

## Findings

### Content and accuracy
1. **Lowercased acronyms** on all 19 service pages: headings built with
   `short.toLowerCase()` read "Questions people ask about ev chargers" and
   "Let's talk about your ev chargers".
2. **Empty job details in production.** On /careers, Type / Pay / Schedule only
   show a "To confirm" flag. With review flags off (production), the labels
   render with nothing under them.
3. **Review flags are visible on the public preview** (5 on /careers, hours on
   /contact) because the Vercel project doesn't set
   `NEXT_PUBLIC_SHOW_REVIEW_FLAGS`. Expected for a preview; decide before
   sharing the link widely.
4. "WA licensed contractor" (home hero) and the license number in header and
   footer are shown as fact, but the checklist still marks the number 🟡
   (third-party source only). Needs Eric to verify on L&I. Not changed.
5. Google Business Profile shows 3707 E Decatur Ave #2; the old site shows
   4615 E 6th Ave. No address is published on the new site (correct), but the
   conflict is unresolved.

### Consistency
6. "How it works" shows a decorative "04" on the homepage only; every other
   section had its index number removed.
7. Footer areas link to `/areas#<town>` anchors; the anchors exist (checked).
8. Service names: nav uses short names, cards use full names. Consistent
   within each context; no change needed.

### Mobile length and hierarchy
9. **Home repeats the service list three times**: six problem statements, three
   large feature blocks (photo + lede + bullets each ~1,100px), then all 19
   services one per row (~1,000px).
10. **/services shows every service twice**: the 19-row list in the hero, then
    19 full-width photo cards (~400px each on mobile) in one ungrouped run.
11. **Service pages**: the generic four-step process (identical on all 19 pages)
    takes ~900px on mobile; "Code, safety and permits" and "What shapes the
    scope" are full cards that are secondary detail for most readers.
12. **Footer** lists 19 services and 12 towns one per line: ~1,600px on every
    page at 390px.
13. **Contact**: on mobile the form, the page's main action, sits below the
    intro, phone, email, hours, a 12-town sentence, license and safety note.
14. Section padding is 80px top and bottom on mobile for most sections.
15. Careers teaser shows a placeholder van drawing at full width on mobile and
    tablet.

### Responsive
16. Tablet (768): "How it works" squeezes four columns; display-font headings
    wrap to three lines.
17. No horizontal overflow at any width on any audited page.

### Accessibility
18. **Review marquee** moves automatically with no pause control except mouse
    hover (WCAG 2.2.2 Pause, Stop, Hide). Touch and keyboard users can't stop it.
19. **Contrast** (axe, serious): review metadata (`text-ink/45`, `/55`, `/60`)
    fails on white and cream at all widths.
20. Footer list links are about 20px tall (below the 24px target size,
    WCAG 2.5.8).
21. Lint warning: unused `eslint-disable` in `opengraph-image.tsx`.

### SEO
22. Titles, descriptions, canonicals, single H1s and JSON-LD all pass the
    crawler on 28 pages. Indexing is correctly off. No review/rating schema.
23. Area pages are distinct (permitting, housing, utility), not keyword clones.
24. Homepage meta description lists subpanels and hot tubs but not the
    service/knob-and-tube work Eric listed first; minor.

## Changes made (same day)

| Area | Change |
|---|---|
| Service pages (all 19) | "Code, safety and permits" and "What shapes the scope" use an APG accordion on phones (titles visible, detail one tap away) and render open on desktop. The four-step process uses a compact version. Tighter mobile spacing. Headings keep acronyms ("EV chargers"). Closing CTA matches the homepage wording; the form still pre-selects the service |
| /services | Services grouped under three headings with compact thumbnail rows on phones. The duplicate circuit list shows on desktop only; phones get jump links to the groups |
| Home | Tighter mobile spacing, shorter photo crop on phones, the 19-service circuit list hidden on phones (a "See all 19 services" button, the menu and the footer cover it), placeholder van drawing desktop-only, stray "04" removed, meta description leads with Eric's priority services |
| Reviews | Pause/Play button (WCAG 2.2.2); paused ribbons scroll by swipe; contrast fixed |
| Process | Two columns on tablet; inline markers on phones |
| Contact | Form directly after the intro on phones; details follow. Hours row omitted when hours are unknown and flags are off |
| Careers | Unconfirmed Type/Pay/Schedule/Benefits omitted in production (flagged in previews) instead of empty labels |
| Footer | Two-column lists on phones; list links ≥24px tall |
| Mobile menu | Services grouped under the same three headings, two columns |
| Lint | Removed unused `eslint-disable` |

New pieces: `src/components/ui/accordion.tsx`, `src/components/home/marquee.tsx`,
`src/lib/text.ts`, `serviceGroups` in `src/content/services.ts`.

## Results (390px mobile)

| Page | Before | After | Change |
|---|---|---|---|
| Home | 16,819px | 12,465px | −26% |
| /services | 13,870px | 6,593px | −52% |
| EV charger page | 13,502px | 10,378px | −23% |
| Knob & tube page | 12,492px | 9,831px | −21% |
| /areas | 7,754px | 6,684px | −14% |
| /areas/mead | 7,016px | 5,834px | −17% |
| /careers | 8,639px | 7,492px | −13% |
| /contact (form start) | ~1,000px | 462px | form ~540px higher |

Desktop heights are within about 5% of before (content unchanged, same open layout).

Checks after: `npm run check` passes with no warnings; `check:site` 28 pages
clean; axe-core 0 violations on 10 pages at 1440, 768 and 390; keyboard tests
of accordions (Enter/Space/Tab, aria-expanded, region labelling, no network on
toggle), FAQ, desktop services menu, mobile menu, review pause, group jump
links, contact and careers validation and the honest "NOT sent" state all
pass; production-mode build (flags off) shows no empty labels.

## Still for Eric
- Verify license ACORNEL752C5 on L&I (shown as fact in header, footer and the
  hero's "WA licensed contractor").
- Public address: Google shows 3707 E Decatur Ave #2; old site 4615 E 6th Ave.
- Business hours, job type/pay/schedule/benefits, exact licensing requirement.
- Whether the public preview should show "To confirm" flags
  (`NEXT_PUBLIC_SHOW_REVIEW_FLAGS=false` in Vercel hides them and unconfirmed rows).
- Real photos still missing: hot tub, attic fan, repair, van, surge, home-sale, commercial.
