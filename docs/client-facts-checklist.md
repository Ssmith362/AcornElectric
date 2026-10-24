# Client facts checklist: confirm with Acorn before launch

Every factual claim on the site traces to a line here. **Bold** items block
launch. "Where it lives" is the one file to edit; the whole site updates.

Status key: ✅ confirmed · 🟡 sourced but unconfirmed · ❌ unknown

## Business identity (`src/lib/site.ts`)

| Fact | Current value | Status | Source / note |
|---|---|---|---|
| Business name | Acorn Electric | 🟡 | Current website |
| Legal name | Acorn Electric LLC | ✅ | Eric's email signature, Oct 16 2026 ("Owner- Acorn Electric LLC") |
| Owner | Eric Beisley | ✅ | Eric's email signature, Oct 16 2026 |
| Phone | (509) 808-1925 | ✅ | Eric's email signature, Oct 16 2026 |
| Public email | eric@callacornelectric.com | ✅ | Eric's email signature. Still set where form leads/applications go (`LEADS_TO`, `CAREERS_TO`) |
| **Public address** | *not published* | ❌ | Site lists 4615 E 6th Ave, Spokane Valley; Google reportedly lists 3707 E Decatur Ave #2, Spokane. Decide which is real, and whether to show an address at all (service-area business). Update Google Business Profile to match |
| **WA contractor license #** | ACORNEL752C5 | 🟡 | Third-party listing only. Verify on https://secure.lni.wa.gov/verify/ |
| Hours | *not shown* | ❌ | |
| Emergency / after-hours service | *not claimed anywhere* | ❌ | Old site mentions "emergency services". Don't add until confirmed, with real availability |
| Official website URL | https://www.callacornelectric.com | 🟡 | Eric confirmed he bought callacornelectric.com on Wix. Confirm www vs non-www for the canonical host |
| Social profiles | *none linked* | ❌ | Only add genuine Acorn accounts. Old site's social links reportedly point to wrong profiles |
| **Google Business Profile URL + review link** | `maps?cid=10070915066178567807` | ✅ | Found Oct 19, 2026. Listing shows 3707 E Decatur Ave #2, Spokane 99217, (509) 808-1925, callacornelectric.com |
| Review count / rating | *not shown* | ✅ | Google showed 5.0 / 71 reviews on Oct 19, 2026. Site prints no count or stars (Therapy in Motion style); it points to Google instead. No review schema |

## Services: current structure (October 24, 2026)

Spencer authorized ceiling fan installation/replacement, generator installation,
and bathroom fan replacement on October 24. These entries are published as
confirmed services based on that instruction. Generator copy covers the
electrical/transfer scope and requires fuel, site and equipment responsibilities
to be agreed; it does not claim dealer certification or all-inclusive site work.
Bathroom fan copy similarly identifies ventilation, duct and roof scope before
work begins. Ceiling fans use an existing Acorn covered-patio photo; the bathroom
fan image remains a clearly labelled placeholder pending an Acorn photo.

The live catalog now contains 16 focused pages. Panel/service upgrades,
inspection/safety protection, repair/home-sale corrections and indoor/outdoor
lighting have been combined. Attic fan installation and electrical work share the ceiling fan page, with
a dedicated attic fan heading and scope. It is not a separate menu entry.
See `service-consolidation-2026-10-24.md` for the current inventory and redirects.

The tables below preserve the earlier brief and source history. They are not
an instruction to restore separate pages that were deliberately consolidated.

## Earlier service inventory (`src/content/services.ts`)

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
| **Exterior lighting** | **true** | Confirmed by Eric (relayed by Spencer, Oct 19, 2026). Page is live. Still open: low-voltage landscape lighting? |
| Electrical repair & troubleshooting | true | Old site offers "demand calls" |
| Prices | *none published* | Old booking page listed Demand call $100 / Inspection $150 / System upgrade $250. Confirm before publishing any price |
| Warranty | *none claimed* | |
| Process (4 steps) | Generic | Confirm it matches how Acorn actually quotes, schedules and follows up |
| "Floors protected, dust controlled, cleaned up after" | Brand value | Confirm it reflects practice |

