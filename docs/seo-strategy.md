# SEO strategy: research, keyword map and 12-month roadmap

Prepared by Flourish Now Digital, October 2026.

## How this research was done, and its limits

- **Live sites could not be opened from the build environment.** Its network
  policy blocked callacornelectric.com, acorn-electric.netlify.app and
  competitor domains, and the DataForSEO account returned "payment required",
  so there is **no search-volume data and no live SERP export** behind this
  document.
- What *was* available: web-search result summaries (Oct 2026) for the target
  queries, public license/permit listings, and Avista and L&I pages.
- So everything below is a **hypothesis to check against real data**: Search
  Console after launch, a manual look at the SERPs for each target query, and
  Acorn's own lead data. No ranking, traffic or volume figures are claimed.

## What we learned about Acorn's current footprint

- The current site (callacornelectric.com) is a Wix-style site: a
  booking page (`/book-online`) with three bookable services, an `/about` page,
  and a footer reading "© 2035". It describes Acorn as a locally owned
  residential electrical company in Spokane.
- Public license listing: Acorn Electric LLC, 4615 E 6th Ave, Spokane (ZIP
  99212, i.e. Spokane Valley), owner Eric N. Beisley, license ACORNEL752C5,
  about 11 permits on record (panel swaps, new circuits, a hot tub disconnect,
  a generator inlet).
