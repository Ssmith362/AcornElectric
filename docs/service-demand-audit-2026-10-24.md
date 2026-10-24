# Acorn Electric service-page demand audit

Prepared by Flourish Now Digital. Research date: October 24, 2026.

Implementation update: Spencer approved a consolidation based on this audit.
See [the implemented 16-page plan](service-consolidation-2026-10-24.md). The
recommendations below preserve the research-stage assessment, not the current
page inventory.

## Main decisions

- Add a dedicated ceiling fan installation and replacement page. Attic fans are different equipment and should not occupy the place of the ceiling fan offering.
- Keep attic fans as a lower-priority specialty only if Eric actually handles them. Existing project documentation marks the service confirmed from the brief but does not substantiate a demand-led decision. Roof penetration/flashing scope remains an open question in the checklist.
- Consider bathroom exhaust fan installation/replacement if Eric handles the relevant electrical and ventilation scope.
- Strengthen outlets, switches, GFCI and breaker coverage on the repair page instead of adding one page for every tiny variation.
- Most existing services remain legitimate distinct project pages. Nineteen pages is not inherently excessive, but the research does not support treating each as a substantial independent traffic source.
- No service pages were removed, renamed or added by this audit. These are recommendations.

## Method and limits

Authenticated DataForSEO Google Ads Search Volume live endpoint, English, Google search only (search_partners=false). Spokane city location_code 1027760. Separate United States location_code 2840 batch for queries that explicitly include Spokane. Full API mode used for complete keyword rows. The default optimized response exposed only the first ten rows, so that abbreviated result was not used to establish absence of data.

Returned monthly histories cover October 2025 through September 2026. search_volume is the provider's rounded monthly estimate. It is not a click forecast. A reported 10 should be treated as a low-volume bucket rather than ten precise unique searches. Null/no data is not zero. Google Ads can group close variants; do not sum installation, installer, replacement, near-me and word-order variants into a supposed total market.

City figures measure searches in Spokane city. United States figures for Spokane-containing terms can include people outside the city, so the columns are different populations and must not be added together or described as a fivefold local difference. The city's estimate does not cover the entire Acorn service area. Advertising competition is paid-ad competition, not organic ranking difficulty. No organic difficulty score was acquired.

The exact phrases in this audit do not exhaust every synonym or customer problem. Keep recommendations also consider service relevance, distinct intent, potential project value and conversion usefulness. Generator work is a research candidate only, not a newly verified service.

## Fan comparison

| Query | Spokane city, generic phrase | U.S., phrase with Spokane appended |
|---|---:|---:|
| ceiling fan installation | 10 | 50 |
| attic fan installation | 10 | No data |
| bathroom exhaust fan installation | 20 | No data |
| bathroom exhaust fan replacement | 40 | Not measured |

Ceiling fan repair and replacement each report 10 within Spokane city. Bathroom fan replacement and bathroom exhaust fan replacement each report 40 and can overlap; do not add them to claim 80. Ceiling fan installation Spokane WA reports 10 nationwide, and may overlap the 50 reported for the shorter Spokane query.

## Existing page decisions

