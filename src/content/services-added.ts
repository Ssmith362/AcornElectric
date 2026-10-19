import type { Service } from "./types";

/**
 * Services added from Eric Beisley's own list (email, Oct 16 2026):
 *
 *   New custom home electrical installation · Remodels and additions ·
 *   Panel upgrades · Service upgrades · Troubleshooting services ·
 *   Power for new electrical appliances · EV chargers · Grounding updates ·
 *   Knob and tube rewire · Whole home surge protector installation ·
 *   Whole home electrical safety inspection · Real estate repairs to sell a
 *   home · Commercial electrical services
 *
 * and what Acorn does NOT do (never advertise these):
 *   Solar · Industrial · Large scale construction · Commercial fire alarm ·
 *   Sound and audio
 *
 * Same writing rules as services.ts: no prices, timelines, warranties or
 * guarantees unless Acorn confirms them; no DIY instructions; each page
 * answers a different search.
 */

const permitLine =
  "Inside Spokane city limits, electrical permits and inspections go through the City of Spokane. Most other addresses in the area, including unincorporated Spokane County, are permitted and inspected by Washington L&I. We check which applies to your address.";

export const addedServices: Service[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "electrical-service-upgrade",
    name: "Electrical service upgrade",
    short: "Service upgrades",
    tag: "100 → 200A · Meter · Utility",
    confirmed: true,
    image: "service-upgrade",
    meta: {
      title: "Electrical Service Upgrades (200 Amp) in Spokane | Acorn Electric",
      description:
        "Need more power for an EV, heat pump, hot tub or shop? Acorn Electric upgrades Spokane homes to 200 amp service, coordinated with Avista or Inland Power.",
    },
    h1: "Electrical service upgrades for Spokane homes",
    lede:
      "Your house was built for the electrical load of its day. Add an EV, a heat pump, a hot tub or a shop and the main breaker becomes the bottleneck. A service upgrade gives the whole house more room to work with.",
    problem: "Your home can't draw enough power for what you want to add.",
    story: [
      "A panel replacement changes the box on the wall. A service upgrade changes how much power the whole house can pull from the utility: the meter base, the service conductors, the main breaker and often the mast. Plenty of Spokane homes still run on 100-amp service or less, which was generous when they were wired and is tight today.",
      "Most people don't wake up wanting a service upgrade. They want the EV charger, the heat pump or the shop, and somewhere along the way someone tells them the house can't carry it. Our job is to tell you plainly whether that's true, show you the numbers, and if it is, handle every part of the upgrade, including the utility, so you don't have to.",
    ],
    signs: {
      heading: "A service upgrade is worth looking at when…",
      items: [
        "Your home has 100-amp service or less and you're adding big loads.",
        "A load calculation for an EV charger, heat pump or hot tub came back short.",
        "The main breaker trips, or lights dim hard when large appliances start.",
        "You're converting from gas to electric for heat, water heating or cooking.",
        "You're building a shop, ADU or addition that needs its own capacity.",
      ],
    },
    work: {
      heading: "How a service upgrade works",
      intro: "Because the service is where power enters your home, this job involves the utility as well as us, and it's planned around that.",
      steps: [
        {
          title: "A load calculation first",
          body: "We add up what the house uses now and what you're planning, and confirm a service upgrade is actually the right answer. Sometimes load management or a smaller change will do.",
        },
        {
          title: "Permit and utility coordination",
          body: "We pull the electrical permit and work with Avista or Inland Power & Light, whichever serves your address, on the disconnect, any new meter and the reconnect.",
        },
        {
          title: "New service equipment",
          body: "Meter base, service conductors, main breaker or panel, and the mast or underground connection as the job requires, installed to the code as adopted in Washington.",
        },
        {
          title: "Grounding, bonding and surge protection",
          body: "The grounding electrode system is brought up to what the new service needs, and current code calls for a surge-protective device whenever a home's service is replaced or upgraded.",
        },
        {
          title: "Inspection and reconnection",
          body: "The work is inspected, the utility restores power, and we check that every circuit in the house came back as it should.",
        },
      ],
    },
    doneRight: {
      heading: "What a careful service upgrade looks like",
      intro: "Most of a service upgrade is out of sight once it's done. These are the parts we don't rush.",
      points: [
        { title: "Sized for where you're going", body: "We size the service for what you've told us is coming, so you're not doing this twice." },
        { title: "Weather-tight", body: "Every exterior penetration, fitting and seal is done for Spokane's freeze-thaw winters and spring rain." },
        { title: "One point of contact", body: "We deal with the permit office and the utility. You hear from us, not three different offices." },
        { title: "Power back the same day where possible", body: "We plan the disconnect window with you ahead of time so you can prepare." },
      ],
    },
    factors: {
      heading: "What shapes the scope of a service upgrade",
      items: [
        { title: "Overhead or underground", body: "Overhead services involve the mast and weatherhead; underground services involve the meter base and conduit." },
        { title: "Meter location", body: "Moving the meter or panel is a bigger job than upgrading in place." },
        { title: "Utility requirements", body: "Avista and Inland Power each have their own specifications and scheduling." },
        { title: "Condition of existing wiring", body: "Old circuits sometimes need correcting before they can move to new equipment." },
      ],
    },
    prepare: [
      "A photo of your meter and where the service wires reach the house",
      "Photos of your panel with the door open and the main breaker label visible",
      "What you're adding: EV, heat pump, hot tub, shop, ADU or a gas-to-electric switch",
      "Who your utility is, if you know (Avista or Inland Power & Light)",
    ],
    faqs: [
      {
        q: "What's the difference between a panel upgrade and a service upgrade?",
        a: "A panel upgrade replaces the breaker panel. A service upgrade increases how much power your home can draw from the utility, which usually means a new meter base, service conductors and main breaker as well. Some jobs need one, some need both.",
      },
      {
        q: "Do I need 200 amps?",
        a: "Not always. Many homes are fine on what they have once the numbers are run properly. A load calculation tells us, and we'll show you the result rather than just quoting the biggest option.",
      },
      {
        q: "Does a service upgrade need a permit in Spokane?",
        a: `Yes. Service work needs an electrical permit and inspection before the utility reconnects. ${permitLine}`,
      },
      {
        q: "Will my power be off?",
        a: "For part of the day. The utility disconnects and reconnects the service, and we schedule that window with you ahead of time.",
      },
    ],
    related: ["electrical-panel-upgrades", "ev-charger-installation", "whole-home-surge-protection"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "knob-and-tube-rewiring",
    name: "Knob and tube rewiring",
    short: "Knob & tube rewire",
    tag: "Older homes · Rewire",
    confirmed: true,
    image: "knob-tube",
    meta: {
      title: "Knob and Tube Wiring Replacement in Spokane | Acorn Electric",
      description:
        "Knob and tube wiring in your Spokane home? Acorn Electric finds what's still live, explains your options and rewires older homes with care for the plaster and trim.",
    },
    h1: "Knob and tube rewiring in Spokane",
    lede:
      "You love the old house. The original wiring, not so much. Maybe an inspector flagged it, maybe your insurer asked, or maybe you just want to stop wondering. We'll find out what's really in the walls and replace it without wrecking the character you bought the house for.",
    problem: "Your older home still has knob and tube wiring and you want it dealt with.",
    story: [
      "Knob and tube was the standard way to wire a house in the early 1900s, and Spokane has whole neighbourhoods built in that era. It isn't automatically dangerous, but it was never designed for today's loads, it has no ground, and after a century of remodels it has often been spliced, extended or buried in insulation it was never meant to be covered by.",
      "The hard part isn't knowing it should go. It's knowing how much is still live, what's safe to leave for now, and how to get new wire through finished plaster walls without turning the house upside down. That's the part we do the thinking on.",
    ],
    signs: {
      heading: "It's time to deal with it when…",
      items: [
        "A home inspection, appraisal or insurer has asked about knob and tube.",
        "You can see porcelain knobs and tubes in the attic, basement or crawlspace.",
        "Your outlets are two-prong and there are few of them per room.",
        "You're adding insulation to the attic or walls (knob and tube must not be buried in it).",
        "You're planning a remodel and the walls will be open anyway.",
      ],
    },
    work: {
      heading: "How a knob and tube rewire works",
      intro: "Every old house is different, so the job starts with finding out exactly what's there.",
      steps: [
        {
          title: "Find out what's live",
          body: "We trace which circuits are still knob and tube, which have been partly replaced, and where any risky splices or modifications are.",
        },
        {
          title: "A plan you can choose from",
          body: "A whole-house rewire at once, or in phases starting with the most important circuits. We lay out the options, and what each one costs you in disruption.",
        },
        {
          title: "Fish new wire with care",
          body: "We route new cable through attics, basements and existing cavities wherever we can, and keep openings in plaster and trim as few and as small as possible.",
        },
        {
          title: "Permit, inspection and a clear record",
          body: "Rewiring is permitted work. It's inspected, and you end up with a record you can show an insurer or a future buyer.",
        },
      ],
    },
    doneRight: {
      heading: "Respect for the house",
      intro: "Rewiring an older home is as much about care as it is about wire.",
      points: [
        { title: "Old circuits properly retired", body: "Abandoned wiring is disconnected at the source, so nothing is left live and forgotten in a wall." },
        { title: "Grounded outlets", body: "New circuits are grounded, with GFCI and arc-fault protection where the code requires it." },
        { title: "Minimal openings", body: "We plan routes to protect plaster, trim and original details, and tell you up front where openings are unavoidable." },
        { title: "Honest phasing", body: "If some of the old wiring can safely wait, we'll tell you. If it can't, we'll tell you that too." },
      ],
    },
    factors: {
      heading: "What shapes a rewire",
      items: [
        { title: "How much is still live", body: "A few remaining circuits is a very different job from a fully original house." },
        { title: "Access", body: "Open attics, unfinished basements and crawlspaces make routing much easier." },
        { title: "Wall finishes", body: "Plaster and lath takes more care than drywall." },
        { title: "Panel and service", body: "An old fuse panel or small service is often replaced as part of the same project." },
      ],
    },
    prepare: [
      "The approximate age of the home and any past electrical work you know about",
      "The inspection report or insurer's letter, if one prompted this",
      "Photos of the panel, and of any knob and tube you can see in the attic or basement",
      "Whether you're planning a remodel or insulation work soon",
    ],
    faqs: [
      {
        q: "Is knob and tube wiring illegal in Washington?",
        a: "Existing knob and tube isn't automatically required to be removed, but it can't be extended, it must not be covered by insulation, and many insurers won't cover a home with live knob and tube. Most owners replace it for those reasons.",
      },
      {
        q: "Do you have to tear out all my walls?",
        a: "No. Most rewires are done by fishing new cable through attics, basements and existing cavities, with small, planned openings where there's no other route.",
      },
      {
        q: "Can I rewire in stages?",
        a: "Often, yes. We can start with the highest-risk circuits, such as kitchens, bathrooms and anything near insulation, and plan the rest around your budget.",
      },
      {
        q: "Do I need a permit to replace knob and tube?",
        a: `Yes. Rewiring is permitted and inspected work. ${permitLine}`,
      },
    ],
    related: ["electrical-inspections", "electrical-panel-upgrades", "grounding-and-bonding-upgrades"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "whole-home-surge-protection",
    name: "Whole-home surge protection",
    short: "Surge protection",
    tag: "SPD · At the panel",
    confirmed: true,
    image: "surge",
    meta: {
      title: "Whole-Home Surge Protection in Spokane | Acorn Electric",
      description:
        "Protect your furnace, appliances, EV charger and electronics. Acorn Electric installs whole-home surge protectors at the panel for Spokane homes.",
    },
    h1: "Whole-home surge protection in Spokane",
    lede:
      "Your house is full of circuit boards now: the furnace, the fridge, the washer, the EV charger, the TV. A whole-home surge protector at the panel is a small job that protects all of them at once.",
    problem: "You want to protect your appliances and electronics from power surges.",
    story: [
      "Plug-in surge strips protect whatever is plugged into them. They do nothing for the furnace control board, the dishwasher, the heat pump or the EV charger, which are often the most expensive electronics in the house.",
      "A whole-home surge protective device mounts at your electrical panel and limits surges coming in from the utility side before they reach your circuits. It's one of the simplest upgrades we do, and one of the easiest to recommend.",
    ],
    signs: {
      heading: "Worth adding if…",
      items: [
        "You've lost an appliance board, garage opener or electronics to a surge before.",
        "You've recently added an EV charger, heat pump or other expensive equipment.",
        "Your area sees summer thunderstorms or utility switching events.",
        "You're having panel or service work done anyway.",
        "You work from home and rely on your equipment.",
      ],
    },
    work: {
      heading: "How we install it",
      intro: "",
      steps: [
        { title: "Check the panel", body: "We confirm there's a suitable spot and that the grounding and bonding the device relies on are sound." },
        { title: "Choose the right device", body: "A device rated for your panel and service, mounted as close to the panel as possible with short, direct leads." },
        { title: "Install and verify", body: "Installed to the manufacturer's instructions and the code as adopted in Washington, with its status indicator working." },
        { title: "Show you what to look for", body: "Most units have an indicator light. We'll show you what it means and what to do if it changes." },
      ],
    },
    doneRight: {
      heading: "The details that make it work",
      intro: "A surge protector is only as good as its connection to ground.",
      points: [
        { title: "Good grounding first", body: "We check the grounding electrode system, because a surge protector needs somewhere to send the surge." },
        { title: "Short leads", body: "Long, looping leads reduce how well the device works. We mount it to keep them short." },
        { title: "Layered where it helps", body: "For sensitive electronics, plug-in protection at the device still adds a second layer. We'll tell you where it's worth it." },
        { title: "Required with new service work", body: "Current code calls for surge protection whenever a home's service is replaced or upgraded, so it's built into those jobs." },
      ],
    },
    factors: {
      heading: "What shapes the job",
      items: [
        { title: "Panel space", body: "Some devices need a breaker space; others mount beside the panel." },
        { title: "Panel type", body: "Some panel brands have matched devices that fit neatly." },
        { title: "Grounding condition", body: "If grounding needs work, that's done first." },
        { title: "Other work happening", body: "It's often added during a panel, service or EV charger job." },
      ],
    },
    prepare: [
      "A photo of your panel with the door open and the label inside the door",
      "Any equipment you've lost to surges before",
      "Other electrical work you're planning",
    ],
    faqs: [
      {
        q: "Will a whole-home surge protector stop damage from a direct lightning strike?",
        a: "No device can promise that. A whole-home unit is designed for the far more common surges from the utility and nearby strikes, and it significantly reduces the risk to your equipment.",
      },
      {
        q: "Do I still need plug-in surge strips?",
        a: "For computers, TVs and networking gear, a good plug-in protector at the device is a sensible second layer. The whole-home unit protects everything else.",
      },
      {
        q: "Does it need a permit?",
        a: `Adding equipment at the panel is electrical work that generally needs a permit. ${permitLine}`,
      },
    ],
    related: ["electrical-service-upgrade", "electrical-panel-upgrades", "grounding-and-bonding-upgrades"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "grounding-and-bonding-upgrades",
    name: "Grounding and bonding upgrades",
    short: "Grounding updates",
    tag: "Ground rods · Bonding",
    confirmed: true,
    image: "grounding",
    meta: {
      title: "Electrical Grounding Upgrades in Spokane | Acorn Electric",
      description:
        "Missing or outdated grounding flagged on an inspection? Acorn Electric updates grounding electrodes and bonding for Spokane homes, including water and gas piping.",
    },
    h1: "Grounding and bonding upgrades for Spokane homes",
    lede:
      "Grounding is the part of your electrical system you never see and only notice when it's missing. If an inspector flagged it, or your home is older, we'll check it and bring it up to what your house actually needs.",
    problem: "An inspector flagged your grounding, or you're not sure your home has any.",
    story: [
      "Your home's grounding and bonding give fault current and surges a safe path, keep metal piping and equipment at the same potential, and let breakers trip when something goes wrong. In older homes it's common to find a single corroded clamp on a water pipe that was replaced with plastic years ago, or no ground rod at all.",
      "It's rarely a big job, but it's an important one, and it underpins everything else: surge protection, a new panel, an EV charger.",
    ],
    signs: {
      heading: "Common reasons to look at grounding",
      items: [
        "A home inspector noted missing, loose or corroded grounding.",
        "Your water line was replaced with plastic pipe.",
        "You have flexible yellow gas line (CSST) and aren't sure it's bonded.",
        "Your outlets test as having an open ground.",
        "You're adding a surge protector, new panel or service.",
      ],
    },
    work: {
      heading: "What a grounding update involves",
      intro: "",
      steps: [
        { title: "Find what's there", body: "We trace the grounding electrode conductor, check clamps and connections, and look at what electrodes exist." },
        { title: "Add or replace electrodes", body: "Ground rods or other electrodes are installed and connected as the code requires." },
        { title: "Bond the piping", body: "Metal water piping and gas piping are bonded where required, including CSST per its manufacturer's instructions." },
        { title: "Inspect and explain", body: "The work is permitted and inspected where required, and we walk you through what changed." },
      ],
    },
    doneRight: {
      heading: "Small job, done carefully",
      intro: "",
      points: [
        { title: "Proper clamps and fittings", body: "Listed clamps rated for direct burial or the location they're in, not whatever was in the truck." },
        { title: "Protected conductors", body: "Grounding conductors are protected where they could be damaged." },
        { title: "Checked against your service", body: "Conductor sizes are matched to your service size." },
        { title: "Part of the bigger picture", body: "If grounding problems point to something else, like an open neutral or old wiring, we'll tell you." },
      ],
    },
    factors: {
      heading: "What shapes the job",
      items: [
        { title: "Access", body: "Where the service, water line and gas line enter the house matters." },
        { title: "Soil and site", body: "Rock, slab and landscaping affect how electrodes go in." },
        { title: "Gas piping type", body: "CSST has specific bonding requirements." },
        { title: "Other work", body: "Often done alongside panel, service or surge protection work." },
      ],
    },
    prepare: [
      "The inspection note, if one prompted this",
      "Photos of your panel, meter, and where the water line enters the house",
      "Whether you have yellow flexible gas line anywhere",
    ],
    faqs: [
      {
        q: "What's the difference between grounding and bonding?",
        a: "Grounding connects your electrical system to the earth. Bonding connects metal parts together so they stay at the same voltage and fault current has a clear path back to trip a breaker. Both matter.",
      },
      {
        q: "My outlets are three-prong. Doesn't that mean they're grounded?",
        a: "Not necessarily. Three-prong outlets are sometimes installed on two-wire circuits with no ground. A quick test tells us, and there are code-compliant ways to fix it.",
      },
      {
        q: "Does grounding work need a permit?",
        a: `Most grounding and bonding work is permitted. ${permitLine}`,
      },
    ],
    related: ["whole-home-surge-protection", "electrical-inspections", "real-estate-electrical-repairs"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "dedicated-appliance-circuits",
    name: "Circuits for new appliances",
    short: "New appliance circuits",
    tag: "240V · Heat pumps · Ranges",
    confirmed: true,
    image: "appliance",
    meta: {
      title: "Dedicated Circuits for New Appliances in Spokane | Acorn Electric",
      description:
        "New heat pump, mini-split, induction range, dryer, freezer or shop equipment? Acorn Electric runs dedicated 120V and 240V circuits for Spokane homes.",
    },
    h1: "Power for new appliances in Spokane homes",
    lede:
      "The new appliance is bought, or about to be. What's between you and using it is a circuit that doesn't exist yet. We'll check your panel, run the right circuit and hook it up properly.",
    problem: "You bought a new appliance and there's no circuit to plug it into.",
    story: [
      "A lot of what people buy today needs its own circuit: heat pumps and mini-splits, induction ranges, electric dryers and water heaters, chest freezers, garage heaters, welders and shop tools. The installer often says 'you'll need an electrician for that part,' and that's where you get stuck.",
      "We work out what the appliance needs from its installation manual, confirm your panel can supply it, and run a dedicated circuit with the right breaker, wire and disconnect, so the appliance installer can finish and you can use the thing you paid for.",
    ],
    signs: {
      heading: "You'll likely need a new circuit for…",
      items: [
        "A heat pump or ductless mini-split.",
        "An induction or electric range, cooktop or wall oven.",
        "An electric dryer, tankless or heat pump water heater.",
        "A freezer, garage heater or second refrigerator that keeps tripping a shared circuit.",
        "Welders, compressors, table saws and other shop equipment.",
      ],
    },
    work: {
      heading: "How it works",
      intro: "",
      steps: [
        { title: "Read the nameplate", body: "We size the circuit from the appliance's installation instructions and nameplate, not a rule of thumb." },
        { title: "Check the panel", body: "Breaker space and service capacity are checked. If the panel is tight, we'll show you the options." },
        { title: "Run the circuit", body: "Wire, breaker, receptacle or disconnect, routed cleanly and protected, indoors or out." },
        { title: "Permit and inspection", body: "New circuits are permitted and inspected, and we coordinate timing with your appliance or HVAC installer." },
      ],
    },
    doneRight: {
      heading: "Done to the appliance's requirements",
      intro: "",
      points: [
        { title: "Matched to the manual", body: "Breaker size, wire size and receptacle type match what the manufacturer specifies." },
        { title: "Disconnects where required", body: "Outdoor units like heat pumps get a disconnect within sight, sealed and weather-rated." },
        { title: "Protection where required", body: "GFCI or arc-fault protection where the code calls for it." },
        { title: "Coordinated with other trades", body: "We work around your HVAC, plumbing or appliance installer's schedule." },
      ],
    },
    factors: {
      heading: "What shapes the job",
      items: [
        { title: "Size of the load", body: "A 240-volt heat pump circuit is a different job from a 120-volt freezer circuit." },
        { title: "Distance from the panel", body: "Longer runs and finished spaces take more work." },
        { title: "Panel capacity", body: "Some homes need a subpanel or service upgrade to add big loads." },
        { title: "Indoor or outdoor", body: "Outdoor equipment needs weather-rated materials." },
      ],
    },
    prepare: [
      "The appliance's make and model, or a photo of its specification label",
      "Where it's going and roughly how far that is from the panel",
      "A photo of your panel with the door open",
      "Your appliance or HVAC installer's schedule, if you have one",
    ],
    faqs: [
      {
        q: "Can I just plug a new appliance into an existing outlet?",
        a: "Only if the manufacturer allows it and the circuit can carry it. Many appliances specify a dedicated circuit, and large ones need 240 volts. We'll check.",
      },
      {
        q: "My HVAC company is installing a heat pump. Do they do the electrical?",
        a: "Some do, many don't. We're happy to work alongside your HVAC installer and handle the circuit and disconnect.",
      },
      {
        q: "Does a new circuit need a permit?",
        a: `Yes, new circuits are permitted work. ${permitLine}`,
      },
    ],
    related: ["electrical-panel-upgrades", "subpanel-installation", "electrical-service-upgrade"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "remodel-and-addition-wiring",
    name: "Remodel and addition electrical",
    short: "Remodels & additions",
    tag: "Kitchens · Baths · Additions",
    confirmed: true,
    image: "remodel",
    meta: {
      title: "Remodel & Addition Electrical in Spokane, WA | Acorn Electric",
      description:
        "Kitchen and bath remodels, basements, additions and covered patios. Acorn Electric plans the lighting and circuits with you and wires it right for Spokane homes.",
    },
    h1: "Electrical for remodels and additions in Spokane",
    lede:
      "You can picture the finished kitchen, the new bathroom or the covered patio. We help you get the lighting, outlets and circuits right while the walls are open, so it works the way you imagined when it's done.",
    problem: "You're remodeling or adding on and need the electrical planned and done right.",
    story: [
      "The electrical in a remodel is mostly invisible when it's finished, which is exactly why it's easy to get wrong. An outlet in the wrong place, a dark corner of the counter, a fan on the same circuit as the microwave: these are the things people live with for years.",
      "We walk the space with you before anything is roughed in, talk through how you'll actually use it, and plan lighting, outlets and circuits around that. Then we wire it properly, get it inspected before the walls close, and come back to trim it out once the finishes are in.",
    ],
    signs: {
      heading: "Projects we wire",
      items: [
        "Kitchen remodels: lighting, island outlets, appliance circuits, under-cabinet lights.",
        "Bathroom remodels: fans, heated floors, lighting and GFCI protection.",
        "Basement finishes and bonus rooms.",
        "Room additions and covered patios or decks.",
        "Garage and shop conversions.",
      ],
    },
    work: {
      heading: "How a remodel job runs",
      intro: "Remodels work best when the electrician is involved before the framing is finished.",
      steps: [
        { title: "Walk it and plan it", body: "We go through the space with you (and your contractor, if you have one) and mark out lighting, outlets and switches." },
        { title: "Check capacity", body: "New kitchens and additions add load. We confirm the panel and service can carry it, and say so early if they can't." },
        { title: "Permit and rough-in", body: "We pull the permit, rough in the wiring and get the rough-in inspection before insulation and drywall." },
        { title: "Trim-out and final", body: "Once finishes are in, we install fixtures and devices, test everything and get the final inspection." },
      ],
    },
    doneRight: {
      heading: "What we pay attention to",
      intro: "",
      points: [
        { title: "Lighting that works", body: "Layered lighting for tasks and mood, on switches and dimmers that make sense where you walk in." },
        { title: "Outlets where you need them", body: "Spaced for how you'll use the room, and to code for kitchens and baths." },
        { title: "Your home treated like a home", body: "Dust controlled, floors protected, and we clean up every day." },
        { title: "Good partners", body: "We work cleanly alongside your contractor, plumber and HVAC installer." },
      ],
    },
    factors: {
      heading: "What shapes a remodel job",
      items: [
        { title: "Size and scope", body: "A bathroom refresh is a different job from a full kitchen or addition." },
        { title: "Open or finished walls", body: "Working in open framing is faster than fishing through finished walls." },
        { title: "Panel capacity", body: "New loads may mean panel work too." },
        { title: "Lighting choices", body: "Fixture count and controls drive a lot of the work." },
      ],
    },
    prepare: [
      "Plans, sketches or photos of the space as it is now",
      "Your contractor's contact and schedule, if you have one",
      "Appliance and fixture choices, even if they're not final",
      "A photo of your panel with the door open",
    ],
    faqs: [
      {
        q: "Do you work with general contractors?",
        a: "Yes. We're happy to work as part of your contractor's team, or directly with you if you're managing the project yourself.",
      },
      {
        q: "When should I call an electrician in a remodel?",
        a: "Before framing is finished, ideally during planning. It's far easier to put things in the right place before the walls close.",
      },
      {
        q: "Does a remodel need an electrical permit?",
        a: `Almost always. Rough-in is inspected before the walls close, then a final once fixtures are in. ${permitLine}`,
      },
    ],
    related: ["recessed-lighting", "new-home-electrical", "dedicated-appliance-circuits"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "new-home-electrical",
    name: "New custom home electrical",
    short: "New home wiring",
    tag: "Custom homes · Shops · ADUs",
    confirmed: true,
    image: "new-construction",
    meta: {
      title: "New Custom Home Electrical in Spokane, WA | Acorn Electric",
      description:
        "Electrical for new custom homes, shops and ADUs in the Spokane area. Acorn Electric plans the layout with you and wires it from temporary power to final inspection.",
    },
    h1: "Electrical for new custom homes in the Spokane area",
    lede:
      "You're building the house you'll live in for years. The electrical should fit how you actually live: where you charge the car, where the lights switch on, where you'll want power in ten years. We plan it with you and wire it right.",
    problem: "You're building a custom home and want the electrical planned around you.",
    story: [
      "On a new build, the electrical plan often gets decided fast, by default, from a standard layout. That's how you end up with no outlet where the desk goes, a garage that can't take an EV charger, or lights that switch from the wrong end of the hall.",
      "We work with you and your builder from the plan stage: temporary power, the service, lighting and outlet layout, and the circuits you'll need later, like an EV charger, hot tub or shop. Then we wire it cleanly, keep the inspections on schedule, and hand you a home that works the way you expected.",
    ],
    signs: {
      heading: "We wire…",
      items: [
        "New custom homes, working with you and your builder.",
        "Detached shops and garages.",
        "ADUs and guest houses.",
        "Homes built EV-ready, hot-tub-ready and future-ready.",
        "Temporary power for the build.",
      ],
    },
    work: {
      heading: "How a new build runs",
      intro: "",
      steps: [
        { title: "Plan review and walkthrough", body: "We go through the plans with you and your builder, then walk the framing to confirm locations before we wire." },
        { title: "Temporary power and service", body: "Temporary power for construction, then the permanent service coordinated with your utility." },
        { title: "Rough-in and inspection", body: "Wiring, boxes and circuits roughed in and inspected before insulation." },
        { title: "Trim-out, final and walkthrough", body: "Fixtures and devices installed, everything tested, final inspection passed, and a walkthrough of your panel with you." },
      ],
    },
    doneRight: {
      heading: "What we build in",
      intro: "",
      points: [
        { title: "Room to grow", body: "Panel space and conduit where it makes sense, so future additions don't mean opening walls." },
        { title: "A clear panel directory", body: "Every circuit labelled for what it actually feeds." },
        { title: "No corners cut", body: "Full permits, full inspections, and work done to code even where nobody will see it." },
        { title: "On the builder's schedule", body: "We keep the inspections moving so we're never the reason the drywall waits." },
      ],
    },
    factors: {
      heading: "What shapes a new build",
      items: [
        { title: "Size and layout", body: "Square footage and room count drive the circuit count." },
        { title: "Lighting design", body: "Recessed, accent and exterior lighting add up." },
        { title: "Service size and utility", body: "Overhead or underground, and which utility serves the lot." },
        { title: "Extras", body: "EV charging, hot tubs, shops and smart lighting controls." },
      ],
    },
    prepare: [
      "Your plans (PDF is fine) and the lot address",
      "Your builder's contact and target schedule",
      "Anything you know you'll want: EV, hot tub, shop, outdoor lighting",
      "Who the utility is for the lot, if you know",
    ],
    faqs: [
      {
        q: "Can we bring you in if our builder already has an electrician?",
        a: "That's between you and your builder. We're glad to bid the electrical on a custom home when the builder or owner invites us.",
      },
      {
        q: "Do you do large subdivisions or commercial construction?",
        a: "No. We focus on custom homes, shops and ADUs, not large-scale construction.",
      },
      {
        q: "Who handles the permit?",
        a: `We pull the electrical permit for our work and schedule its inspections. ${permitLine}`,
      },
    ],
    related: ["remodel-and-addition-wiring", "ev-charger-installation", "electrical-service-upgrade"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "real-estate-electrical-repairs",
    name: "Electrical repairs for home sales",
    short: "Repairs to sell a home",
    tag: "Inspection items · Closing",
    confirmed: true,
    image: "real-estate",
    meta: {
      title: "Electrical Repairs for Selling a Home in Spokane | Acorn Electric",
      description:
        "Buyer's inspection flagged electrical items? Acorn Electric fixes double taps, missing GFCIs, open grounds and panel issues for Spokane sellers and agents.",
    },
    h1: "Electrical repairs for selling a home in Spokane",
    lede:
      "The buyer's inspection came back and there's an electrical list. You've got a closing date and no time for a runaround. Send us the report: we'll tell you what each item really means and get the repairs done properly.",
    problem: "A home inspection flagged electrical items and you need them fixed before closing.",
    story: [
      "Home inspection reports are written to be cautious, so electrical items often read scarier than they are: double-tapped breakers, missing GFCI protection, open grounds, reversed polarity, missing cover plates, an older panel. Some are quick fixes. A few genuinely matter.",
      "We go through the report with you or your agent, separate the real issues from the minor ones, and fix them properly, with a permit when the work needs one. You get clear answers you can pass to the buyer, and a closing that stays on track.",
    ],
    signs: {
      heading: "Common items on inspection reports",
      items: [
        "Double-tapped breakers or a cluttered, unlabelled panel.",
        "Missing GFCI protection in kitchens, baths, garages or outside.",
        "Open grounds or reversed polarity at outlets.",
        "Missing cover plates, open junction boxes or loose fixtures.",
        "An older panel brand, knob and tube, or aluminum wiring noted for further evaluation.",
      ],
    },
    work: {
      heading: "How we handle it",
      intro: "",
      steps: [
        { title: "Send us the report", body: "The inspection report (or just the electrical pages) tells us most of what we need to plan the visit." },
        { title: "Sort the list", body: "We tell you which items are safety issues, which are simple fixes, and which are notes that don't need work." },
        { title: "Repair properly", body: "Fixes done to the code as adopted in Washington, permitted where the work requires it." },
        { title: "Clear paperwork", body: "You get an invoice describing what we did, item by item, to pass along to the buyer's side." },
      ],
    },
    doneRight: {
      heading: "What sellers and agents can count on",
      intro: "",
      points: [
        { title: "Straight answers", body: "If an item doesn't need work, we'll say so and explain why." },
        { title: "Fixes, not patches", body: "Repairs that will pass a re-inspection, not a quick cover-up." },
        { title: "Respect for the deadline", body: "Tell us your closing date up front and we'll tell you honestly what we can do." },
        { title: "Easy for agents", body: "We're happy to coordinate access and communicate with your agent directly." },
      ],
    },
    factors: {
      heading: "What shapes the job",
      items: [
        { title: "Number of items", body: "A handful of GFCIs is quick; a panel replacement is a project." },
        { title: "Permit needs", body: "Some repairs need a permit and inspection, which affects timing." },
        { title: "Access", body: "Vacant homes and occupied homes are scheduled differently." },
        { title: "Further-evaluation items", body: "Things like an older panel may need a closer look first." },
      ],
    },
    prepare: [
      "The inspection report, or the electrical section of it",
      "Your closing date",
      "Your agent's contact and how we get access to the home",
    ],
    faqs: [
      {
        q: "Will the buyer accept your repairs?",
        a: "We can't speak for the buyer, but repairs done properly by a licensed electrician, with permits where required and an itemised invoice, are what buyers and their inspectors are typically looking for.",
      },
      {
        q: "Do you work with real estate agents?",
        a: "Yes. Agents can send us the report and coordinate access directly.",
      },
      {
        q: "Are you also inspecting for the buyer?",
        a: "If you're buying, see our home electrical inspections. On a sale, we work for whoever hires us, and we'll be clear about which side that is.",
      },
    ],
    related: ["electrical-inspections", "electrical-panel-upgrades", "grounding-and-bonding-upgrades"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "commercial-electrical",
    name: "Small commercial electrical",
    short: "Commercial",
    tag: "Small business · Service",
    confirmed: true,
    image: "commercial",
    meta: {
      title: "Small Commercial Electrician in Spokane, WA | Acorn Electric",
      description:
        "Electrical service for small businesses in the Spokane area: lighting, new circuits, panels and troubleshooting. Acorn Electric keeps your doors open.",
    },
    h1: "Electrical services for small businesses in Spokane",
    lede:
      "When something electrical goes wrong at your business, it's not just an inconvenience, it's lost hours. We help small businesses with lighting, new circuits, panels and repairs, and we show up when we say we will.",
    problem: "Your small business needs a reliable electrician for lighting, circuits or repairs.",
    story: [
      "Small businesses often fall between the cracks: too small for the big commercial contractors, too important to wait a week for a callback. You need someone who answers, explains what's going on, and does the job properly the first time.",
      "We bring the same approach we use in people's homes: listen first, explain the options, do it right, clean up. We focus on small commercial service work, not industrial or large-scale construction.",
    ],
    signs: {
      heading: "What we help small businesses with",
      items: [
        "Lighting upgrades and repairs, including LED retrofits.",
        "New circuits for equipment, signage or a new layout.",
        "Panel work and troubleshooting.",
        "Outlets, switches and repairs that keep the space working.",
        "EV chargers for staff or customers.",
      ],
    },
    work: {
      heading: "How we work with businesses",
      intro: "",
      steps: [
        { title: "Tell us what's going on", body: "What's not working, or what you want to add, and when it's least disruptive for us to be there." },
        { title: "A clear plan", body: "What the work involves, what permits it needs, and how we'll keep your doors open." },
        { title: "Do it right", body: "Work done to the code as adopted in Washington and inspected where required." },
        { title: "Leave it tidy", body: "Your space left ready for customers." },
      ],
    },
    doneRight: {
      heading: "What business owners can expect",
      intro: "",
      points: [
        { title: "Respect for your hours", body: "We schedule around your business where we can." },
        { title: "Straight answers", body: "Options explained plainly, without jargon." },
        { title: "Permits handled", body: "Permitted work is inspected and documented." },
        { title: "Honest about scope", body: "If a job is outside what we do, we'll tell you up front." },
      ],
    },
    factors: {
      heading: "What shapes the job",
      items: [
        { title: "Building type", body: "Older buildings and newer suites have different wiring methods." },
        { title: "Access and hours", body: "After-hours work and access affect scheduling." },
        { title: "Landlord requirements", body: "Leased spaces may need landlord approval." },
        { title: "Permit needs", body: "Commercial permits have their own review steps." },
      ],
    },
    prepare: [
      "The business address and type of space",
      "What you need done and any deadline",
      "Photos of the panel and the area involved",
      "Who to coordinate with for access",
    ],
    faqs: [
      {
        q: "What commercial work don't you do?",
        a: "We don't do industrial work, large-scale construction, commercial fire alarm systems, or sound and audio systems. If that's what you need, we'll tell you so up front.",
      },
      {
        q: "Do you do solar installations?",
        a: "No, we don't install solar.",
      },
      {
        q: "Do commercial jobs need permits?",
        a: `Most do. ${permitLine}`,
      },
    ],
    related: ["electrical-repair", "dedicated-appliance-circuits", "ev-charger-installation"],
  },
];