### Services added from Eric's list (Oct 16 2026)

Eric's own list: new custom home electrical, remodels and additions, panel
upgrades, service upgrades, troubleshooting, power for new appliances, EV
chargers, grounding updates, knob and tube rewire, whole-home surge
protection, whole-home safety inspection, real estate repairs to sell a home,
commercial electrical. All have pages (`src/content/services-added.ts` for the
new ones).

**Acorn does NOT do:** solar, industrial, large-scale construction, commercial
fire alarm, sound and audio. Nothing on the site advertises these; the attic
fan and commercial FAQs say so plainly.

Not on Eric's list but already built (kept, `confirmed: true` from the brief):
subpanels, hot tub wiring (also named in the Oct 12 meeting), recessed
lighting, service mast repair, attic fans. Exterior lighting is confirmed
(Oct 19, 2026).

## Service areas (`src/content/areas.ts`)

Eric supplied 12 communities (Oct 2026): Spokane, Spokane Valley, Liberty Lake,
Cheney, Airway Heights, North Spokane, South Hill, Mead, Deer Park, Medical Lake,
Greenacres, Otis Orchards. All 12 are listed accurately (`communities` in
`areas.ts`) on /areas, the home map, footer, contact and schema. Listing a town
is not the same as ranking for it, so only three get a dedicated page.

| Area | Page | Note |
|---|---|---|
| Spokane | home / hub | City of Spokane permits and inspections |
| **Spokane Valley** | yes | Washington L&I |
| **North Spokane** | yes | Straddles the city limit; permit depends on address |
| **Mead** | yes | L&I. Utility (Avista vs Inland Power) varies by address; not verified, language hedged |
| South Hill | no | Inside Spokane city limits |
| Liberty Lake, Cheney, Airway Heights, Deer Park, Medical Lake, Greenacres, Otis Orchards | no | L&I. Add a page only with genuinely distinct local content (real jobs, photos, local rules). Don't clone |

## Careers (`src/content/careers.ts`)

| Fact | Status | Note |
|---|---|---|
| New work vans | ✅ | Meeting notes |
| Fully stocked tools provided | ✅ | Meeting notes |
| Team book club | ✅ | Meeting notes. The current book is deliberately NOT named on the site (it would go out of date) |
| Leadership / management growth | ✅ | Meeting notes |
| **Role title + licensing requirement** | 🟡 | "Residential Electrician (02)". Confirm exact requirement (02 only, or 01 also?) |
| **Pay range** | ❌ | WA pay-transparency law (RCW 49.58.110) applies to employers with 15+ employees; confirm whether it applies. JobPosting schema stays off until pay, dates and type are set |
| Employment type, schedule, benefits | ❌ | Shown as "To confirm" in preview |
| Where applications go | ❌ | `CAREERS_TO` env var |

## Brand and assets

| Item | Status | Note |
|---|---|---|
| Logo | ✅ | Real logo set from Eric (8 JPG exports, Oct 16 2026). Transparent cut-outs in `public/brand/`. Eric also has AI/EPS masters if we need vectors |
| Brand colours | ✅ | Sampled from the logo: green #013328, cream #FEEFC6, yellow #FFFF01, orange #E0661D. In `src/app/globals.css` |
| Brand fonts | ✅ / 🟡 | Luckiest Guy (primary) installed. Secondary is Modica SemiBold, a licensed face: site uses Montserrat as a stand-in until Eric sends the web licence/file |
| Photos | 🟡 | 14 real job photos from Eric (Oct 16 2026) placed in `src/content/images.ts`. Still on placeholders: hot tub, attic fan, repair, van, surge protector, home-sale repair, commercial |
| Careers photo of Eric with two kids | 🟡 | Eric sent it; confirm he's happy with the kids on the public careers page |
| Real customer reviews (text + name) | ✅ | 20 Google reviews (all 5 stars, with Google's relative dates) copied word for word into `src/content/reviews.ts` (Oct 19, 2026), shown as a two-ribbon marquee like Therapy in Motion. Refresh from Google when new ones come in |
| Owner bio / photo (optional) | ❌ | Would strengthen an About section later |