| Existing service | Recommendation | Sample local phrase | Monthly estimate | Reason |
|---|---|---|---:|---|
| EV charger installation | Keep, priority | ev charger installation | 10 | Tesla and near-me variants report demand; retain a distinct installation page. |
| Electrical panel upgrade | Keep, priority | electrical panel upgrade | 10 | Clearly distinguish replacing equipment from increasing utility service capacity. |
| Electrical service upgrade | Keep, clarify | 200 amp service upgrade | 10 | Literal electrical service upgrade reports 0; the customer phrase 200 amp service upgrade reports 10. Keep capacity-specific content and coordinate it with panel page. |
| Hot tub wiring | Keep | hot tub wiring | 10 | A distinct equipment-installation need; hot tub electrician also reports 10 locally. |
| Knob and tube rewiring | Keep, broaden language | house rewiring | 10 | Exact knob and tube rewiring reports 0, while knob and tube replacement/removal each report 10. Use replacement and rewiring naturally. |
| Whole-home surge protection | Keep, secondary | whole house surge protector installation | 10 | Supporting page; do not present it as a major traffic driver. |
| Home electrical inspection | Keep | electrical inspection | 10 | Explain electrician inspection versus municipal inspection and whole-house inspector. |
| Electrical repair and troubleshooting | Keep, priority; strengthen | electrical repair | 10 | Add clear outlet/GFCI/breaker sections. GFCI installation reports 30 and replacement 20 locally; avoid splitting every minor repair into another page. |
| Circuits for new appliances | Keep, rename search emphasis | dedicated circuit installation | 10 | Literal appliance circuit installation has no data. Lead with dedicated circuits, then appliance examples. |
| Subpanel installation | Keep | subpanel installation | 10 | Clear detached shop/garage intent; 10 local estimate. |
| Remodel and addition electrical | Keep as project page | electrical remodeling | 10 | Service relevance and valuable jobs justify a useful page despite small reported volume. |
| New custom home electrical | Keep if desired work | new construction electrician | 10 | Custom-home builder/referral usefulness as well as search. Do not expand into excluded large-scale construction. |
| Electrical repairs for home sales | Keep if useful referral niche; review overlap | electrical repairs for home inspection | No data | No reported volume for the sampled exact phrase. Keep only with distinct report correction/closing workflow; otherwise consolidate into repair or inspection page with redirect. |
| Grounding and bonding upgrades | Secondary; consider consolidation | grounding and bonding | 10 | 10 on sampled technical terms does not prove installer intent. Keep if enough distinct lead value, otherwise explain within repair/inspection pages. |
| Recessed lighting installation | Keep | recessed lighting installation | 10 | Distinct installation intent; can support a broader lighting hub later. |
| Exterior lighting installation | Keep | exterior lighting installation | 10 | Distinct outdoor installation need. Do not assume low-voltage landscape work without confirmation. |
| Service mast repair | Keep as niche | electrical mast repair | 10 | Service mast repair and weatherhead repair have no reported data, but electrical mast repair and weatherhead replacement report 10 each. Match customer terminology. |
| Attic fan installation | Deprioritize; retain only if offered | attic fan installation | 10 | 10 city estimate, but no reported nationwide data for attic fan installation Spokane. Not a substitute for ceiling fans; do not just relabel attic instructions. |
| Small commercial electrical | Keep, priority | commercial electrician | 10 | 10 for local generic and 30 nationwide for commercial electrician Spokane. Make commercial coverage visible; do not claim industrial/large construction capability. |

## Additional opportunities

| Candidate | Evidence | Action |
|---|---|---|
| Ceiling fan installation/replacement | City installation 10; U.S. Spokane phrase 50; existing client reviews mention fans | Add a dedicated page, with replacement as a section. Do not replace attic content by changing only its title. |
| Bathroom exhaust fans | City installation 20; replacement 40 | Confirm Eric's ventilation/roof/duct scope, then add if supported. |
| GFCI/outlet installation and replacement | City GFCI installation 30; replacement 20 | Strengthen repair page and navigation wording; separate page only if distinct content and business priority justify it. |
| Generator installation | City generic 10; U.S. Spokane phrase 50 | Confirm actual offerings, such as inlet/transfer-switch versus full standby installation, before adding. |

## Organic search spot checks

DataForSEO Google organic live, desktop, Spokane location, depth 10. Attic fan results include directories, ventilation companies and local service pages. Electrical panel upgrade results include directories and local contractors. Bathroom exhaust fan replacement results were mixed, with many general bathroom remodel pages. These are snapshots, not proof of low organic difficulty or absent demand.

The ceiling fan organic request failed with task status 40101 (Internal SE Server Error), including one retry. It was not treated as a successful SERP review. Volume requests succeeded independently.

## Launch context

Prior check found the Vercel preview robots.txt disallowing crawling and homepage noindex/nofollow. This audit does not change indexing or launch settings. Validate the final domain and search indexing at launch.

## Data appendix

All figures below are provider search_volume values, not sums or traffic estimates. No data means returned null.

### Spokane city keyword estimates

