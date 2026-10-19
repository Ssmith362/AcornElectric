import { SHOW_REVIEW_FLAGS } from "@/components/ui/review-flag";
import { addedServices } from "./services-added";
import type { Service } from "./types";

/**
 * Service pages. One entry = one page at /services/<slug>.
 *
 * Order here is the order on the site (panel-schedule index, nav, footer).
 *
 * WRITING RULES for anyone adding a service:
 *   - Only add services Acorn actually performs (set `confirmed`).
 *   - No prices, timelines, warranties or guarantees unless Acorn confirms them.
 *   - Code notes stay general ("the code as adopted in Washington"); never give
 *     DIY instructions.
 *   - Each page answers a different search. Don't clone a page and swap words.
 */

const permitLine =
  "Inside Spokane city limits, electrical permits and inspections go through the City of Spokane. Most other addresses in the area, including unincorporated Spokane County, are permitted and inspected by Washington L&I. We check which applies to your address.";

const coreServices: Service[] = [
  {
    slug: "ev-charger-installation",
    name: "EV charger installation",
    short: "EV chargers",
    tag: "240V · Level 2",
    confirmed: true,
    image: "ev",
    meta: {
      title: "EV Charger Installation in Spokane, WA | Acorn Electric",
      description:
        "Level 2 EV charger installation for Spokane homes: Tesla Wall Connector, NEMA 14-50 and more. Load check, permit, install and inspection.",
    },
    h1: "Home EV charger installation in Spokane",
    lede:
      "You bought an electric car so you could stop thinking about fuel. Now you're planning your week around a public charger. We'll get a Level 2 charger on your wall so the car is full every morning.",
    problem: "You want to charge your EV at home, not in a grocery store parking lot.",
    story: [
      "A lot of new EV owners in Spokane start out on a standard 120-volt outlet, which adds only a few miles of range per hour, or they sit at a public fast charger a couple of times a week. Neither is what you had in mind.",
      "A Level 2 charger runs on a dedicated 240-volt circuit and can typically refill an overnight commute's worth of range while you sleep. The questions most people get stuck on are whether the panel can handle it, which charger to buy, and where it should go. Those are exactly the things we sort out before any wire gets pulled.",
    ],
    signs: {
      heading: "You're probably ready for a Level 2 charger if…",
      items: [
        "You're charging on a regular 120-volt outlet and it can't keep up with your driving.",
        "You're relying on public chargers and it's eating into your evenings.",
        "You have a second EV coming, or two drivers sharing one charger.",
        "You're buying or building a home and want it EV-ready from the start.",
        "You already have a charger, but it trips a breaker or the outlet runs warm.",
      ],
    },
    work: {
      heading: "What a proper EV charger install involves",
      intro:
        "Every home is different, but a charger install done right follows the same order: figure out what the house can support first, then install for that.",
      steps: [
        {
          title: "A load check on your panel",
          body: "EV charging is a continuous load, so the circuit is sized with headroom. We look at your service size, what's already on the panel and how your home uses power, and tell you plainly whether the charger fits as is.",
        },
        {
          title: "Choosing the charger and the circuit",
          body: "Hardwired wall connector or a NEMA 14-50 receptacle for a plug-in unit? We'll talk through the trade-offs for your car and garage, including how fast you actually need to charge.",
        },
        {
          title: "Routing it cleanly",
          body: "The run from the panel to the charger is planned so it is protected, supported and tidy, whether that's through a finished garage, along an exterior wall or out to a detached garage.",
        },
        {
          title: "Permit, install and inspection",
          body: "A new 240-volt circuit needs an electrical permit. We handle it, install to the code as adopted in Washington, and the work is inspected before it's signed off.",
        },
        {
          title: "Setup and a walkthrough",
          body: "We set the charger's current limit to match the circuit, confirm it charges, and show you the breaker and the settings that matter.",
        },
      ],
    },
    doneRight: {
      heading: "The details that keep a charger safe for years",
      intro:
        "A charger pulls a heavy load for hours at a time, night after night. That's why the shortcuts you sometimes see (an undersized wire, a cheap receptacle, a dryer-outlet splitter) cause problems.",
      points: [
        {
          title: "Sized for continuous load",
          body: "The breaker, wire and charger setting have to agree with each other. We size them for the charger you're actually installing, not a guess.",
        },
        {
          title: "GFCI protection where it's required",
          body: "Current code requires ground-fault protection on many garage and outdoor receptacles, including those used for EV charging. That affects whether a plug-in or hardwired charger makes more sense, and we'll explain why.",
        },
        {
          title: "Outdoor-rated where it lives outside",
          body: "A charger on an exterior wall or driveway post needs a wet-location rating, sealed connections and protected wiring. Spokane winters find the weak points.",
        },
        {
          title: "Options before a service upgrade",
          body: "If your panel is tight, a full service upgrade isn't the only answer. Load-management devices and chargers with power-sharing can sometimes avoid it. We'll tell you honestly which applies.",
        },
      ],
    },
    factors: {
      heading: "What shapes the scope of your install",
      items: [
        { title: "Panel capacity", body: "The single biggest factor. Room for a 2-pole breaker and enough service capacity keep it simple." },
        { title: "Distance from the panel", body: "A charger right next to the panel is a different job than one at the far end of a detached garage." },
        { title: "Charger type", body: "Hardwired units and plug-in units have different circuit and protection requirements." },
        { title: "Inside or outside", body: "Exterior installs need weather-rated equipment and protected routing." },
      ],
    },
    prepare: [
      "Your car's make and model, and the charger if you've already bought one",
      "A photo of your electrical panel with the door open, plus the label on the main breaker",
      "Where you'd like the charger, and roughly how far that is from the panel",
      "Whether your garage is attached, detached or finished",
    ],
    faqs: [
      {
        q: "Do I need a permit to install an EV charger in Spokane?",
        a: `Installing a new 240-volt circuit for a Level 2 charger needs an electrical permit. ${permitLine}`,
      },
      {
        q: "Hardwired charger or a NEMA 14-50 outlet?",
        a: "Both work. Hardwired chargers such as the Tesla Wall Connector can often charge faster on the same panel, and they avoid some of the GFCI and receptacle-wear issues a plug-in setup can run into. A 14-50 outlet is flexible if you might change chargers. We'll recommend one based on your car and your panel.",
      },
      {
        q: "Will I need a panel upgrade for an EV charger?",
        a: "Not always. Many homes have the capacity already. If yours is tight, a load-management device or a charger set to a lower current can sometimes avoid an upgrade. If an upgrade is genuinely needed, we'll show you why.",
      },
      {
        q: "Can you install a charger I bought online?",
        a: "Usually, yes, as long as it's a listed product from a reputable manufacturer. Send us the model when you reach out so we can check it before the visit.",
      },
      {
        q: "How long does an install take?",
        a: "A straightforward install near the panel is often done in a day. Longer runs, detached garages or panel work add time. You'll know what to expect before we start.",
      },
    ],
    related: ["electrical-panel-upgrades", "subpanel-installation", "exterior-lighting"],
  },
  {
    slug: "electrical-panel-upgrades",
    name: "Electrical panel upgrade",
    short: "Panel upgrades",
    tag: "Replace · Breakers · Space",
    confirmed: true,
    image: "panel",
    meta: {
      title: "Electrical Panel Upgrades in Spokane, WA | Acorn Electric",
      description:
        "Electrical panel replacement for Spokane homes. Out of breaker space, an older or flagged panel, or adding an EV charger or hot tub? Options first.",
    },
    h1: "Electrical panel upgrades for Spokane homes",
    lede:
      "Your panel was sized for the house as it was built, not for the EV, hot tub, heat pump and shop you have now. We'll tell you whether it needs replacing, and do it properly if it does.",
    problem: "Your electrical panel is full, old, or can't take what you want to add.",
    story: [
      "Panels rarely fail all at once. More often you notice it a piece at a time: no space for a new breaker, an older fuse box an insurer has flagged, or an electrician telling you the EV charger you want won't fit.",
      "A panel upgrade can mean replacing the panel itself, increasing the size of your electrical service (commonly 100 to 200 amps), or both. Which one you need depends on what you're adding and what's there now. That's the first conversation we have.",
    ],
    signs: {
      heading: "Signs your panel is due for attention",
      items: [
        "There's no room for new breakers, or you see breakers doubled up on one slot.",
        "You still have a fuse box, or a panel brand an inspector or insurer has flagged.",
        "Breakers trip often, feel warm, or the panel buzzes.",
        "You're adding an EV charger, hot tub, heat pump, shop or ADU.",
        "You're buying or selling an older home and the inspection raised the panel.",
      ],
    },
    work: {
      heading: "How a panel or service upgrade works",
      intro:
        "Panel work touches the point where power enters your home, so it's planned carefully and coordinated with your utility when the service is involved.",
      steps: [
        {
          title: "Assess what you have and what you'll add",
          body: "We look at the existing panel, service size, grounding and the loads you're planning, then recommend the smallest upgrade that actually solves the problem.",
        },
        {
          title: "Permit and utility coordination",
          body: "Panel and service work needs an electrical permit. When the service is being changed, the power is disconnected and reconnected by your utility, and we schedule that with them.",
        },
        {
          title: "Replace and reconnect",
          body: "The new panel goes in, existing circuits are reconnected and labelled clearly, and grounding and bonding are brought up to what the job requires.",
        },
        {
          title: "Inspection and power-up",
          body: "The work is inspected, power is restored, and we check that everything in the house came back on as it should.",
        },
      ],
    },
    doneRight: {
      heading: "What a careful panel job looks like",
      intro: "Most of what separates a good panel upgrade from a bad one is invisible once the cover is on. These are the parts we don't skip.",
      points: [
        { title: "Grounding and bonding", body: "The new panel is only as safe as its connection to ground. We verify the grounding electrode system and bonding as part of the job." },
        { title: "A directory you can read", body: "Every breaker labelled with what it actually feeds, so the next time something trips, you know which one." },
        { title: "Room to grow", body: "We size and lay out the panel so the next addition doesn't mean another upgrade." },
        { title: "Weather-tight outside", body: "Where the job includes the meter base or service entrance, exterior penetrations are sealed against Spokane's freeze-thaw winters." },
      ],
    },
    factors: {
      heading: "What shapes the scope of a panel upgrade",
      items: [
        { title: "Panel only or full service", body: "Swapping a panel at the same amperage is simpler than increasing the size of your service." },
        { title: "Condition of the mast and meter base", body: "If those need replacing too, the job grows. We'll tell you up front." },
        { title: "Utility scheduling", body: "Service changes depend on your utility's disconnect and reconnect." },
        { title: "Existing wiring", body: "Old circuits sometimes need correcting before they can land in a new panel." },
      ],
    },
    prepare: [
      "Photos of your panel with the door open and with the main breaker label visible",
      "A photo of your meter and where the service enters the house",
      "What you're planning to add (EV charger, hot tub, heat pump, shop, remodel)",
      "The approximate age of the home",
    ],
    faqs: [
      {
        q: "How do I know whether I need a new panel or a service upgrade?",
        a: "A panel replacement swaps the box and breakers. A service upgrade increases how much power your home can draw from the utility. If you're out of space but not capacity, you may only need the first. A load calculation tells us which.",
      },
      {
        q: "Do panel upgrades in Spokane need a permit?",
        a: `Yes. Panel and service work requires an electrical permit and inspection. ${permitLine}`,
      },
      {
        q: "Will my power be off during the upgrade?",
        a: "For part of the day, yes. When the service is changed your utility disconnects and reconnects power. We'll tell you the plan ahead of time so you can prepare.",
      },
      {
        q: "My insurer flagged my panel brand. Is it really a problem?",
        a: "Some older panel lines, such as Federal Pacific Stab-Lok and Zinsco, have well-documented reliability concerns, and many insurers and home inspectors flag them. We'll look at yours and tell you honestly what we see.",
      },
    ],
    related: ["electrical-service-upgrade", "whole-home-surge-protection", "ev-charger-installation"],
  },
  {
    slug: "subpanel-installation",
    name: "Subpanel installation",
    short: "Subpanels",
    tag: "Feeder · Shop · ADU",
    confirmed: true,
    image: "subpanel",
    meta: {
      title: "Subpanel Installation in Spokane | Acorn Electric",
      description:
        "Subpanels for Spokane garages, shops, ADUs and basements. Feeder sizing, grounding and permits handled so the new space has the power it needs.",
    },
    h1: "Subpanel installation for garages, shops and additions",
    lede:
      "You've got a shop, a detached garage, an ADU or a basement finish that needs real power, not an extension cord. A subpanel brings circuits to where you're working.",
    problem: "Your garage, shop or new space needs its own power.",
    story: [
      "A subpanel is a second, smaller panel fed from your main one. It puts breakers close to where the power is used, and it makes sense when one area needs several circuits: a shop with a welder and a compressor, a detached garage with an EV charger and lights, a basement suite or an ADU.",
      "Done right, it's one of the most useful upgrades a property can have. Done wrong, and we've seen plenty, it's a common source of shocks, nuisance trips and failed inspections.",
    ],
    signs: {
      heading: "A subpanel might be the answer if…",
      items: [
        "You're running extension cords to a garage or shop.",
        "Your main panel has no space left but has capacity to spare.",
        "You're finishing a basement or adding an ADU or addition.",
        "You need 240-volt power for shop tools, a welder or a charger in an outbuilding.",
        "Breakers in the garage trip whenever two tools run at once.",
      ],
    },
    work: {
      heading: "What a subpanel installation involves",
      intro: "The main decisions are how much power the subpanel needs and how the feeder gets there.",
      steps: [
        { title: "Plan the load", body: "We list what will run in the space now and later, and size the feeder and subpanel to suit, after confirming the main panel can supply it." },
        { title: "Route the feeder", body: "Inside the house that might be through framing or a crawlspace. To a detached building it usually means a trench or an approved overhead route." },
        { title: "Set the subpanel", body: "Mounted, grounded and bonded correctly, with a disconnect where the building requires one." },
        { title: "Permit and inspection", body: "Subpanels and feeders need an electrical permit. We handle it and the work is inspected." },
      ],
    },
    doneRight: {
      heading: "Where subpanels usually go wrong",
      intro: "These details are easy to get wrong and they matter.",
      points: [
        { title: "Neutrals and grounds kept separate", body: "In a subpanel, the neutral and ground are isolated from each other. Bonding them together, as in a main panel, is a common and dangerous mistake." },
        { title: "Detached buildings get their own grounding", body: "An outbuilding needs its own grounding electrode and a means of disconnect. We install both." },
        { title: "Feeder sized for the real load", body: "Too small and it overheats or trips; we size it for what you'll run, with room to grow." },
        { title: "Buried runs done properly", body: "Underground feeders use the right wiring method at the right depth with protection where they come out of the ground." },
      ],
    },
    factors: {
      heading: "What shapes the scope",
      items: [
        { title: "Distance and route", body: "Trenching across a yard is a bigger job than a run through an unfinished basement." },
        { title: "Size of the subpanel", body: "The amperage you need decides wire size, conduit and breaker." },
        { title: "Main panel capacity", body: "If the main panel can't supply the feeder, that needs addressing first." },
        { title: "Surfaces in the way", body: "Concrete, finished walls and landscaping all affect the route." },
      ],
    },
    prepare: [
      "Photos of your main panel with the door open",
      "What you plan to run in the new space (tools, heaters, charger, lights)",
      "The distance from the house to the building, and what's between them",
      "Whether the building already has any wiring",
    ],
    faqs: [
      {
        q: "How big should my shop subpanel be?",
        a: "It depends on what you'll run at the same time. A hobby garage and a working shop with a welder and compressor are very different. We size it from your actual list, and leave room for what's next.",
      },
      {
        q: "Do I need a permit for a subpanel in Spokane?",
        a: `Yes. A new feeder and subpanel need an electrical permit and inspection. ${permitLine}`,
      },
      {
        q: "Can a subpanel fix a full main panel?",
        a: "Sometimes. If you're out of breaker space but your service has spare capacity, moving circuits to a subpanel can work. If you're out of capacity, a subpanel won't help; a service upgrade will.",
      },
      {
        q: "Can you trench to my detached garage?",
        a: "Getting the feeder there is part of the job. Tell us about the route (lawn, concrete, landscaping) and we'll plan it with you.",
      },
    ],
    related: ["electrical-panel-upgrades", "ev-charger-installation", "hot-tub-wiring"],
  },
  {
    slug: "hot-tub-wiring",
    name: "Hot tub wiring",
    short: "Hot tub wiring",
    tag: "240V · GFCI · Disconnect",
    confirmed: true,
    image: "hottub",
    meta: {
      title: "Hot Tub Wiring & Spa Electrical in Spokane | Acorn Electric",
      description:
        "Hot tub and spa wiring in Spokane: dedicated 240V circuit, GFCI disconnect, bonding and weather-tight outdoor work. Sized to your spa's spec and inspected.",
    },
    h1: "Hot tub wiring in Spokane, done right the first time",
    lede:
      "The hot tub is on order and the pad is poured. What's left is the part that has to be right: a dedicated circuit, a GFCI disconnect and outdoor wiring that holds up to Spokane winters.",
    problem: "You're installing a hot tub and want the electrical done properly.",
    story: [
      "Most full-size hot tubs need their own 240-volt circuit, sized to the manufacturer's spec, with ground-fault protection and a disconnect near the tub. Water, electricity and a lot of snow make this one of the jobs where details really matter.",
      "We plan the circuit from your spa's spec sheet, run it in a way that's protected outdoors, and set the disconnect where the code and your patio both work.",
    ],
    signs: {
      heading: "Call us when…",
      items: [
        "You've bought a hot tub or swim spa and need it wired.",
        "You're replacing an old tub and the new one needs a different circuit.",
        "Your existing hot tub trips its GFCI or the disconnect looks weathered.",
        "You're moving a tub to a new spot on the property.",
        "The dealer told you the tub needs a 50- or 60-amp circuit and you're not sure your panel has room.",
      ],
    },
    work: {
      heading: "What hot tub wiring involves",
      intro: "The spa's installation manual sets the circuit size. Code sets how it's protected. Your yard sets the route.",
      steps: [
        { title: "Check the spec and the panel", body: "We read the spa's requirements and confirm your panel can supply them. If it can't, we'll explain the options." },
        { title: "Run a dedicated circuit", body: "A dedicated 240-volt circuit, in a wiring method suited to outdoor and underground use, from the panel to the spa." },
        { title: "Install the GFCI disconnect", body: "A ground-fault protected disconnect, placed within sight of the tub and at the distance the code requires, so you can safely shut it off for service." },
        { title: "Bond, connect, inspect", body: "Required bonding, the final connection at the spa, then a permit inspection before you fill it up and turn it on." },
      ],
    },
    doneRight: {
      heading: "What makes it safe around water",
      intro: "This is the work you don't see once the tub is running, and it's the work that protects your family.",
      points: [
        { title: "Ground-fault protection", body: "A GFCI disconnect cuts power fast if current leaks where it shouldn't. It's required, and we test it before we leave." },
        { title: "Disconnect placement", body: "Close enough to see the tub, far enough to be safe. Generally within sight and at least five feet away, unless a permanent barrier separates them." },
        { title: "Bonding", body: "Metal parts around the spa are bonded together so there's no voltage difference between things you might touch." },
        { title: "Weather-proofed outdoor work", body: "Sealed entries, rated fittings and protected conduit where it leaves the ground. Freeze-thaw cycles punish anything less." },
      ],
    },
    factors: {
      heading: "What shapes the scope",
      items: [
        { title: "Your spa's amperage", body: "Usually set by the manufacturer. Bigger tubs and swim spas need bigger circuits." },
        { title: "Distance from the panel", body: "And whether the route goes through the house, along a wall or underground." },
        { title: "Panel space and capacity", body: "A large spa can be the load that tips a panel into an upgrade." },
        { title: "Surface and landscaping", body: "Trenching through lawn is easier than cutting concrete or pavers." },
      ],
    },
    prepare: [
      "The hot tub's make and model, or a photo of the electrical section of its spec sheet",
      "Photos of your electrical panel with the door open",
      "Where the tub will sit, and roughly how far that is from the panel",
      "What's between them (lawn, deck, concrete, pavers)",
    ],
    faqs: [
      {
        q: "What size circuit does a hot tub need?",
        a: "It depends on the tub. Most full-size spas call for a dedicated 240-volt circuit, commonly in the 40- to 60-amp range, but the manufacturer's spec sheet is the authority. Send it to us and we'll size the circuit to it.",
      },
      {
        q: "Does hot tub wiring need a permit in Spokane?",
        a: `Yes. A new circuit for a spa requires an electrical permit and inspection. ${permitLine}`,
      },
      {
        q: "What about plug-and-play 120-volt hot tubs?",
        a: "Some smaller spas plug into a standard outlet, but that outlet still needs to be GFCI protected, on an appropriate circuit and in the right spot. Many people later convert them to 240 volts so they heat faster. We can do either.",
      },
      {
        q: "Can you wire the tub before it's delivered?",
        a: "Usually yes, as long as we know the model and the final location. We can leave the circuit ready for the connection, then come back to connect it once the tub is set.",
      },
    ],
    related: ["electrical-panel-upgrades", "subpanel-installation", "exterior-lighting"],
  },
  {
    slug: "recessed-lighting",
    name: "Recessed lighting installation",
    short: "Recessed lighting",
    tag: "LED · Dimmable · IC-rated",
    confirmed: true,
    image: "recessed",
    meta: {
      title: "Recessed Lighting Installation in Spokane | Acorn Electric",
      description:
        "Recessed and canless LED lighting for Spokane homes. Layout planning, dimmers that don't flicker, and fixtures rated for insulated ceilings.",
    },
    h1: "Recessed lighting installation for Spokane homes",
    lede:
      "One ceiling light in the middle of the room leaves corners dim and shadows everywhere. Well-planned recessed lighting fixes that, and it starts with the layout, not the fixtures.",
    problem: "Your rooms are dim, and one ceiling fixture isn't cutting it.",
    story: [
      "Recessed lighting (pot lights, can lights, or the newer slim canless LED fixtures) sits flush with the ceiling and spreads light evenly. It's the most common lighting upgrade we hear about, especially in kitchens, living rooms and basements.",
      "The difference between a room that looks great and one that looks like a parking garage is planning: where the lights go, how bright and how warm they are, and dimmers that work with them.",
    ],
    signs: {
      heading: "Recessed lighting is worth a look if…",
      items: [
        "Your kitchen counters are in your own shadow.",
        "A basement or bonus room relies on lamps.",
        "You're remodelling and the ceiling is open anyway.",
        "Your existing can lights are old, hot, or flicker on the dimmer.",
        "You want lighting on dimmers you can set by room.",
      ],
    },
    work: {
      heading: "How a recessed lighting project comes together",
      intro: "Most of the craft is in the plan. Installation follows it.",
      steps: [
        { title: "Lay it out", body: "We plan spacing around how you use the room: task light where you work, even light where you live, and clear of joists and ducts." },
        { title: "Pick the right fixtures", body: "Canless LED wafers or housings, colour temperature, brightness, and trims. Fixtures in an insulated ceiling must be rated for it." },
        { title: "Wire and switch", body: "New circuits or extended ones, routed through existing ceilings with as little patching as possible, with compatible dimmers." },
        { title: "Test and tidy", body: "Every light, every dimmer setting, checked. Dust controlled while we work and cleaned up after." },
      ],
    },
    doneRight: {
      heading: "Details that separate good lighting from a ceiling full of holes",
      intro: "",
      points: [
        { title: "Rated for insulation", body: "Fixtures that touch insulation need to be IC-rated, and in insulated ceilings, airtight. It matters for safety and your heating bill." },
        { title: "Dimmers matched to the fixtures", body: "Most flicker and buzz problems come from mismatched dimmers and LEDs. We use combinations that work together." },
        { title: "Circuit capacity checked", body: "LEDs draw little, but we still confirm the circuit and any existing wiring in the ceiling are sound before adding to them." },
        { title: "Minimal patching", body: "In finished ceilings we route carefully to keep drywall repairs small." },
      ],
    },
    factors: {
      heading: "What shapes the scope",
      items: [
        { title: "Attic access", body: "Ceilings with an attic above are simpler than ceilings under a second floor." },
        { title: "Number of lights and switches", body: "More zones and dimmers mean more wiring." },
        { title: "Existing wiring", body: "Older wiring in the ceiling may need attention before it's extended." },
        { title: "Fixture choice", body: "Canless wafers, housings and decorative trims vary." },
      ],
    },
    prepare: [
      "Which rooms, and roughly how big",
      "Photos of the ceiling and the current light and switch",
      "Whether there's an attic or another floor above",
      "Any fixtures you've already picked out",
    ],
    faqs: [
      {
        q: "How many recessed lights does a room need?",
        a: "It depends on ceiling height, the fixtures' output and how the room is used. A kitchen needs more task light than a bedroom. We lay it out with you rather than using a one-size grid.",
      },
      {
        q: "Canless LED or traditional cans?",
        a: "Canless LED wafers are slim, efficient and easier to fit into existing ceilings. Traditional housings let you change trims and bulbs later. Both are good; we'll suggest one for your ceiling.",
      },
      {
        q: "Can you add recessed lights to a finished ceiling?",
        a: "Yes, usually through the fixture holes themselves with only small access cuts. Ceilings below a second floor take more planning than ceilings with an attic above.",
      },
      {
        q: "Why do my LED lights flicker on the dimmer?",
        a: "Usually the dimmer isn't compatible with the LED fixtures. Replacing the dimmer with a matched one fixes most cases.",
      },
    ],
    related: ["remodel-and-addition-wiring", "exterior-lighting", "electrical-repair"],
  },
  {
    slug: "service-mast-repair",
    name: "Service mast repair",
    short: "Service mast repair",
    tag: "Mast · Weatherhead · Meter base",
    confirmed: true,
    image: "mast",
    meta: {
      title: "Service Mast Repair & Replacement in Spokane | Acorn Electric",
      description:
        "Storm-bent or pulled-away service mast? We repair and replace masts, weatherheads and meter bases in Spokane and coordinate with your utility.",
    },
    h1: "Service mast repair and replacement in Spokane",
    lede:
      "A windstorm, a heavy snow slide or a tree limb bent the pipe on your roof where the power lines connect. Your utility won't reconnect until a licensed electrician repairs it. We can help.",
    problem: "A storm or a falling limb damaged where the power connects to your house.",
    story: [
      "The service mast is the metal pipe on your roof or wall that holds up the utility's service drop and carries the wires down to your meter. The weatherhead is the cap at the top that keeps water out. The meter base is the box the meter plugs into.",
      "The wires running from the pole belong to the utility. The mast, weatherhead and meter base belong to the homeowner. When those are damaged, Avista has said a licensed electrician needs to make the repair before it can safely restore power. That's where we come in.",
    ],
    signs: {
      heading: "Signs your mast needs attention",
      items: [
        "The mast is bent, leaning, or pulling away from the house.",
        "The service wires sag lower than they used to, or a fitting broke.",
        "The meter base is loose, burned or damaged.",
        "Water is getting in where the mast goes through the roof.",
        "The mast is heavily rusted, or too short to clear the roof properly.",
      ],
    },
    work: {
      heading: "What a mast repair involves",
      intro: "Mast work is done with the utility, because it's on their side of the meter until they disconnect.",
      steps: [
        { title: "Safety first", body: "If wires are down or the mast is badly damaged, stay clear and contact your utility. We plan the repair once it's safe." },
        { title: "Assess the damage", body: "We check the mast, weatherhead, meter base, service entrance conductors and roof penetration to see what's actually damaged." },
        { title: "Permit and utility coordination", body: "Mast and service entrance work needs a permit, and the utility disconnects and reconnects power. We coordinate that." },
        { title: "Repair or replace", body: "Install a properly supported mast, a new weatherhead and new conductors as needed, and flash and seal the roof penetration." },
        { title: "Inspection and reconnect", body: "The work is inspected, then the utility reconnects your service." },
      ],
    },
    doneRight: {
      heading: "Built to handle the next storm",
      intro: "A mast takes real force from the service drop, plus snow and ice. The repair should be stronger than what failed.",
      points: [
        { title: "Proper support and height", body: "Securely braced and tall enough to keep the service drop at the clearance the code and utility require." },
        { title: "Waterproofed roof penetration", body: "A correctly flashed and sealed roof boot. A leaking mast is a roof problem waiting to happen." },
        { title: "Sealed weatherhead and meter base", body: "Water is the long-term enemy of service equipment. We keep it out." },
        { title: "Coordinated with the utility", body: "So you're not left waiting between the repair and the reconnect." },
      ],
    },
    factors: {
      heading: "What shapes the scope",
      items: [
        { title: "Extent of damage", body: "A bent mast alone is different from a damaged meter base and conductors." },
        { title: "Roof type and pitch", body: "Steep or slippery roofs take more setup." },
        { title: "Upgrade opportunity", body: "If the service is old or small, a repair can be a good moment to upgrade it." },
        { title: "Utility scheduling", body: "Reconnects depend on the utility's availability, especially after big storms." },
      ],
    },
    prepare: [
      "Photos of the mast, the roofline and the meter from the ground (please don't climb)",
      "Whether the power is currently on or off",
      "Whether you've already contacted your utility",
      "Whether there's any roof leak or interior water staining",
    ],
    faqs: [
      {
        q: "Who is responsible for the service mast, me or Avista?",
        a: "Generally, the utility owns the overhead wires from the pole to the connection at your house, and the homeowner owns the mast, weatherhead and meter base. Damage to those parts is repaired by a licensed electrician hired by the homeowner. Check with your utility for your specific service.",
      },
      {
        q: "My mast is bent but the power is still on. Is it urgent?",
        a: "Treat it seriously. A bent mast can put strain on the connections and let water in. Keep people and ladders away from it, and get it looked at soon. If wires are down or arcing, stay clear and call your utility right away.",
      },
      {
        q: "Does homeowner's insurance cover mast repair?",
        a: "Storm damage often is, but policies differ. We're happy to document the damage and the repair for your claim. Check the specifics with your insurer.",
      },
      {
        q: "Does a mast repair need a permit?",
        a: `Yes. Service entrance work requires a permit and inspection before reconnection. ${permitLine}`,
      },
    ],
    related: ["electrical-service-upgrade", "electrical-panel-upgrades", "grounding-and-bonding-upgrades"],
  },
  {
    slug: "electrical-inspections",
    name: "Home electrical inspection",
    short: "Electrical inspections",
    tag: "Safety · Buy · Sell",
    confirmed: true,
    image: "inspection",
    meta: {
      title: "Home Electrical Inspections in Spokane | Acorn Electric",
      description:
        "Home electrical safety inspections in Spokane. Buying an older home, flagged by an insurer, or uneasy about your wiring? Get a clear answer.",
    },
    h1: "Home electrical inspections in Spokane",
    lede:
      "Something about the wiring doesn't sit right: an older house, a home inspector's note, an insurer's question, or a warm outlet. An electrical inspection tells you what's actually there and what, if anything, needs doing.",
    problem: "You want to know your home's wiring is safe and up to code.",
    story: [
      "A general home inspection looks at a house broadly. An electrical inspection by a licensed electrician goes deeper: the panel, grounding and bonding, ground-fault and arc-fault protection, visible wiring, and the outlets and switches you use every day.",
      "Spokane has plenty of older homes with a few generations of electrical work layered inside them. The point isn't to find problems for the sake of it. It's to give you a clear, prioritised picture so you can decide what to do and when.",
    ],
    signs: {
      heading: "People usually book an inspection when…",
      items: [
        "They're buying an older home and want more than the general inspection.",
        "A home inspector or insurer flagged the panel or wiring.",
        "They've just moved in and don't know what previous owners did.",
        "They're planning a remodel, an EV charger or a hot tub.",
        "Lights flicker, breakers trip, or an outlet or switch feels warm.",
      ],
    },
    work: {
      heading: "What we look at",
      intro: "Scope depends on the house and your concerns, but an inspection typically covers:",
      steps: [
        { title: "Service and panel", body: "Panel condition, breaker sizing against wire size, signs of overheating, double taps and labelling." },
        { title: "Grounding and bonding", body: "The connection to earth and the bonding that keeps metal parts at the same potential." },
        { title: "Protection devices", body: "GFCI protection in kitchens, baths, garages and outdoors, and arc-fault protection where it applies." },
        { title: "Visible wiring and devices", body: "Outlets, switches and accessible wiring, including older wiring types like knob-and-tube or aluminum branch circuits." },
        { title: "A straight explanation", body: "What we found, what's urgent, what can wait, and what's fine as is." },
      ],
    },
    doneRight: {
      heading: "What you can expect from us",
      intro: "",
      points: [
        { title: "No upselling by fear", body: "If something is fine, we say so. If something is unsafe, we say that too, and why." },
        { title: "Prioritised findings", body: "Safety issues first, then code and reliability issues, then nice-to-haves." },
        { title: "Plain English", body: "You'll understand what we found, not just receive a list of code sections." },
        { title: "Not a permit inspection", body: "This is a private evaluation for you. Permit inspections are done by the City of Spokane or Washington L&I on permitted work." },
      ],
    },
    factors: {
      heading: "What shapes the inspection",
      items: [
        { title: "Size and age of the home", body: "Larger and older homes take longer." },
        { title: "Access", body: "Attics, crawlspaces and finished basements affect what we can see." },
        { title: "Your concerns", body: "A specific issue can be the focus, or we can look at the whole house." },
        { title: "Outbuildings", body: "Detached garages, shops and hot tubs can be included." },
      ],
    },
    prepare: [
      "The age of the home and any known past electrical work",
      "The inspection report or insurer's note, if one prompted this",
      "Any specific concerns: flickering, tripping, warm outlets, dead circuits",
      "Your timeline, if you're in the middle of a purchase",
    ],
    faqs: [
      {
        q: "How is this different from a general home inspection?",
        a: "A general inspector covers the whole house at a high level and often recommends an electrician for anything electrical. We're that electrician: we look closer, test more, and can tell you what a fix involves.",
      },
      {
        q: "Do I get something in writing?",
        a: "Tell us if you need written findings, for example for a purchase or an insurer, when you book, and we'll plan for it.",
      },
      {
        q: "Will you fix things during the inspection?",
        a: "Small, safe fixes are sometimes possible on the spot. Anything bigger we explain and quote so you can decide.",
      },
      {
        q: "I'm buying a house with knob-and-tube wiring. Is that a deal-breaker?",
        a: "Not necessarily, but it deserves a close look. Its condition, how much is still live and what's been modified all matter, and insurers often ask about it. An inspection gives you facts to negotiate with.",
      },
    ],
    related: ["knob-and-tube-rewiring", "real-estate-electrical-repairs", "electrical-repair"],
  },
  {
    slug: "attic-fan-installation",
    name: "Attic fan installation",
    short: "Attic fans",
    tag: "Ventilation · Thermostat",
    confirmed: true,
    image: "atticfan",
    meta: {
      title: "Attic Fan Installation in Spokane | Acorn Electric",
      description:
        "Powered attic fan installation for Spokane homes: thermostat control and a properly sealed roof or gable mount. We check your attic venting first.",
    },
    h1: "Attic fan installation in Spokane",
    lede:
      "Spokane summers push attic temperatures far above the outdoor air, and the upstairs feels it. A powered attic fan can move that heat out, if the attic is set up for it.",
    problem: "Your upstairs bakes all summer and the attic is an oven.",
    story: [
      "An attic fan pulls hot air out of the attic so it isn't radiating down into the rooms below. It's controlled by a thermostat, sometimes with a humidistat, so it runs only when it's needed.",
      "It works best as part of balanced ventilation. A fan without enough intake venting can pull air from the house instead of from outside, so we look at the whole attic before recommending one.",
    ],
    signs: {
      heading: "An attic fan might help if…",
      items: [
        "Upstairs rooms stay hot long after sunset.",
        "Your AC runs hard all summer to keep the top floor comfortable.",
        "The attic is stifling when you open the hatch.",
        "An existing attic fan has stopped working or got noisy.",
        "You're re-roofing and want ventilation addressed at the same time.",
      ],
    },
    work: {
      heading: "What the install involves",
      intro: "",
      steps: [
        { title: "Check the attic's venting", body: "We look at soffit and gable intake, existing vents and insulation, so the fan pulls outside air, not your conditioned air." },
        { title: "Choose roof or gable mount", body: "Gable mounts avoid a new roof penetration; roof mounts can be placed where they work best. We'll explain which suits your attic." },
        { title: "Wire and control it", body: "A properly supplied circuit and a thermostat (and humidistat if useful), with a disconnect where it's required." },
        { title: "Seal it up", body: "Penetrations are flashed and sealed so the fan doesn't become a leak." },
      ],
    },
    doneRight: {
      heading: "Why we don't just cut a hole and mount a fan",
      intro: "",
      points: [
        { title: "Balanced ventilation", body: "Without enough intake, a powered fan can depressurize the attic and pull air, and sometimes combustion gases, from the house." },
        { title: "Weather-tight penetrations", body: "Proper flashing and sealing at the roof or gable. Spokane snow and rain find any gap." },
        { title: "Controls that make sense", body: "Thermostat set points that move heat without running the fan for nothing." },
        { title: "Safe wiring in a hot space", body: "Attic wiring is supported, protected and rated for the location." },
      ],
    },
    factors: {
      heading: "What shapes the scope",
      items: [
        { title: "Roof or gable mount", body: "Roof mounts need a new, flashed penetration." },
        { title: "Power nearby", body: "Whether there's a suitable circuit in or near the attic." },
        { title: "Attic access", body: "Tight attics take longer to work in." },
        { title: "Existing venting", body: "If intake is inadequate, it should be addressed too." },
      ],
    },
    prepare: [
      "Photos of the roof and gable ends from outside",
      "Whether you have attic access, and where",
      "Whether there's an old fan to replace",
      "Any upcoming roofing work",
    ],
    faqs: [
      {
        q: "Is an attic fan the same as a whole-house fan?",
        a: "No. An attic fan ventilates the attic only. A whole-house fan pulls cooler outside air through open windows into the house and exhausts it through the attic. They solve different problems.",
      },
      {
        q: "Do you install solar-powered attic fans?",
        a: "No. We install wired attic fans on a thermostat, which run whenever the attic is hot rather than only when the sun is on a panel. We don't do solar work.",
      },
      {
        q: "Will an attic fan cause a roof leak?",
        a: "Not if the penetration is flashed and sealed properly. That's a core part of how we install them.",
      },
    ],
    related: ["recessed-lighting", "electrical-inspections", "exterior-lighting"],
  },
  {
    slug: "exterior-lighting",
    name: "Exterior lighting installation",
    short: "Exterior lighting",
    tag: "Wet-rated · Motion · Timer",
    confirmed: false,
    image: "exterior",
    meta: {
      title: "Exterior Lighting Installation in Spokane | Acorn Electric",
      description:
        "Exterior lighting for Spokane homes: porch, soffit and security lights, motion sensors and timers, installed weather-tight for our winters.",
    },
    h1: "Exterior lighting installation for Spokane homes",
    lede:
      "A dark driveway, a porch light you can't see by and a back yard nobody uses after sunset. Good exterior lighting makes the house safer and more usable, and it has to survive our winters.",
    problem: "Your yard, driveway or entry is dark once the sun goes down.",
    story: [
      "Exterior lighting covers a lot of ground: entry and porch fixtures, soffit and security lights, motion-sensor floods, path and patio lighting, and outdoor outlets for the holidays.",
      "Outdoors, the details are mostly about water. Every box, fixture and connection has to be rated for the location and sealed, or a Spokane winter will find it.",
    ],
    signs: {
      heading: "Time to rethink exterior lighting if…",
      items: [
        "You walk to the door in the dark.",
        "The driveway or side yard feels like a blind spot.",
        "Fixtures are corroded, cracked or keep burning out.",
        "You want motion, dusk-to-dawn or timer control.",
        "You want more outdoor outlets for lights, tools or a patio.",
      ],
    },
    work: {
      heading: "How we approach an exterior lighting project",
      intro: "",
      steps: [
        { title: "Plan the light", body: "Where you need to see, what should be lit for security, and keeping light aimed down, not into neighbours' windows." },
        { title: "Pick rated fixtures and controls", body: "Wet- or damp-location rated fixtures, plus motion sensors, photocells or timers." },
        { title: "Wire it weather-tight", body: "Sealed boxes and entries, in-use covers on outlets, GFCI protection where required." },
        { title: "Test and aim", body: "We aim fixtures and set sensors so they do what you want." },
      ],
    },
    doneRight: {
      heading: "Outdoor work that lasts",
      intro: "",
      points: [
        { title: "Location-rated everything", body: "Fixtures and boxes rated for wet or damp locations, as the spot requires." },
        { title: "Sealed penetrations", body: "Where wiring passes through siding or brick, it's sealed against water and pests." },
        { title: "GFCI and in-use covers", body: "Outdoor receptacles are protected and covered, even with something plugged in." },
        { title: "Light where it's useful", body: "Shielded, aimed fixtures that light your property, not the sky or the neighbours." },
      ],
    },
    factors: {
      heading: "What shapes the scope",
      items: [
        { title: "Existing boxes", body: "Replacing fixtures on existing boxes is simpler than adding new locations." },
        { title: "Wall material", body: "Siding, brick and stucco each take different approaches." },
        { title: "Controls", body: "Smart switches, sensors and timers add flexibility." },
        { title: "Distance into the yard", body: "Post lights and detached locations may need underground runs." },
      ],
    },
    prepare: [
      "Photos of the areas you want lit, and the existing fixtures",
      "What you want: security, entry, patio, path or holiday outlets",
      "Any fixtures you've chosen",
      "The exterior wall material",
    ],
    faqs: [
      {
        q: "Can you add lights where there's no existing wiring?",
        a: "Usually, yes. We'll find the best way to get power to the new location with the least disruption.",
      },
      {
        q: "Do you install low-voltage landscape lighting?",
        a: "Ask us about your project and we'll tell you whether it's something we take on.",
      },
      {
        q: "Do outdoor outlets need GFCI protection?",
        a: "Yes. Outdoor receptacles need ground-fault protection and weather-resistant covers that stay closed while something is plugged in.",
      },
    ],
    related: ["recessed-lighting", "hot-tub-wiring", "ev-charger-installation"],
  },
  {
    slug: "electrical-repair",
    name: "Electrical repair and troubleshooting",
    short: "Repairs & troubleshooting",
    tag: "Diagnose · Repair",
    confirmed: true,
    image: "repair",
    meta: {
      title: "Electrical Repair & Troubleshooting in Spokane | Acorn Electric",
      description:
        "Dead outlets, flickering lights, tripping breakers or a switch that runs warm? Acorn Electric finds the cause and fixes it properly for Spokane homeowners.",
    },
    h1: "Electrical repair and troubleshooting in Spokane",
    lede:
      "An outlet went dead, a breaker keeps tripping or the lights flicker when the furnace kicks on. You don't need a guess and a new part. You need someone to find the actual cause.",
    problem: "Something electrical stopped working, or is acting strange.",
    story: [
      "Most electrical problems in a house are symptoms. A dead outlet might be a tripped GFCI two rooms away, a loose connection in a box, or a failed device. A breaker that trips might be overloaded, or warning you about a real fault.",
      "We trace the problem to its cause, fix it properly, and tell you whether it points to anything else you should know about.",
    ],
    signs: {
      heading: "Common reasons people call us",
      items: [
        "Outlets or a whole room have gone dead.",
        "A breaker trips again and again.",
        "Lights flicker or dim when appliances start.",
        "A switch, outlet or cover plate feels warm or discoloured.",
        "Something smells hot or like burning plastic near an outlet or panel.",
      ],
    },
    work: {
      heading: "How we troubleshoot",
      intro: "",
      steps: [
        { title: "Listen first", body: "When it started, what was running, and what you've already tried tell us a lot." },
        { title: "Test, don't guess", body: "We trace the circuit and test to find the fault, not swap parts until it goes away." },
        { title: "Fix the cause", body: "Repair the connection, device or wiring that failed, to the code as adopted in Washington." },
        { title: "Explain it", body: "What failed, why, and whether it suggests anything else to keep an eye on." },
      ],
    },
    doneRight: {
      heading: "Repairs that stay fixed",
      intro: "",
      points: [
        { title: "Root cause, not symptoms", body: "Resetting a breaker isn't a fix. Finding why it tripped is." },
        { title: "Proper materials", body: "Devices and connectors suited to the wiring in your home, including older wiring types." },
        { title: "Safety flagged", body: "If we see something unsafe while we're there, we tell you." },
        { title: "Permits when required", body: "Some repairs need a permit and inspection. We'll tell you when yours does." },
      ],
    },
    factors: {
      heading: "What shapes a repair",
      items: [
        { title: "How easy the fault is to find", body: "Intermittent problems can take longer to trace." },
        { title: "Access", body: "Finished walls and ceilings take care to work in." },
        { title: "Age of the wiring", body: "Older wiring may need more than a like-for-like repair." },
        { title: "Parts", body: "Most are on the van; some need ordering." },
      ],
    },
    prepare: [
      "What's happening, and when it started",
      "Which rooms or devices are affected",
      "Whether any breaker or GFCI outlet is tripped",
      "Photos of anything scorched, warm or damaged",
    ],
    faqs: [
      {
        q: "What should I do if I smell burning near an outlet or the panel?",
        a: "If there is smoke, fire or active sparking, get everyone out and call 911. If it's safe to do so, switch off the affected breaker. Don't keep using the circuit until it has been checked.",
      },
      {
        q: "Why does my breaker keep tripping?",
        a: "Usually an overloaded circuit, a fault in a device or appliance, or a wiring problem. Repeated tripping is the breaker doing its job, so it's worth finding out which.",
      },
      {
        q: "Do you work on older homes with knob-and-tube or aluminum wiring?",
        a: "Yes. Older wiring needs particular care and the right materials. We'll tell you what we find and what your options are, including a full knob and tube rewire if it's time.",
      },
    ],
    related: ["electrical-inspections", "knob-and-tube-rewiring", "whole-home-surge-protection"],
  },
];

