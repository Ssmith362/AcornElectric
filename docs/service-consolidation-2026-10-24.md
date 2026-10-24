# Service consolidation and implementation

Approved by Spencer on October 24, 2026. Built by Flourish Now Digital.

## Decision

Use 16 focused service pages rather than expanding the previous 19 into 21.
Combine ceiling and attic fans on the ceiling-fan-installation page. Add
generator installation and bathroom exhaust fan replacement. Five overlapping
standalone entries become sections on stronger, related pages. Do not create
another page for every keyword variant.

This is a search-intent and usability decision, not a claim that fewer URLs
automatically rank better. Distinct higher-value needs retain their own pages,
including subpanels, commercial work, remodels and custom new homes. Service
mast repair remains a specific niche supported by an actual Acorn job photo.

The DataForSEO audit reports 50 monthly U.S. searches for the phrase "ceiling
fan installation Spokane", versus about 10 for the generic phrase measured
within Spokane city. Those are different populations, not interchangeable
figures. The attic fan Spokane phrase returned no reported data; that does not
prove no searches. The user authorized the new services; copy must not invent
dealer status, pricing, guarantees or full roof/fuel-system capabilities.

## Final pages and coverage

| Page | Coverage |
|---|---|
| `/services/electrical-repair` | Troubleshooting, outlets, switches, GFCI, breakers and home-sale electrical corrections |
| `/services/electrical-panel-upgrades` | Panel replacement, load evaluation and electrical/200 amp service upgrades |
| `/services/ev-charger-installation` | EV charging and installation options |
| `/services/generator-installation` | Backup-power planning, generator electrical connection, transfer equipment and scope coordination |
| `/services/ceiling-fan-installation` | Ceiling fan installation/replacement plus a dedicated attic fan installation, wiring and controls section |
| `/services/commercial-electrical` | Small commercial electrical work, within the previously verified scope |
| `/services/bathroom-fan-replacement` | Bathroom exhaust fan replacement and installation |
| `/services/lighting-installation` | Indoor/recessed and exterior/outdoor lighting, with separate named sections |
| `/services/hot-tub-wiring` | Hot tub circuits and electrical connection |
| `/services/knob-and-tube-rewiring` | Knob and tube replacement and rewiring |
| `/services/electrical-inspections` | Safety inspections, grounding/bonding and surge protection, available independently |
| `/services/dedicated-appliance-circuits` | Dedicated circuit installation for appliances and equipment |
| `/services/subpanel-installation` | Shop, garage and addition subpanels |
| `/services/remodel-and-addition-wiring` | Remodel and addition electrical |
| `/services/new-home-electrical` | Custom new-home electrical |
| `/services/service-mast-repair` | Service mast and weatherhead repair |

The first six entries appear in the homepage rail. The complete catalog is
organized into three groups. No customer-facing maximum-service count is used.
The invitation to ask about other work remains visible across the site.

## Lighting decision

One page is titled "Lighting Installation in Spokane" and opens with "Indoor
and outdoor lighting installation in Spokane". Recessed and exterior lighting
each have their own heading, explanatory content and stable section target.
The original recessed-lighting detail is retained alongside the exterior work
scope. This lets one useful page cover both related searches without thin
duplicated introductions and separate menu items. It can rank for both intents;
no top-position outcome is asserted. Reconsider separate pages if post-launch
queries, rankings, conversion results and the competing result types justify it.

## Permanent redirects

| Previous path | 301 destination |
|---|---|
| `/services/electrical-service-upgrade` | `/services/electrical-panel-upgrades#service-upgrades` |
| `/services/whole-home-surge-protection` | `/services/electrical-inspections#surge-protection` |
| `/services/grounding-and-bonding-upgrades` | `/services/electrical-inspections#grounding-and-bonding` |
| `/services/real-estate-electrical-repairs` | `/services/electrical-repair#home-sale-repairs` |
| `/services/recessed-lighting` | `/services/lighting-installation#recessed-lighting` |
| `/services/exterior-lighting` | `/services/lighting-installation#exterior-lighting` |
| `/services/attic-fan-installation` | `/services/ceiling-fan-installation#attic-fans` |

The old attic URL redirects directly to the attic fan section on the shared
ceiling and attic fan page. The copy explicitly distinguishes the equipment
and installation requirements. Removed routes
are excluded from the sitemap, navigation and related links.

## Efficiency and maintenance

`src/content/service-index.ts` owns names, slugs, display order and groupings.
Forms and mobile navigation import this short index. Full descriptions live in
`services.ts` for server-rendered pages, and `services-added.ts` is removed.
This avoids sending the entire service library to the browser for a dropdown.
No database, dependency or client-side data-fetching layer is added.

New merged sections use the shared page template with semantic headings and
stable anchor IDs. The form still selects the page's service automatically.

## Verification

- `npm run check`: case audit, typecheck, lint and production build.
- `npm run check:services -- URL`: 16 service URLs in sitemap, new titles and
  form choices, seven 301 redirects and valid destination sections, no long
  service descriptions in loaded client JavaScript.
- `npm run check:site -- URL`: crawl page responses, headings, metadata,
  canonicals, images, structured data and internal links.
- No live enquiry submitted and no launch/indexing setting changed.

## Technical copy references

- ENERGY STAR ceiling fan mounting/support guidance:
  https://www.energystar.gov/products/ceiling_fans/installation-and-usage-tips
- DOE Building America bathroom exhaust guidance:
  https://basc.pnnl.gov/resource-guides/bathroom-exhaust-fans
- OSHA generator isolation and outdoor-operation guidance:
  https://www.osha.gov/sites/default/files/publications/OSHA3286.pdf

New copy stays general and directs equipment-specific decisions to a qualified
site assessment rather than publishing DIY connection instructions.