| Keyword | Monthly estimate |
|---|---:|
| electrician | 210 |
| electrician near me | 480 |
| electrician spokane | 480 |
| electrical contractor | 30 |
| commercial electrician | 10 |
| residential electrician | 20 |
| electrical repair | 10 |
| outlet repair | 10 |
| circuit breaker repair | 10 |
| electrical panel upgrade | 10 |
| electrical panel replacement | 10 |
| 200 amp service upgrade | 10 |
| electrical service upgrade | 0 |
| subpanel installation | 10 |
| ev charger installation | 10 |
| tesla charger installation | 10 |
| hot tub wiring | 10 |
| knob and tube rewiring | 0 |
| house rewiring | 10 |
| whole house surge protector installation | 10 |
| electrical inspection | 10 |
| grounding and bonding | 10 |
| electrical grounding | 10 |
| dedicated circuit installation | 10 |
| appliance circuit installation | No data |
| electrical remodeling | 10 |
| new construction electrician | 10 |
| electrical repairs for home inspection | No data |
| recessed lighting installation | 10 |
| exterior lighting installation | 10 |
| outdoor lighting installation | 10 |
| service mast repair | No data |
| weatherhead repair | No data |
| attic fan installation | 10 |
| ceiling fan installation | 10 |
| ceiling fan repair | 10 |
| ceiling fan replacement | 10 |
| bathroom exhaust fan installation | 20 |
| generator installation | 10 |
| generator transfer switch installation | 10 |
| smoke detector installation | 10 |
| outlet installation | 10 |
| gfci outlet installation | 30 |
| fan installation | 10 |
| fan installation near me | 10 |
| ceiling fan installer | 10 |
| ceiling fan installation near me | 10 |
| ceiling fan installers near me | 10 |
| ceiling fan electrician | 10 |
| replace ceiling fan | 10 |
| ceiling fan repair near me | 10 |
| attic fan installer | 10 |
| attic fan installation near me | 10 |
| attic fan replacement | 10 |
| attic ventilation fan installation | 10 |
| whole house fan installation | 10 |
| bathroom fan installation | 20 |
| bathroom exhaust fan replacement | 40 |
| bathroom fan replacement | 40 |
| exhaust fan installation | 10 |
| gfci outlet replacement | 20 |
| outlet not working | 10 |
| breaker keeps tripping | 10 |
| knob and tube replacement | 10 |
| knob and tube removal | 10 |
| electrical panel upgrade near me | 10 |
| ev charger installation near me | 10 |
| hot tub electrician | 10 |
| commercial electrical contractor | 10 |
| lighting installation | 10 |
| electrical wiring | 20 |
| electrical remodeling contractor | No data |
| inspection electrical repairs | No data |
| electrical mast repair | 10 |
| weatherhead replacement | 10 |

### U.S. estimates for explicit Spokane queries

| Keyword | Monthly estimate |
|---|---:|
| electrician spokane | 1000 |
| electrical contractor spokane | 170 |
| commercial electrician spokane | 30 |
| residential electrician spokane | 10 |
| electrical repair spokane | No data |
| outlet repair spokane | 10 |
| circuit breaker repair spokane | No data |
| electrical panel upgrade spokane | No data |
| electrical panel replacement spokane | No data |
| 200 amp service upgrade spokane | No data |
| electrical service upgrade spokane | No data |
| subpanel installation spokane | No data |
| ev charger installation spokane | No data |
| tesla charger installation spokane | No data |
| hot tub wiring spokane | No data |
| knob and tube rewiring spokane | No data |
| house rewiring spokane | No data |
| whole house surge protector installation spokane | No data |
| electrical inspection spokane | No data |
| grounding and bonding spokane | No data |
| electrical grounding spokane | No data |
| dedicated circuit installation spokane | No data |
| appliance circuit installation spokane | No data |
| electrical remodeling spokane | No data |
| new construction electrician spokane | No data |
| electrical repairs for home inspection spokane | No data |
| recessed lighting installation spokane | No data |
| exterior lighting installation spokane | No data |
| outdoor lighting installation spokane | No data |
| service mast repair spokane | No data |
| weatherhead repair spokane | No data |
| attic fan installation spokane | No data |
| ceiling fan installation spokane | 50 |
| ceiling fan repair spokane | No data |
| ceiling fan replacement spokane | No data |
| bathroom exhaust fan installation spokane | No data |
| generator installation spokane | 50 |
| generator transfer switch installation spokane | No data |
| smoke detector installation spokane | No data |
| outlet installation spokane | No data |
| gfci outlet installation spokane | No data |
| ceiling fan installation spokane wa | 10 |
| attic fan installation spokane wa | No data |
| electricians spokane | 1000 |
| spokane electrician | 1000 |
| knob and tube replacement spokane | No data |
| bathroom fan installation spokane | No data |

## References and task provenance

- Endpoint documentation: https://docs.dataforseo.com/v3/keywords_data/google_ads/search_volume/live/
- Spokane city base batch task: 10242055-2361-0367-0000-60c7c6ca04f1
- Spokane city additional variants task: 10242056-2361-0367-0000-9bfbffe0099c
- U.S. explicit Spokane terms task: 10242056-2361-0367-0000-f9d08ec1bb92
- Page inventory: src/content/services.ts and src/content/services-added.ts.
- Scope verification notes: docs/client-facts-checklist.md.

Measure actual post-launch queries, impressions, clicks and enquiries by landing page. Revisit page priorities after sufficient indexed data accumulates rather than pruning solely because a keyword tool returns null.