- Address conflict with Google (3707 E Decatur Ave #2) remains unresolved.
  Fixing NAP consistency across the site, Google Business Profile and directories
  is probably the single highest-leverage local SEO task, and it's off-site.

## Competitive landscape (from search results, not page-level review)

| Competitor | What showed up | Takeaway for Acorn |
|---|---|---|
| Mr. Electric of Spokane (franchise) | Dedicated pages for EV charger install and hot tub circuits | Franchise template copy; beatable with genuinely local, specific pages |
| Wired Goat Electric | Publishes price ranges (panels, EV chargers, rewires, hot tubs) | Price transparency is a trust signal; worth considering if Acorn is comfortable |
| Easy Electric | Downtown address, reviews on CustomerLobby, advertises a 2-year parts & labor warranty | Strong review footprint; Acorn needs a steady review habit |
| Mainstream Electric, Heating, Cooling & Plumbing | Multi-trade, panels & wiring page | Generalist; Acorn's depth per service is the edge |
| VPC Electric, AmeriWest Electric & Solar, Infinite Electric | EV blog content, EV/solar, directory rankings | EV is contested; win with the most useful page, not the most keywords |
| Directories (Angi, Thumbtack, HomeGuide, contractorplus cost pages) | Ranked for many queries | Signals thin local contractor content: an opening |

**Visible gaps worth targeting first:**

1. **Service mast repair**: results were dominated by Avista storm press
   releases, with no contractor page explaining the repair. A clear, local
   page has a real chance here, and storm season creates spikes.
2. **Subpanel installation**: results were cost calculators and forums.
   A practical page about shops, detached garages and ADUs fits Spokane-area lots.
3. **Hot tub wiring**: one franchise page plus national how-to content.
4. **Mead / North Spokane general electrician**: mostly directories and job
   ads, little local contractor content.

## Keyword → page map (hypotheses)

| Primary intent (natural variants) | Page | Priority |
|---|---|---|
| electrician spokane, residential electrician spokane | `/` | Foundation (competitive) |
| ev charger installation spokane, tesla charger install, level 2 charger | `/services/ev-charger-installation` | High |
| electrical panel upgrade spokane, 200 amp service upgrade, fpe/zinsco replacement | `/services/electrical-panel-upgrades` | High |
| subpanel installation spokane, shop subpanel, detached garage power | `/services/subpanel-installation` | High (weak SERP) |
| hot tub wiring spokane, hot tub electrician, spa disconnect | `/services/hot-tub-wiring` | High |
| service mast repair spokane, weatherhead repair, mast pulled off house | `/services/service-mast-repair` | High (weak SERP, seasonal) |
| home electrical inspection spokane, electrical inspection buying house | `/services/electrical-inspections` | Medium |
| recessed lighting installation spokane, can lights, canless led | `/services/recessed-lighting` | Medium |
| attic fan installation spokane | `/services/attic-fan-installation` | Medium (low volume, low competition) |
| outdoor lighting spokane, exterior light installation | `/services/exterior-lighting` | Pending confirmation |
| electrician near me (repair intent), breaker keeps tripping, outlet stopped working | `/services/electrical-repair` | Medium |
| electrician north spokane | `/areas/north-spokane` | High (once confirmed) |
| electrician mead wa | `/areas/mead` | High (once confirmed) |
| electrician spokane valley | `/areas/spokane-valley` | Medium (once confirmed) |
| electrician jobs spokane, residential electrician job | `/careers` | Recruiting |

Not built on purpose: separate pages per small town with swapped names
(doorway pages), and "emergency electrician" (unconfirmed).

## What's built into the site already

- One page per service and per area, unique titles/descriptions/H1s, written
  around what the customer is trying to do, with FAQs that answer real questions.
- Internal links: service ↔ related services, area → featured services, every
  page → contact form pre-filled with the service.
- Electrician + Service + BreadcrumbList + FAQPage schema, using only verified
  facts; no self-serving review markup; JobPosting only once a posting is complete.
- Sitemap of confirmed pages only; robots and `noindex` locked until launch.
- Fast static pages, self-hosted fonts, no layout shift from images.
- Leads arrive tagged with the page they came from ("Sent from page"), so leads
  by service page can be counted from day one even before analytics.

## 12-month roadmap

Assumes launch in month 1. Each phase lists what to do and what to measure.
Baselines are taken in month 1 from Search Console and Acorn's own records;
none are assumed here.

### Months 0–1: Foundation (launch)

- Resolve address, license, phone and lead inbox (`docs/client-facts-checklist.md`).
- Make Google Business Profile match the site exactly: name, phone, category
  (Electrician), service areas, website URL, services list.
- Crawl the old site, map every URL in `legacyRedirects`, launch, and verify
  301s.
- Connect Search Console (domain property) and submit the sitemap. Add GA4 or a
  privacy-light alternative, and track form submits and `tel:` clicks as
  conversions (consent banner if required).
- Replace the highest-visibility placeholders with real photos (home hero,
  EV, panel, hot tub, van).
- **Measure:** indexed pages, redirect errors (should be 0), first conversions.

### Months 2–4: Proof and local signals

- Ask every happy customer for a Google review with a direct review link (no
  incentives, no gating). Add 3–6 real reviews to the site.
- Post job photos to GBP weekly; answer GBP Q&A.
- Consistent NAP on the main directories (BBB, Yelp, Angi, Nextdoor, Apple Maps,
  Bing Places), correcting old addresses.
- Confirm areas and switch on the North Spokane, Mead and Spokane Valley pages.
- **Measure:** review count and velocity, GBP calls / website clicks /
  direction requests, impressions for service + city queries.

### Months 4–8: Content depth where data says so

- Use Search Console queries to find pages with impressions but low clicks;
  rewrite titles and intros for those.
- Add real project write-ups (with permission): "200-amp upgrade in a 1940s
  South Hill home", "Shop subpanel in Mead". Specific, photographed, no
  invented details.
- Add short answer pages only where Search Console shows real questions (e.g.
  "Do I need a permit for a hot tub in Spokane County?").
- Consider publishing price ranges if Acorn is comfortable (competitors do).
- Add confirmed communities (Airway Heights, Liberty Lake, Cheney) only with
  something genuinely local to say.
- **Measure:** clicks and average position per service page; leads per page
  (from the "Sent from page" field); call volume.

### Months 8–12: Compound and refine

- Seasonal pushes: mast repair before winter storms, hot tubs and EV chargers in
  spring, attic fans before summer.
- Local links: supplier and partner listings, Spokane home-builder/realtor
  relationships, sponsorships. No paid link schemes.
- Revisit the keyword map with a year of data; expand services that convert,
  trim effort on ones that don't.
- **Measure:** year-over-year organic clicks, qualified leads and booked jobs
  attributed to the site, careers applications from qualified candidates.

### What to report monthly (keep it to outcomes)

1. Calls and form leads from the website (and which page)
2. Booked jobs from those leads (Acorn's records)
3. Organic clicks and impressions (Search Console)
4. GBP actions: calls, website clicks, directions
5. New reviews
6. Careers: applications, and how many met the bar

Traffic is a means; booked jobs and good hires are the outcome.