/**
 * Site order (panel-schedule index, nav, footer, services page). Highest-demand
 * searches first, per the Oct 12 2026 meeting: EV chargers, panels, hot tubs.
 */
const order = [
  "ev-charger-installation",
  "electrical-panel-upgrades",
  "electrical-service-upgrade",
  "hot-tub-wiring",
  "knob-and-tube-rewiring",
  "whole-home-surge-protection",
  "electrical-inspections",
  "electrical-repair",
  "dedicated-appliance-circuits",
  "subpanel-installation",
  "remodel-and-addition-wiring",
  "new-home-electrical",
  "real-estate-electrical-repairs",
  "grounding-and-bonding-upgrades",
  "recessed-lighting",
  "exterior-lighting",
  "service-mast-repair",
  "attic-fan-installation",
  "commercial-electrical",
];

const all = [...coreServices, ...addedServices];
export const services: Service[] = order.map((slug) => {
  const s = all.find((x) => x.slug === slug);
  if (!s) throw new Error(`services order lists unknown slug: ${slug}`);
  return s;
});
if (services.length !== all.length) throw new Error("A service is missing from the `order` list in services.ts");

/**
 * What the site actually shows. Unconfirmed services appear only in preview
 * builds (review flags on); in production they aren't built at all.
 */
export const publishedServices = services.filter((s) => s.confirmed || SHOW_REVIEW_FLAGS);

export function getService(slug: string) {
  return publishedServices.find((s) => s.slug === slug);
}
