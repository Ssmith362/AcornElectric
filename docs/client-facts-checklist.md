# Client facts checklist: confirm with Acorn before launch

Every factual claim on the site traces to a line here. **Bold** items block
launch. "Where it lives" is the one file to edit; the whole site updates.

Status key: ✅ confirmed · 🟡 sourced but unconfirmed · ❌ unknown

## Business identity (`src/lib/site.ts`)

| Fact | Current value | Status | Source / note |
|---|---|---|---|
| Business name | Acorn Electric | 🟡 | Current website |
| Legal name | Acorn Electric LLC | 🟡 | Public license listing (BuildZoom). Not shown on site or in schema until confirmed |
| Owner | Eric Beisley | 🟡 | Public license listing / Alignable. Not used in copy yet |
| **Phone** | (509) 808-1925 | 🟡 marked verified | Same on current site and license listing. Confirm it's the number Acorn wants advertised |
| **Lead email** | eric@callacornelectric.com | 🟡 | Current website. Confirm where leads and applications should go (`LEADS_TO`, `CAREERS_TO`) |
| **Public address** | *not published* | ❌ | Site lists 4615 E 6th Ave, Spokane Valley; Google reportedly lists 3707 E Decatur Ave #2, Spokane. Decide which is real, and whether to show an address at all (service-area business). Update Google Business Profile to match |
| **WA contractor license #** | ACORNEL752C5 | 🟡 | Third-party listing only. Verify on https://secure.lni.wa.gov/verify/ |
| Hours | *not shown* | ❌ | |
| Emergency / after-hours service | *not claimed anywhere* | ❌ | Old site mentions "emergency services". Don't add until confirmed, with real availability |
| Official website URL | https://www.callacornelectric.com | 🟡 | Confirm www vs non-www for the canonical host |
| Social profiles | *none linked* | ❌ | Only add genuine Acorn accounts. Old site's social links reportedly point to wrong profiles |
| **Google Business Profile URL + review link** | *none* | ❌ | Needed for reviews section + `sameAs` |
| Review count / rating | *not shown* | ❌ | Audit said 70 five-star reviews; one aggregator shows 15. Don't show a number until verified at launch |

## Services (`src/content/services.ts`)

| Service | `confirmed` | Note |
|---|---|---|
| EV charger installation | true | From brief priority list |
| Electrical panel upgrades | true | |
| Subpanel installation | true | |
| Hot tub wiring | true | Public permit record shows a hot tub disconnect job |
| Recessed lighting | true | |
| Service mast repair | true | Does Acorn also handle roof flashing, or coordinate with a roofer? |
| Home electrical inspections | true | Does Acorn give written findings? Copy currently says "tell us if you need it in writing" |
| Attic fan installation | true | Who cuts/flashes the roof penetration? |
| **Exterior lighting** | **false** | Brief says "if offered". Page hidden in production until confirmed. Also: low-voltage landscape lighting? |
| Electrical repair & troubleshooting | true | Old site offers "demand calls" |
| Prices | *none published* | Old booking page listed Demand call $100 / Inspection $150 / System upgrade $250. Confirm before publishing any price |
| Warranty | *none claimed* | |
| Process (4 steps) | Generic | Confirm it matches how Acorn actually quotes, schedules and follows up |
| "Floors protected, dust controlled, cleaned up after" | Brand value | Confirm it reflects practice |

## Service areas (`src/content/areas.ts`)

| Area | `confirmed` | Note |
|---|---|---|
| Spokane | (home base) | |
| **North Spokane** | false | Page built, hidden in production until confirmed |
| **Mead** | false | Page built, hidden in production until confirmed. Utility (Avista vs Inland Power) varies by address |
| **Spokane Valley** | false | Page built, hidden in production until confirmed |
| Airway Heights, Cheney, Liberty Lake | false | No pages. Listed on /areas once confirmed |

## Careers (`src/content/careers.ts`)

| Fact | Status | Note |
|---|---|---|
| New work vans | ✅ | Meeting notes |
| Fully stocked tools provided | ✅ | Meeting notes |
| Book club reading *7 Habits* | ✅ | Meeting notes |
| Leadership / management growth | ✅ | Meeting notes |
| **Role title + licensing requirement** | 🟡 | "Residential Electrician (02)". Confirm exact requirement (02 only, or 01 also?) |
| **Pay range** | ❌ | WA pay-transparency law (RCW 49.58.110) applies to employers with 15+ employees; confirm whether it applies. JobPosting schema stays off until pay, dates and type are set |
| Employment type, schedule, benefits | ❌ | Shown as "To confirm" in preview |
| Where applications go | ❌ | `CAREERS_TO` env var |

## Brand and assets

| Item | Status | Note |
|---|---|---|
| **Logo (vector)** | ❌ | Temporary mark in `src/components/ui/logo.tsx` |
| Brand colours / fonts | ❌ | Temporary system in `src/app/globals.css`; swap tokens when the kit arrives |
| **Photos** | ❌ | 13 slots listed in `src/content/images.ts`, each with a shot brief. Placeholders are labelled as placeholders |
| Real customer reviews (text + name) | ❌ | `src/content/reviews.ts`. Copy from Google, word for word |
| Owner bio / photo (optional) | ❌ | Would strengthen an About section later |
