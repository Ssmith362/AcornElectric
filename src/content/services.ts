import { publishedServiceIndex, serviceGroupDefs, serviceIndex } from "./service-index";
import type { Service } from "./types";

/** Long service copy is consumed by server pages only. Small related jobs live
 * in sections instead of overlapping pages. See the dated consolidation plan.
 * Names, order and groups live once in service-index.ts.
 */
const details: Record<string, Omit<Service, "slug" | "name" | "short" | "confirmed">> = {
  "electrical-repair": {
    "image": "repair",
    "meta": {
      "title": "Electrical Repair & Troubleshooting in Spokane | Acorn Electric",
      "description": "Dead outlets, GFCI problems, flickering lights or tripping breakers in Spokane homes and businesses? Acorn Electric finds the cause and explains the repair."
    },
    "h1": "Electrical repair and troubleshooting in Spokane",
    "lede": "An outlet went dead, a breaker keeps tripping or the lights flicker when the furnace kicks on. We find the actual cause before replacing anything.",
    "problem": "Something electrical stopped working, or is acting strange.",
    "story": [
      "Most electrical problems in a house are symptoms. A dead outlet might be a tripped GFCI two rooms away, a loose connection in a box, or a failed device. A breaker that trips might be overloaded, or warning you about a real fault.",
      "We trace the problem to its cause, fix it properly, and tell you whether it points to anything else you should know about."
    ],
    "signs": {
      "heading": "Common reasons people call us",
      "items": [
        "Outlets or a whole room have gone dead.",
        "A breaker trips again and again.",
        "Lights flicker or dim when appliances start.",
        "A switch, outlet or cover plate feels warm or discolored.",
        "Something smells hot or like burning plastic near an outlet or panel."
      ]
    },
    "work": {
      "heading": "How we troubleshoot",
      "intro": "",
      "steps": [
        {
          "title": "Listen first",
          "body": "When it started, what was running, and what you've already tried tell us a lot."
        },
        {
          "title": "Test, don't guess",
          "body": "We trace the circuit and test to find the fault, not swap parts until it goes away."
        },
        {
          "title": "Fix the cause",
          "body": "Repair the connection, device or wiring that failed, to the code as adopted in Washington."
        },
        {
          "title": "Explain it",
          "body": "What failed, why, and whether it suggests anything else to keep an eye on."
        }
      ]
    },
    "doneRight": {
      "heading": "Repairs that stay fixed",
      "intro": "",
      "points": [
        {
          "title": "Root cause, not symptoms",
          "body": "Resetting a breaker isn't a fix. Finding why it tripped is."
        },
        {
          "title": "Proper materials",
          "body": "Devices and connectors suited to the wiring in your home, including older wiring types."
        },
        {
          "title": "Safety flagged",
          "body": "If we see something unsafe while we're there, we tell you."
        },
        {
          "title": "Permits when required",
          "body": "Some repairs need a permit and inspection. We'll tell you when yours does."
        }
      ]
    },
    "factors": {
      "heading": "What shapes a repair",
      "items": [
        {
          "title": "How easy the fault is to find",
          "body": "Intermittent problems can take longer to trace."
        },
        {
          "title": "Access",
          "body": "Finished walls and ceilings take care to work in."
        },
        {
          "title": "Age of the wiring",
          "body": "Older wiring may need more than a like-for-like repair."
        },
        {
          "title": "Parts",
          "body": "Most are on the van; some need ordering."
        }
      ]
    },
    "prepare": [
      "What's happening, and when it started",
      "Which rooms or devices are affected",
      "Whether any breaker or GFCI outlet is tripped",
      "Photos of anything scorched, warm or damaged"
    ],
    "faqs": [
      {
        "q": "What should I do if I smell burning near an outlet or the panel?",
        "a": "If there is smoke, fire or active sparking, get everyone out and call 911. If it's safe to do so, switch off the affected breaker. Don't keep using the circuit until it has been checked."
      },
      {
        "q": "Why does my breaker keep tripping?",
        "a": "Usually an overloaded circuit, a fault in a device or appliance, or a wiring problem. Repeated tripping is the breaker doing its job, so it's worth finding out which."
      },
      {
        "q": "Do you work on older homes with knob-and-tube or aluminum wiring?",
        "a": "Yes. Older wiring needs particular care and the right materials. We'll tell you what we find and what your options are, including a full knob and tube rewire if it's time."
      },
      {
        "q": "Can you work from a home inspection report?",
        "a": "Yes. Send the electrical items, photos and any closing deadline. We explain which repairs are needed, arrange any required permits and help you understand what was corrected."
      }
    ],
    "related": [
      "electrical-inspections",
      "knob-and-tube-rewiring"
    ],
    "sections": [
      {
        "id": "outlets-and-gfci",
        "title": "Outlet installation, GFCI protection and breaker repairs",
        "body": "A dead outlet, a GFCI that keeps tripping and a circuit that can't carry its load are different problems. We test the cause before recommending a repair or replacement.",
        "items": [
          "New and replacement outlets where the circuit can support them.",
          "GFCI protection for locations that require it, with the cause of repeated trips checked.",
          "Loose switches, damaged receptacles and breaker problems assessed before parts are replaced."
        ]
      },
      {
        "id": "home-sale-repairs",
        "title": "Electrical repairs before a home sale",
        "body": "The buyer's inspection came back and there's an electrical list. You've got a closing date and no time for a runaround. Send us the report: we'll tell you what each item really means and get the repairs done properly.",
        "items": [
          "Double-tapped breakers or a cluttered, unlabeled panel.",
          "Missing GFCI protection in kitchens, baths, garages or outside.",
          "Open grounds or reversed polarity at outlets.",
          "Missing cover plates, open junction boxes or loose fixtures.",
          "An older panel brand, knob and tube, or aluminum wiring noted for further evaluation."
        ]
      }
    ]
  },
  "electrical-panel-upgrades": {
    "image": "panel",
    "meta": {
      "title": "Panel & Service Upgrades in Spokane | Acorn Electric",
      "description": "Electrical panel replacement and 200 amp service upgrades in Spokane. Acorn Electric checks capacity, explains options and coordinates permits and utility work."
    },
    "h1": "Electrical panel and service upgrades in Spokane",
    "lede": "Out of breaker space, dealing with an outdated panel, or adding equipment that needs more power? We check whether you need a panel replacement, a service upgrade, or a smaller change.",
    "problem": "Your electrical panel is full, old, or can't take what you want to add.",
    "story": [
      "Panels rarely fail all at once. More often you notice it a piece at a time: no space for a new breaker, an older fuse box an insurer has flagged, or an electrician telling you the EV charger you want won't fit.",
      "A panel upgrade can mean replacing the panel itself, increasing the size of your electrical service (commonly 100 to 200 amps), or both. Which one you need depends on what you're adding and what's there now. That's the first conversation we have."
    ],
    "signs": {
      "heading": "Signs your panel is due for attention",
      "items": [
        "There's no room for new breakers, or you see breakers doubled up on one slot.",
        "You still have a fuse box, or a panel brand an inspector or insurer has flagged.",
        "Breakers trip often, feel warm, or the panel buzzes.",
        "You're adding an EV charger, hot tub, heat pump, shop or ADU.",
        "You're buying or selling an older home and the inspection raised the panel."
      ]
    },
    "work": {
      "heading": "How a panel or service upgrade works",
      "intro": "Panel work touches the point where power enters your home, so it's planned carefully and coordinated with your utility when the service is involved.",
      "steps": [
        {
          "title": "Assess what you have and what you'll add",
          "body": "We look at the existing panel, service size, grounding and the loads you're planning, then recommend the smallest upgrade that actually solves the problem."
        },
        {
          "title": "Permit and utility coordination",
          "body": "Panel and service work needs an electrical permit. When the service is being changed, the power is disconnected and reconnected by your utility, and we schedule that with them."
        },
        {
          "title": "Replace and reconnect",
          "body": "The new panel goes in, existing circuits are reconnected and labeled clearly, and grounding and bonding are brought up to what the job requires."
        },
        {
          "title": "Inspection and power-up",
          "body": "The work is inspected, power is restored, and we check that everything in the house came back on as it should."
        }
      ]
    },
    "doneRight": {
      "heading": "What a careful panel job looks like",
      "intro": "Most of a panel upgrade is out of sight once the cover is on. These are the parts we don't skip.",
      "points": [
        {
          "title": "Grounding and bonding",
          "body": "The new panel is only as safe as its connection to ground. We verify the grounding electrode system and bonding as part of the job."
        },
        {
          "title": "A directory you can read",
          "body": "Every breaker labeled with what it actually feeds, so the next time something trips, you know which one."
        },
        {
          "title": "Room to grow",
          "body": "We size and lay out the panel so the next addition doesn't mean another upgrade."
        },
        {
          "title": "Weather-tight outside",
          "body": "Where the job includes the meter base or service entrance, exterior penetrations are sealed against Spokane's freeze-thaw winters."
        }
      ]
    },
    "factors": {
      "heading": "What shapes the scope of a panel upgrade",
      "items": [
        {
          "title": "Panel only or full service",
          "body": "Swapping a panel at the same amperage is simpler than increasing the size of your service."
        },
        {
          "title": "Condition of the mast and meter base",
          "body": "If those need replacing too, the job grows. We'll tell you up front."
        },
        {
          "title": "Utility scheduling",
          "body": "Service changes depend on your utility's disconnect and reconnect."
        },
        {
          "title": "Existing wiring",
          "body": "Old circuits sometimes need correcting before they can land in a new panel."
        }
      ]
    },
    "prepare": [
      "Photos of your panel with the door open and with the main breaker label visible",
      "A photo of your meter and where the service enters the house",
      "What you're planning to add (EV charger, hot tub, heat pump, shop, remodel)",
      "The approximate age of the home"
    ],
    "faqs": [
      {
        "q": "How do I know whether I need a new panel or a service upgrade?",
        "a": "A panel replacement swaps the box and breakers. A service upgrade increases how much power your home can draw from the utility. If you're out of space but not capacity, you may only need the first. A load calculation tells us which."
      },
      {
        "q": "Do panel upgrades in Spokane need a permit?",
        "a": "Yes. Panel and service work needs an electrical permit and inspection: through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit."
      },
      {
        "q": "Will my power be off during the upgrade?",
        "a": "For part of the day, yes. When the service is changed your utility disconnects and reconnects power. We'll tell you the plan ahead of time so you can prepare."
      },
      {
        "q": "My insurer flagged my panel brand. Is it really a problem?",
        "a": "Some older panel lines, such as Federal Pacific Stab-Lok and Zinsco, have well-documented reliability concerns, and many insurers and home inspectors flag them. We'll look at yours and tell you honestly what we see."
      }
    ],
    "related": [
      "electrical-inspections",
      "ev-charger-installation"
    ],
    "sections": [
      {
        "id": "service-upgrades",
        "title": "200 amp service upgrades and more power",
        "body": "A panel replacement changes the box on the wall. A service upgrade changes how much power the whole house can pull from the utility: the meter base, the service conductors, the main breaker and often the mast. Plenty of Spokane homes still run on 100-amp service or less, which was generous when they were wired and is tight today.",
        "items": [
          "A load calculation first: We add up what the house uses now and what you're planning, and confirm a service upgrade is actually the right answer. Sometimes load management or a smaller change will do.",
          "Permit and utility coordination: We pull the electrical permit and work with Avista or Inland Power & Light, whichever serves your address, on the disconnect, any new meter and the reconnect.",
          "New service equipment: Meter base, service conductors, main breaker or panel, and the mast or underground connection as the job requires, installed to the code as adopted in Washington.",
          "Grounding, bonding and surge protection: The grounding electrode system is brought up to what the new service needs, and current code calls for a surge-protective device whenever a home's service is replaced or upgraded.",
          "Inspection and reconnection: The work is inspected, the utility restores power, and we check that every circuit in the house came back as it should."
        ]
      }
    ]
  },
  "ev-charger-installation": {
    "image": "ev",
    "meta": {
      "title": "EV Charger Installation in Spokane, WA | Acorn Electric",
      "description": "Level 2 EV charger installation for Spokane homes: Tesla Wall Connector, NEMA 14-50 and more. Load check, permit, install and inspection."
    },
    "h1": "Home EV charger installation in Spokane",
    "lede": "You bought an electric car so you could stop thinking about fuel. Now you're planning your week around a public charger. We'll get a Level 2 charger on your wall so the car is full every morning.",
    "problem": "You want to charge your EV where you park it, not in a grocery store parking lot.",
    "story": [
      "A lot of new EV owners in Spokane start out on a standard 120-volt outlet, which adds only a few miles of range per hour, or they sit at a public fast charger a couple of times a week. Neither is what you had in mind.",
      "A Level 2 charger runs on a dedicated 240-volt circuit and can typically refill an overnight commute's worth of range while you sleep. The questions most people get stuck on are whether the panel can handle it, which charger to buy, and where it should go. Those are exactly the things we sort out before any wire gets pulled."
    ],
    "signs": {
      "heading": "You're probably ready for a Level 2 charger if…",
      "items": [
        "You're charging on a regular 120-volt outlet and it can't keep up with your driving.",
        "You're relying on public chargers and it's eating into your evenings.",
        "You have a second EV coming, or two drivers sharing one charger.",
        "You're buying or building a home and want it EV-ready from the start.",
        "You already have a charger, but it trips a breaker or the outlet runs warm."
      ]
    },
    "work": {
      "heading": "What a proper EV charger install involves",
      "intro": "Every home is different, but a charger install done right follows the same order: figure out what the house can support first, then install for that.",
      "steps": [
        {
          "title": "A load check on your panel",
          "body": "EV charging is a continuous load, so the circuit is sized with headroom. We look at your service size, what's already on the panel and how your home uses power, and tell you plainly whether the charger fits as is."
        },
        {
          "title": "Choosing the charger and the circuit",
          "body": "Hardwired wall connector or a NEMA 14-50 receptacle for a plug-in unit? We'll talk through the trade-offs for your car and garage, including how fast you actually need to charge."
        },
        {
          "title": "Routing it cleanly",
          "body": "The run from the panel to the charger is planned so it is protected, supported and tidy, whether that's through a finished garage, along an exterior wall or out to a detached garage."
        },
        {
          "title": "Permit, install and inspection",
          "body": "A new 240-volt circuit needs an electrical permit. We handle it, install to the code as adopted in Washington, and the work is inspected before it's signed off."
        },
        {
          "title": "Setup and a walkthrough",
          "body": "We set the charger's current limit to match the circuit, confirm it charges, and show you the breaker and the settings that matter."
        }
      ]
    },
    "doneRight": {
      "heading": "The details that keep a charger safe for years",
      "intro": "A charger pulls a heavy load for hours at a time, night after night. That's why the shortcuts you sometimes see (an undersized wire, a cheap receptacle, a dryer-outlet splitter) cause problems.",
      "points": [
        {
          "title": "Sized for continuous load",
          "body": "The breaker, wire and charger setting have to agree with each other. We size them for the charger you're actually installing, not a guess."
        },
        {
          "title": "GFCI protection where it's required",
          "body": "Current code requires ground-fault protection on many garage and outdoor receptacles, including those used for EV charging. That affects whether a plug-in or hardwired charger makes more sense, and we'll explain why."
        },
        {
          "title": "Outdoor-rated where it lives outside",
          "body": "A charger on an exterior wall or driveway post needs a wet-location rating, sealed connections and protected wiring. Spokane winters find the weak points."
        },
        {
          "title": "Options before a service upgrade",
          "body": "If your panel is tight, a full service upgrade isn't the only answer. Load-management devices and chargers with power-sharing can sometimes avoid it. We'll tell you honestly which applies."
        }
      ]
    },
    "factors": {
      "heading": "What shapes the scope of your install",
      "items": [
        {
          "title": "Panel capacity",
          "body": "The single biggest factor. Room for a 2-pole breaker and enough service capacity keep it simple."
        },
        {
          "title": "Distance from the panel",
          "body": "A charger right next to the panel is a different job than one at the far end of a detached garage."
        },
        {
          "title": "Charger type",
          "body": "Hardwired units and plug-in units have different circuit and protection requirements."
        },
        {
          "title": "Inside or outside",
          "body": "Exterior installs need weather-rated equipment and protected routing."
        }
      ]
    },
    "prepare": [
      "Your car's make and model, and the charger if you've already bought one",
      "A photo of your electrical panel with the door open, plus the label on the main breaker",
      "Where you'd like the charger, and roughly how far that is from the panel",
      "Whether your garage is attached, detached or finished"
    ],
    "faqs": [
      {
        "q": "Do I need a permit to install an EV charger in Spokane?",
        "a": "Yes. A new 240-volt circuit for a Level 2 charger needs an electrical permit and inspection: through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit."
      },
      {
        "q": "Hardwired charger or a NEMA 14-50 outlet?",
        "a": "Both work. Hardwired chargers such as the Tesla Wall Connector can often charge faster on the same panel, and they avoid some of the GFCI and receptacle-wear issues a plug-in setup can run into. A 14-50 outlet is flexible if you might change chargers. We'll recommend one based on your car and your panel."
      },
      {
        "q": "Will I need a panel upgrade for an EV charger?",
        "a": "Not always. Many homes have the capacity already. If yours is tight, a load-management device or a charger set to a lower current can sometimes avoid an upgrade. If an upgrade is genuinely needed, we'll show you why."
      },
      {
        "q": "Can you install a charger I bought online?",
        "a": "Usually, yes, as long as it's a listed product from a reputable manufacturer. Send us the model when you reach out so we can check it before the visit."
      },
      {
        "q": "How long does an install take?",
        "a": "A straightforward install near the panel is often done in a day. Longer runs, detached garages or panel work add time. You'll know what to expect before we start."
      }
    ],
    "related": [
      "electrical-panel-upgrades",
      "subpanel-installation",
      "lighting-installation"
    ]
  },
  "generator-installation": {
    "image": "generator",
    "meta": {
      "title": "Generator Installation & Backup Power in Spokane | Acorn Electric",
      "description": "Generator installation and backup power in Spokane. Acorn Electric hooks it up safely so your fridge, lights and heat stay on when the power is out."
    },
    "h1": "Generator installation and backup power in Spokane",
    "lede": "When the power is out, a generator keeps your fridge, lights and heat running. We hook it up safely, whether you already own a generator or are just looking at backup power.",
    "problem": "You want the lights, fridge and heat to stay on when the power is out.",
    "story": [
      "A generator only helps if it's hooked up safely. The connection has to keep generator power from feeding back into the utility lines, and the setup has to match what you want to run.",
      "Tell us what you have, or that you're still deciding. We'll go over the options and what the project involves, including any fuel or site work someone else would handle."
    ],
    "signs": {
      "heading": "What do you want to keep running?",
      "items": [
        "The fridge, freezer and lights.",
        "Heat, a well pump or a sump pump.",
        "A generator you already own that needs a safe way to connect.",
        "Backup power for a home or business."
      ]
    },
    "work": {
      "heading": "Planning a generator installation",
      "intro": "",
      "steps": [
        {
          "title": "List the essential loads",
          "body": "We review what you want powered and the starting requirements of equipment such as pumps."
        },
        {
          "title": "Review the connection",
          "body": "We assess the panel and a suitable transfer switch or listed interlock where appropriate."
        },
        {
          "title": "Plan the whole project",
          "body": "We explain the electrical work, the permit and anything others need to handle, like fuel lines or a pad."
        },
        {
          "title": "Install and check",
          "body": "We do the electrical work, then check the transfer switch and the circuits you chose."
        }
      ]
    },
    "doneRight": {
      "heading": "Backup power without unsafe backfeeding",
      "intro": "",
      "points": [
        {
          "title": "Utility isolation",
          "body": "A correctly designed transfer arrangement prevents generator power from feeding back into the utility system."
        },
        {
          "title": "Equipment matched to the load",
          "body": "Inlets, conductors, breakers and transfer equipment must match the planned system."
        },
        {
          "title": "Outdoor generator operation",
          "body": "Portable generators must be operated outside and away from openings, following the manufacturer's instructions."
        },
        {
          "title": "Permits and coordination",
          "body": "We identify the electrical permit and inspection requirements and any work by other trades."
        }
      ]
    },
    "factors": {
      "heading": "What shapes your backup-power project",
      "items": [
        {
          "title": "Portable or standby",
          "body": "The connection method and site requirements differ."
        },
        {
          "title": "Essential circuits or wider coverage",
          "body": "The loads you choose affect sizing and the transfer arrangement."
        },
        {
          "title": "Existing equipment",
          "body": "Panel condition, equipment location and cable routes affect the electrical work."
        }
      ]
    },
    "prepare": [
      "Generator model and output details, if already selected",
      "A list of equipment you want to keep running",
      "Photos of the electrical panel and proposed generator location"
    ],
    "faqs": [
      {
        "q": "Can you connect a portable generator to selected circuits?",
        "a": "Ask us about a generator inlet and a suitable transfer switch or listed interlock. We review your generator, panel and essential loads before recommending the connection."
      },
      {
        "q": "Can I power the whole property?",
        "a": "That depends on the loads, generator and transfer equipment. We work through the requirements before recommending a system."
      },
      {
        "q": "Does a standby generator project include fuel and site work?",
        "a": "The project can involve more than electrical work. We identify who handles fuel connections, equipment supply, placement and any pad or site work, and settle who does what before work starts."
      }
    ],
    "related": [
      "electrical-panel-upgrades",
      "subpanel-installation",
      "electrical-repair"
    ]
  },
  "ceiling-fan-installation": {
    "image": "ceilingfan",
    "meta": {
      "title": "Ceiling & Attic Fan Installation in Spokane | Acorn Electric",
      "description": "Ceiling and attic fan installation in Spokane. Ceiling fan replacement, attic fan wiring and controls, with support, wiring and ventilation needs explained first."
    },
    "h1": "Ceiling and attic fan installation in Spokane",
    "lede": "From a replacement ceiling fan to electrical work for attic ventilation, we check the wiring and controls and explain what your project needs.",
    "problem": "You need a ceiling or attic fan installed or replaced.",
    "story": [
      "A ceiling fan needs more than an available wire. Its mounting box must be rated to carry a fan, and the ceiling height, room size and controls all affect the installation.",
      "We can assess an existing location or plan wiring for a new one. For a porch or covered patio, the fan and electrical equipment need to be rated for the conditions."
    ],
    "signs": {
      "heading": "When to call about a ceiling fan",
      "items": [
        "An existing fan wobbles, hums or no longer works.",
        "You want to replace a ceiling light with a fan.",
        "A room needs a fan but has no existing wiring at that location.",
        "You want separate light and fan controls or a suitable remote."
      ]
    },
    "work": {
      "heading": "How we install your ceiling fan",
      "intro": "",
      "steps": [
        {
          "title": "Check the location",
          "body": "We review ceiling access, support and the existing circuit."
        },
        {
          "title": "Confirm the fan and controls",
          "body": "We check the mounting requirements, equipment rating and compatible switches or remote."
        },
        {
          "title": "Mount and connect",
          "body": "We install fan-rated support and the wiring."
        },
        {
          "title": "Test the operation",
          "body": "We check fan speeds, light operation and controls, then leave the area tidy."
        }
      ]
    },
    "doneRight": {
      "heading": "Support and wiring matter",
      "intro": "",
      "points": [
        {
          "title": "Fan-rated support",
          "body": "A light-only box isn't automatically suitable for a ceiling fan."
        },
        {
          "title": "Controls that match",
          "body": "The fan motor and lights need compatible controls, not a standard dimmer used by guesswork."
        },
        {
          "title": "Outdoor conditions",
          "body": "Covered patios still need appropriately rated equipment."
        },
        {
          "title": "No surprises",
          "body": "New wiring, a high ceiling or difficult access is discussed before work starts."
        }
      ]
    },
    "factors": {
      "heading": "What affects a fan installation",
      "items": [
        {
          "title": "Existing support",
          "body": "Whether suitable fan-rated support is already present."
        },
        {
          "title": "Access and ceiling height",
          "body": "The ceiling construction and access to the wiring."
        },
        {
          "title": "New or replacement",
          "body": "A new location may need wiring and switching beyond a straightforward replacement."
        }
      ]
    },
    "prepare": [
      "A photo of the ceiling location and current fan or fixture",
      "Ceiling height and whether there is attic access above",
      "The fan model, if you have already selected it"
    ],
    "faqs": [
      {
        "q": "Can you replace a light with a ceiling fan?",
        "a": "Often, but we first check the mounting support, wiring and controls. A box rated only for a light may need to be replaced."
      },
      {
        "q": "Do you install fans on covered patios?",
        "a": "We can review a covered patio installation. Send photos and the fan model so we can check the location and required equipment rating."
      },
      {
        "q": "Can you install a fan I already bought?",
        "a": "Send the model and installation location. We check its suitability and explain any additional support, wiring or controls the job needs."
      },
      {
        "q": "Do you install or replace attic fans in Spokane?",
        "a": "Yes. Tell us whether you are replacing an existing fan or planning a new installation. We review the wiring, controls and access, then tell you what the electrical work involves and who handles any roof or ventilation work."
      },
      {
        "q": "Is an attic fan the same as a ceiling fan?",
        "a": "No. A ceiling fan circulates air in an occupied room. An attic ventilation fan moves air in the attic. They need different equipment and installation planning, which we explain before recommending the work."
      }
    ],
    "related": [
      "lighting-installation",
      "electrical-repair",
      "bathroom-fan-replacement"
    ],
    "sections": [
      {
        "id": "attic-fans",
        "title": "Attic fan installation and replacement in Spokane",
        "body": "For an attic fan installation or replacement, we check the electrical connection, controls and equipment. Roof or gable work and intake ventilation need to be settled before installation.",
        "items": [
          "Electrical supply and wiring for a proposed attic fan, after the ventilation plan has been assessed.",
          "Replacement of existing attic fan equipment, with access and mounting requirements checked first.",
          "Thermostat or humidistat controls matched to the selected equipment.",
          "Clear responsibility for intake ventilation, roof penetrations, flashing and other work beyond the electrical connection."
        ]
      }
    ]
  },
  "commercial-electrical": {
    "image": "commercial",
    "meta": {
      "title": "Commercial Electrician in Spokane, WA | Acorn Electric",
      "description": "Commercial electrical service in Spokane: lighting, new circuits, panels and repairs for shops, offices and other business spaces. Call Acorn Electric."
    },
    "h1": "Commercial electrician in Spokane",
    "lede": "When something electrical goes wrong at your business, it's lost hours. We handle lighting, new circuits, panels and repairs for shops, offices and other commercial spaces, and we show up when we say we will.",
    "problem": "Your business needs a reliable electrician for lighting, circuits or repairs.",
    "story": [
      "When the lights flicker or a circuit trips at work, you can't wait a week for a callback. You need someone who answers, explains what's going on, and does the job properly the first time.",
      "We bring the same approach we use in people's homes: listen first, explain the options, do it right, clean up. We focus on commercial service and installation work."
    ],
    "signs": {
      "heading": "What we help businesses with",
      "items": [
        "Lighting upgrades and repairs, including LED retrofits.",
        "New circuits for equipment, signage or a new layout.",
        "Panel work and troubleshooting.",
        "Outlets, switches and repairs that keep the space working.",
        "EV chargers for staff or customers."
      ]
    },
    "work": {
      "heading": "How we work with businesses",
      "intro": "",
      "steps": [
        {
          "title": "Tell us what's going on",
          "body": "What's not working, or what you want to add, and when it's least disruptive for us to be there."
        },
        {
          "title": "A clear plan",
          "body": "What the work involves, what permits it needs, and how we'll keep your doors open."
        },
        {
          "title": "Do it right",
          "body": "Work done to the code as adopted in Washington and inspected where required."
        },
        {
          "title": "Leave it tidy",
          "body": "Your space left ready for customers."
        }
      ]
    },
    "doneRight": {
      "heading": "What business owners can expect",
      "intro": "",
      "points": [
        {
          "title": "Respect for your hours",
          "body": "We schedule around your business where we can."
        },
        {
          "title": "Straight answers",
          "body": "Options explained plainly, without jargon."
        },
        {
          "title": "Permits handled",
          "body": "Permitted work is inspected and documented."
        },
        {
          "title": "We say if it's not a fit",
          "body": "If a job is outside what we do, we'll tell you up front."
        }
      ]
    },
    "factors": {
      "heading": "What affects a commercial job",
      "items": [
        {
          "title": "Building type",
          "body": "Older buildings and newer suites have different wiring methods."
        },
        {
          "title": "Access and hours",
          "body": "After-hours work and access affect scheduling."
        },
        {
          "title": "Landlord requirements",
          "body": "Leased spaces may need landlord approval."
        },
        {
          "title": "Permit needs",
          "body": "Commercial permits have their own review steps."
        }
      ]
    },
    "prepare": [
      "The business address and type of space",
      "What you need done and any deadline",
      "Photos of the panel and the area involved",
      "Who to coordinate with for access"
    ],
    "faqs": [
      {
        "q": "Do commercial jobs need permits?",
        "a": "Most do. Permits go through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull them and schedule the inspections."
      }
    ],
    "related": [
      "electrical-repair",
      "dedicated-appliance-circuits",
      "ev-charger-installation"
    ]
  },
  "bathroom-fan-replacement": {
    "image": "bathroomfan",
    "meta": {
      "title": "Bathroom Fan Replacement in Spokane | Acorn Electric",
      "description": "Bathroom exhaust fan replacement and installation in Spokane. Acorn Electric checks wiring, controls and the ventilation setup before planning the work."
    },
    "h1": "Bathroom fan replacement in Spokane",
    "lede": "A loud fan, a dead motor or a bathroom that stays steamy? We assess the fan, electrical connection and ventilation setup before recommending a replacement.",
    "problem": "Your bathroom fan is noisy, has stopped working or isn't clearing moisture.",
    "story": [
      "Replacing a bathroom fan can improve noise and operation, but a new motor can't fix a blocked or poorly routed exhaust duct. The fan and the path outdoors need to be considered together.",
      "We check the electrical work and tell you what the installation involves. If the project needs duct changes, a new exterior opening or roof work, we identify who will handle those parts before you commit."
    ],
    "signs": {
      "heading": "Reasons to replace or check a bathroom fan",
      "items": [
        "The fan rattles, grinds or won't start.",
        "The bathroom stays damp after the fan has run.",
        "You want quieter operation or a timer control.",
        "A remodel needs a different fan or a new location."
      ]
    },
    "work": {
      "heading": "What a bathroom fan project involves",
      "intro": "",
      "steps": [
        {
          "title": "Check the existing setup",
          "body": "We review the fan opening, access, power and visible exhaust routing."
        },
        {
          "title": "Confirm the plan",
          "body": "We discuss a suitable replacement and any duct, ceiling or roof coordination needed."
        },
        {
          "title": "Install and connect",
          "body": "We wire, mount and connect the fan and its controls."
        },
        {
          "title": "Check operation",
          "body": "We test the fan and controls and explain any remaining ventilation issues."
        }
      ]
    },
    "doneRight": {
      "heading": "Moisture needs a route outside",
      "intro": "",
      "points": [
        {
          "title": "A suitable exhaust path",
          "body": "Bathroom exhaust should discharge outdoors, not simply into the attic."
        },
        {
          "title": "Equipment for the location",
          "body": "We check the fan rating and electrical protection appropriate to where it is installed."
        },
        {
          "title": "Matching controls",
          "body": "Timers, humidity controls and switches must suit the selected equipment."
        },
        {
          "title": "No surprises",
          "body": "We settle roofing, ducting and finish repairs before work starts."
        }
      ]
    },
    "factors": {
      "heading": "What affects a bathroom fan replacement",
      "items": [
        {
          "title": "Housing and opening size",
          "body": "A different fan housing can require changes to the ceiling opening."
        },
        {
          "title": "Access",
          "body": "Attic access can make mounting and electrical work more straightforward."
        },
        {
          "title": "Exhaust routing",
          "body": "Duct condition and outdoor termination can add work beyond the fan itself."
        }
      ]
    },
    "prepare": [
      "Photos of the current fan, switch and bathroom ceiling",
      "Any model number and a description of the problem",
      "Whether there is attic access and where the fan exhausts, if known"
    ],
    "faqs": [
      {
        "q": "Can a quieter fan use the existing opening?",
        "a": "Sometimes. We check the existing housing, opening, wiring and access before recommending a model."
      },
      {
        "q": "Will replacing the fan fix a steamy bathroom?",
        "a": "It may help, but poor ducting, a blocked outlet or unsuitable fan sizing can also be the cause. We assess the setup rather than assuming a new fan will solve it."
      },
      {
        "q": "Can you add a fan where there is none?",
        "a": "Ask us about the location. A new installation needs a power supply and an exhaust route outdoors, with any ducting, roof or finish work settled beforehand."
      }
    ],
    "related": [
      "ceiling-fan-installation",
      "remodel-and-addition-wiring",
      "electrical-repair"
    ]
  },
  "lighting-installation": {
    "image": "recessed",
    "meta": {
      "title": "Lighting Installation in Spokane | Acorn Electric",
      "description": "Recessed lighting, fixture upgrades and exterior lighting in Spokane. Acorn Electric plans the wiring, controls and placement for your space."
    },
    "h1": "Indoor and outdoor lighting installation in Spokane",
    "lede": "Better light where you cook, work, gather or walk after dark. We install and update indoor and outdoor lighting, with wiring and controls planned for the space.",
    "problem": "You need better lighting indoors, outside or in a newly remodeled space.",
    "story": [
      "A room can have enough fixtures and still feel dark in the places that matter. Outside, glare and poorly placed lights can be as frustrating as not having enough light. We start with how you use the space.",
      "From recessed ceiling lights to a covered patio or entry fixture, we check the existing wiring, placement, switching and equipment rating before work begins."
    ],
    "signs": {
      "heading": "Recessed lighting is worth a look if…",
      "items": [
        "Your kitchen counters are in your own shadow.",
        "A basement or bonus room relies on lamps.",
        "You're remodeling and the ceiling is open anyway.",
        "Your existing can lights are old, hot, or flicker on the dimmer.",
        "You want lighting on dimmers you can set by room."
      ]
    },
    "work": {
      "heading": "How a recessed lighting project comes together",
      "intro": "",
      "steps": [
        {
          "title": "Lay it out",
          "body": "We plan spacing around how you use the room: task light where you work, even light where you live, and clear of joists and ducts."
        },
        {
          "title": "Pick the right fixtures",
          "body": "Canless LED wafers or housings, color temperature, brightness, and trims. Fixtures in an insulated ceiling must be rated for it."
        },
        {
          "title": "Wire and switch",
          "body": "New circuits or extended ones, routed through existing ceilings with as little patching as possible, with compatible dimmers."
        },
        {
          "title": "Test and tidy",
          "body": "Every light, every dimmer setting, checked. Dust controlled while we work and cleaned up after."
        }
      ]
    },
    "doneRight": {
      "heading": "Details that make recessed lighting work",
      "intro": "",
      "points": [
        {
          "title": "Rated for insulation",
          "body": "Fixtures that touch insulation need to be IC-rated, and in insulated ceilings, airtight. It matters for safety and your heating bill."
        },
        {
          "title": "Dimmers matched to the fixtures",
          "body": "Most flicker and buzz problems come from mismatched dimmers and LEDs. We use combinations that work together."
        },
        {
          "title": "Circuit capacity checked",
          "body": "LEDs draw little, but we still confirm the circuit and any existing wiring in the ceiling are sound before adding to them."
        },
        {
          "title": "Minimal patching",
          "body": "In finished ceilings we route carefully to keep drywall repairs small."
        }
      ]
    },
    "factors": {
      "heading": "What affects a lighting project",
      "items": [
        {
          "title": "Attic access",
          "body": "Ceilings with an attic above are simpler than ceilings under a second floor."
        },
        {
          "title": "Number of lights and switches",
          "body": "More zones and dimmers mean more wiring."
        },
        {
          "title": "Existing wiring",
          "body": "Older wiring in the ceiling may need attention before it's extended."
        },
        {
          "title": "Fixture choice",
          "body": "Canless wafers, housings and decorative trims vary."
        }
      ]
    },
    "prepare": [
      "Which rooms, and roughly how big",
      "Photos of the ceiling and the current light and switch",
      "Whether there's an attic or another floor above",
      "Any fixtures you've already picked out"
    ],
    "faqs": [
      {
        "q": "How many recessed lights does a room need?",
        "a": "It depends on ceiling height, the fixtures' output and how the room is used. A kitchen needs more task light than a bedroom. We lay it out with you rather than using a one-size grid."
      },
      {
        "q": "Canless LED or traditional cans?",
        "a": "Canless LED wafers are slim, efficient and easier to fit into existing ceilings. Traditional housings let you change trims and bulbs later. Both are good; we'll suggest one for your ceiling."
      },
      {
        "q": "Can you add recessed lights to a finished ceiling?",
        "a": "Yes, usually through the fixture holes themselves with only small access cuts. Ceilings below a second floor take more planning than ceilings with an attic above."
      },
      {
        "q": "Why do my LED lights flicker on the dimmer?",
        "a": "Usually the dimmer isn't compatible with the LED fixtures. Replacing the dimmer with a matched one fixes most cases."
      },
      {
        "q": "Can you add lights where there's no existing wiring?",
        "a": "Usually, yes. We'll find the best way to get power to the new location with the least disruption."
      }
    ],
    "related": [
      "remodel-and-addition-wiring",
      "electrical-repair"
    ],
    "sections": [
      {
        "id": "recessed-lighting",
        "title": "Recessed lighting installation",
        "body": "One ceiling light in the middle of the room leaves corners dim and shadows everywhere. Well-planned recessed lighting fixes that, and it starts with the layout, not the fixtures.",
        "items": []
      },
      {
        "id": "exterior-lighting",
        "image": "exterior",
        "title": "Exterior and outdoor lighting installation",
        "body": "A dark driveway, a porch light you can't see by and a back yard nobody uses after sunset. Good exterior lighting makes the house safer and more usable, and it has to survive our winters.",
        "items": [
          "Plan the light: Where you need to see, what should be lit for security, and keeping light aimed down, not into neighbors' windows.",
          "Pick rated fixtures and controls: Wet- or damp-location rated fixtures, plus motion sensors, photocells or timers.",
          "Wire it weather-tight: Sealed boxes and entries, in-use covers on outlets, GFCI protection where required.",
          "Test and aim: We aim fixtures and set sensors so they do what you want."
        ]
      }
    ]
  },
  "hot-tub-wiring": {
    "image": "hottub",
    "meta": {
      "title": "Hot Tub Wiring & Spa Electrical in Spokane | Acorn Electric",
      "description": "Hot tub and spa wiring in Spokane: dedicated 240V circuit, GFCI disconnect, bonding and weather-tight outdoor work. Sized to your spa's spec and inspected."
    },
    "h1": "Hot tub wiring in Spokane",
    "lede": "The hot tub is on order and the pad is poured. What's left is the part that has to be right: a dedicated circuit, a GFCI disconnect and outdoor wiring that holds up to Spokane winters.",
    "problem": "You're installing a hot tub and want the electrical done properly.",
    "story": [
      "Most full-size hot tubs need their own 240-volt circuit, sized to the manufacturer's spec, with ground-fault protection and a disconnect near the tub. Water, electricity and a lot of snow make this one of the jobs where details really matter.",
      "We plan the circuit from your spa's spec sheet, run it in a way that's protected outdoors, and set the disconnect where the code and your patio both work."
    ],
    "signs": {
      "heading": "Call us when…",
      "items": [
        "You've bought a hot tub or swim spa and need it wired.",
        "You're replacing an old tub and the new one needs a different circuit.",
        "Your existing hot tub trips its GFCI or the disconnect looks weathered.",
        "You're moving a tub to a new spot on the property.",
        "The dealer told you the tub needs a 50- or 60-amp circuit and you're not sure your panel has room."
      ]
    },
    "work": {
      "heading": "What hot tub wiring involves",
      "intro": "The spa's installation manual sets the circuit size. Code sets how it's protected. Your yard sets the route.",
      "steps": [
        {
          "title": "Check the spec and the panel",
          "body": "We read the spa's requirements and confirm your panel can supply them. If it can't, we'll explain the options."
        },
        {
          "title": "Run a dedicated circuit",
          "body": "A dedicated 240-volt circuit, in a wiring method suited to outdoor and underground use, from the panel to the spa."
        },
        {
          "title": "Install the GFCI disconnect",
          "body": "A ground-fault protected disconnect, placed within sight of the tub and at the distance the code requires, so you can safely shut it off for service."
        },
        {
          "title": "Bond, connect, inspect",
          "body": "Required bonding, the final connection at the spa, then a permit inspection before you fill it up and turn it on."
        }
      ]
    },
    "doneRight": {
      "heading": "What makes it safe around water",
      "intro": "Most of this is out of sight once the tub is running.",
      "points": [
        {
          "title": "Ground-fault protection",
          "body": "A GFCI disconnect cuts power fast if current leaks where it shouldn't. It's required, and we test it before we leave."
        },
        {
          "title": "Disconnect placement",
          "body": "Close enough to see the tub, far enough to be safe. Generally within sight and at least five feet away, unless a permanent barrier separates them."
        },
        {
          "title": "Bonding",
          "body": "Metal parts around the spa are bonded together so there's no voltage difference between things you might touch."
        },
        {
          "title": "Weather-proofed outdoor work",
          "body": "Sealed entries, rated fittings and protected conduit where it leaves the ground. Freeze-thaw cycles punish anything less."
        }
      ]
    },
    "factors": {
      "heading": "What affects hot tub wiring",
      "items": [
        {
          "title": "Your spa's amperage",
          "body": "Usually set by the manufacturer. Bigger tubs and swim spas need bigger circuits."
        },
        {
          "title": "Distance from the panel",
          "body": "And whether the route goes through the house, along a wall or underground."
        },
        {
          "title": "Panel space and capacity",
          "body": "A large spa can be the load that tips a panel into an upgrade."
        },
        {
          "title": "Surface and landscaping",
          "body": "Trenching through lawn is easier than cutting concrete or pavers."
        }
      ]
    },
    "prepare": [
      "The hot tub's make and model, or a photo of the electrical section of its spec sheet",
      "Photos of your electrical panel with the door open",
      "Where the tub will sit, and roughly how far that is from the panel",
      "What's between them (lawn, deck, concrete, pavers)"
    ],
    "faqs": [
      {
        "q": "What size circuit does a hot tub need?",
        "a": "It depends on the tub. Most full-size spas call for a dedicated 240-volt circuit, commonly in the 40- to 60-amp range, but the manufacturer's spec sheet is the authority. Send it to us and we'll size the circuit to it."
      },
      {
        "q": "Does hot tub wiring need a permit in Spokane?",
        "a": "Yes. A new spa circuit needs an electrical permit and inspection: through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit."
      },
      {
        "q": "What about plug-and-play 120-volt hot tubs?",
        "a": "Some smaller spas plug into a standard outlet, but that outlet still needs to be GFCI protected, on an appropriate circuit and in the right spot. Many people later convert them to 240 volts so they heat faster. We can do either."
      },
      {
        "q": "Can you wire the tub before it's delivered?",
        "a": "Usually yes, as long as we know the model and the final location. We can leave the circuit ready for the connection, then come back to connect it once the tub is set."
      }
    ],
    "related": [
      "electrical-panel-upgrades",
      "subpanel-installation",
      "lighting-installation"
    ]
  },
  "knob-and-tube-rewiring": {
    "image": "knob-tube",
    "meta": {
      "title": "Knob & Tube Replacement in Spokane | Acorn Electric",
      "description": "Knob and tube wiring in your Spokane home? Acorn Electric finds what's still live, explains your options and rewires older homes with care for the plaster and trim."
    },
    "h1": "Knob and tube replacement in Spokane",
    "lede": "You love the old house. The original wiring, not so much. Maybe an inspector flagged it, maybe your insurer asked, or maybe you just want to stop wondering. We'll find out what's really in the walls and replace it without wrecking the character you bought the house for.",
    "problem": "Your older home still has knob and tube wiring and you want it dealt with.",
    "story": [
      "Knob and tube was the standard way to wire a house in the early 1900s, and Spokane has whole neighborhoods built in that era. It isn't automatically dangerous, but it was never designed for today's loads, it has no ground, and after a century of remodels it has often been spliced, extended or buried in insulation it was never meant to be covered by.",
      "The harder questions are how much is still live, what can safely wait, and how to get new wire through finished plaster without tearing the house apart. We work those out first."
    ],
    "signs": {
      "heading": "It's time to deal with it when…",
      "items": [
        "A home inspection, appraisal or insurer has asked about knob and tube.",
        "You can see porcelain knobs and tubes in the attic, basement or crawlspace.",
        "Your outlets are two-prong and there are few of them per room.",
        "You're adding insulation to the attic or walls (knob and tube must not be buried in it).",
        "You're planning a remodel and the walls will be open anyway."
      ]
    },
    "work": {
      "heading": "How a knob and tube rewire works",
      "intro": "Every old house is different, so the job starts with finding out exactly what's there.",
      "steps": [
        {
          "title": "Find out what's live",
          "body": "We trace which circuits are still knob and tube, which have been partly replaced, and where any risky splices or modifications are."
        },
        {
          "title": "A plan you can choose from",
          "body": "A whole-house rewire at once, or in phases starting with the most important circuits. We lay out the options, and what each one costs you in disruption."
        },
        {
          "title": "Fish new wire with care",
          "body": "We route new cable through attics, basements and existing cavities wherever we can, and keep openings in plaster and trim as few and as small as possible."
        },
        {
          "title": "Permit, inspection and a clear record",
          "body": "Rewiring is permitted work. It's inspected, and you end up with a record you can show an insurer or a future buyer."
        }
      ]
    },
    "doneRight": {
      "heading": "Respect for the house",
      "intro": "",
      "points": [
        {
          "title": "Old circuits properly retired",
          "body": "Abandoned wiring is disconnected at the source, so nothing is left live and forgotten in a wall."
        },
        {
          "title": "Grounded outlets",
          "body": "New circuits are grounded, with GFCI and arc-fault protection where the code requires it."
        },
        {
          "title": "Minimal openings",
          "body": "We plan routes to protect plaster, trim and original details, and tell you up front where openings are unavoidable."
        },
        {
          "title": "Honest phasing",
          "body": "If some of the old wiring can safely wait, we'll tell you. If it can't, we'll tell you that too."
        }
      ]
    },
    "factors": {
      "heading": "What shapes a rewire",
      "items": [
        {
          "title": "How much is still live",
          "body": "A few remaining circuits is a very different job from a fully original house."
        },
        {
          "title": "Access",
          "body": "Open attics, unfinished basements and crawlspaces make routing much easier."
        },
        {
          "title": "Wall finishes",
          "body": "Plaster and lath takes more care than drywall."
        },
        {
          "title": "Panel and service",
          "body": "An old fuse panel or small service is often replaced as part of the same project."
        }
      ]
    },
    "prepare": [
      "The approximate age of the home and any past electrical work you know about",
      "The inspection report or insurer's letter, if one prompted this",
      "Photos of the panel, and of any knob and tube you can see in the attic or basement",
      "Whether you're planning a remodel or insulation work soon"
    ],
    "faqs": [
      {
        "q": "Is knob and tube wiring illegal in Washington?",
        "a": "Existing knob and tube isn't automatically required to be removed, but it can't be extended, it must not be covered by insulation, and many insurers won't cover a home with live knob and tube. Most owners replace it for those reasons."
      },
      {
        "q": "Do you have to tear out all my walls?",
        "a": "No. Most rewires are done by fishing new cable through attics, basements and existing cavities, with small, planned openings where there's no other route."
      },
      {
        "q": "Can I rewire in stages?",
        "a": "Often, yes. We can start with the highest-risk circuits, such as kitchens, bathrooms and anything near insulation, and plan the rest around your budget."
      },
      {
        "q": "Do I need a permit to replace knob and tube?",
        "a": "Yes. Rewiring is permitted and inspected work: through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit."
      }
    ],
    "related": [
      "electrical-inspections",
      "electrical-panel-upgrades"
    ]
  },
  "electrical-inspections": {
    "image": "inspection",
    "meta": {
      "title": "Electrical Safety Inspections in Spokane | Acorn Electric",
      "description": "Electrical safety inspections for Spokane homes, with grounding, bonding and whole-home surge protection options. Understand the findings and the next steps."
    },
    "h1": "Home electrical inspections in Spokane",
    "lede": "Something about the wiring doesn't sit right: an older house, a home inspector's note, an insurer's question, or a warm outlet. An electrical inspection tells you what's actually there and what, if anything, needs doing.",
    "problem": "You want to know your home's wiring is safe and up to code.",
    "story": [
      "A general home inspection looks at a house broadly. An electrical inspection by a licensed electrician goes deeper: the panel, grounding and bonding, ground-fault and arc-fault protection, visible wiring, and the outlets and switches you use every day.",
      "Spokane has plenty of older homes with a few generations of electrical work layered inside them. You get a clear, prioritized list so you can decide what to do and when."
    ],
    "signs": {
      "heading": "People usually book an inspection when…",
      "items": [
        "They're buying an older home and want more than the general inspection.",
        "A home inspector or insurer flagged the panel or wiring.",
        "They've just moved in and don't know what previous owners did.",
        "They're planning a remodel, an EV charger or a hot tub.",
        "Lights flicker, breakers trip, or an outlet or switch feels warm."
      ]
    },
    "work": {
      "heading": "What we look at",
      "intro": "What we cover depends on the house and your concerns. An inspection typically includes:",
      "steps": [
        {
          "title": "Service and panel",
          "body": "Panel condition, breaker sizing against wire size, signs of overheating, double taps and labeling."
        },
        {
          "title": "Grounding and bonding",
          "body": "The connection to earth and the bonding that keeps metal parts at the same potential."
        },
        {
          "title": "Protection devices",
          "body": "GFCI protection in kitchens, baths, garages and outdoors, and arc-fault protection where it applies."
        },
        {
          "title": "Visible wiring and devices",
          "body": "Outlets, switches and accessible wiring, including older wiring types like knob-and-tube or aluminum branch circuits."
        },
        {
          "title": "A straight explanation",
          "body": "What we found, what's urgent, what can wait, and what's fine as is."
        }
      ]
    },
    "doneRight": {
      "heading": "What you can expect from us",
      "intro": "",
      "points": [
        {
          "title": "No upselling by fear",
          "body": "If something is fine, we say so. If something is unsafe, we say that too, and why."
        },
        {
          "title": "Prioritized findings",
          "body": "Safety issues first, then code and reliability issues, then nice-to-haves."
        },
        {
          "title": "Plain English",
          "body": "You'll understand what we found, not just receive a list of code sections."
        },
        {
          "title": "Not a permit inspection",
          "body": "This is a private evaluation for you. Permit inspections are done by the City of Spokane or Washington L&I on permitted work."
        }
      ]
    },
    "factors": {
      "heading": "What shapes the inspection",
      "items": [
        {
          "title": "Size and age of the home",
          "body": "Larger and older homes take longer."
        },
        {
          "title": "Access",
          "body": "Attics, crawlspaces and finished basements affect what we can see."
        },
        {
          "title": "Your concerns",
          "body": "A specific issue can be the focus, or we can look at the whole house."
        },
        {
          "title": "Outbuildings",
          "body": "Detached garages, shops and hot tubs can be included."
        }
      ]
    },
    "prepare": [
      "The age of the home and any known past electrical work",
      "The inspection report or insurer's note, if one prompted this",
      "Any specific concerns: flickering, tripping, warm outlets, dead circuits",
      "Your timeline, if you're in the middle of a purchase"
    ],
    "faqs": [
      {
        "q": "How is this different from a general home inspection?",
        "a": "A general inspector covers the whole house at a high level and often recommends an electrician for anything electrical. We're that electrician: we look closer, test more, and can tell you what a fix involves."
      },
      {
        "q": "Do I get something in writing?",
        "a": "Tell us if you need written findings, for example for a purchase or an insurer, when you book, and we'll plan for it."
      },
      {
        "q": "Will you fix things during the inspection?",
        "a": "Small, safe fixes are sometimes possible on the spot. Anything bigger we explain and quote so you can decide."
      },
      {
        "q": "I'm buying a house with knob-and-tube wiring. Is that a deal-breaker?",
        "a": "Not necessarily, but it deserves a close look. Its condition, how much is still live and what's been modified all matter, and insurers often ask about it. An inspection gives you facts to negotiate with."
      },
      {
        "q": "Can I ask about surge protection or grounding without booking an inspection?",
        "a": "Yes. Tell us what you want checked or installed and we'll quote just that."
      }
    ],
    "related": [
      "knob-and-tube-rewiring",
      "electrical-repair"
    ],
    "sections": [
      {
        "id": "surge-protection",
        "title": "Whole-home surge protection",
        "body": "Your house is full of circuit boards now: the furnace, the fridge, the washer, the EV charger, the TV. A whole-home surge protector at the panel is a small job that protects all of them at once.",
        "items": [
          "Check the panel: We confirm there's a suitable spot and that the grounding and bonding the device relies on are sound.",
          "Choose the right device: A device rated for your panel and service, mounted as close to the panel as possible with short, direct leads.",
          "Install and verify: Installed to the manufacturer's instructions and the code as adopted in Washington, with its status indicator working.",
          "Show you what to look for: Most units have an indicator light. We'll show you what it means and what to do if it changes."
        ]
      },
      {
        "id": "grounding-and-bonding",
        "title": "Grounding and bonding upgrades",
        "body": "Grounding is the part of your electrical system you never see and only notice when it's missing. If an inspector flagged it, or your home is older, we'll check it and bring it up to what your house actually needs.",
        "items": [
          "Find what's there: We trace the grounding electrode conductor, check clamps and connections, and look at what electrodes exist.",
          "Add or replace electrodes: Ground rods or other electrodes are installed and connected as the code requires.",
          "Bond the piping: Metal water piping and gas piping are bonded where required, including CSST per its manufacturer's instructions.",
          "Inspect and explain: The work is permitted and inspected where required, and we walk you through what changed."
        ]
      }
    ]
  },
  "dedicated-appliance-circuits": {
    "image": "appliance",
    "meta": {
      "title": "Dedicated Circuit Installation in Spokane | Acorn Electric",
      "description": "New heat pump, mini-split, induction range, dryer, freezer or shop equipment? Acorn Electric runs dedicated 120V and 240V circuits for Spokane homes."
    },
    "h1": "Dedicated circuit installation in Spokane",
    "lede": "The new appliance is bought, or about to be. What's between you and using it is a circuit that doesn't exist yet. We'll check your panel, run the right circuit and hook it up properly.",
    "problem": "You bought a new appliance and there's no circuit to plug it into.",
    "story": [
      "A lot of what people buy today needs its own circuit: heat pumps and mini-splits, induction ranges, electric dryers and water heaters, chest freezers, garage heaters, welders and shop tools. The installer often says 'you'll need an electrician for that part,' and that's where you get stuck.",
      "We work out what the appliance needs from its installation manual, confirm your panel can supply it, and run a dedicated circuit with the right breaker, wire and disconnect, so the appliance installer can finish and you can use the thing you paid for."
    ],
    "signs": {
      "heading": "You'll likely need a new circuit for…",
      "items": [
        "A heat pump or ductless mini-split.",
        "An induction or electric range, cooktop or wall oven.",
        "An electric dryer, tankless or heat pump water heater.",
        "A freezer, garage heater or second refrigerator that keeps tripping a shared circuit.",
        "Welders, compressors, table saws and other shop equipment."
      ]
    },
    "work": {
      "heading": "How it works",
      "intro": "",
      "steps": [
        {
          "title": "Read the nameplate",
          "body": "We size the circuit from the appliance's installation instructions and nameplate, not a rule of thumb."
        },
        {
          "title": "Check the panel",
          "body": "Breaker space and service capacity are checked. If the panel is tight, we'll show you the options."
        },
        {
          "title": "Run the circuit",
          "body": "Wire, breaker, receptacle or disconnect, routed cleanly and protected, indoors or out."
        },
        {
          "title": "Permit and inspection",
          "body": "New circuits are permitted and inspected, and we coordinate timing with your appliance or HVAC installer."
        }
      ]
    },
    "doneRight": {
      "heading": "Done to the appliance's requirements",
      "intro": "",
      "points": [
        {
          "title": "Matched to the manual",
          "body": "Breaker size, wire size and receptacle type match what the manufacturer specifies."
        },
        {
          "title": "Disconnects where required",
          "body": "Outdoor units like heat pumps get a disconnect within sight, sealed and weather-rated."
        },
        {
          "title": "Protection where required",
          "body": "GFCI or arc-fault protection where the code calls for it."
        },
        {
          "title": "Coordinated with other trades",
          "body": "We work around your HVAC, plumbing or appliance installer's schedule."
        }
      ]
    },
    "factors": {
      "heading": "What affects a dedicated circuit",
      "items": [
        {
          "title": "Size of the load",
          "body": "A 240-volt heat pump circuit is a different job from a 120-volt freezer circuit."
        },
        {
          "title": "Distance from the panel",
          "body": "Longer runs and finished spaces take more work."
        },
        {
          "title": "Panel capacity",
          "body": "Some homes need a subpanel or service upgrade to add big loads."
        },
        {
          "title": "Indoor or outdoor",
          "body": "Outdoor equipment needs weather-rated materials."
        }
      ]
    },
    "prepare": [
      "The appliance's make and model, or a photo of its specification label",
      "Where it's going and roughly how far that is from the panel",
      "A photo of your panel with the door open",
      "Your appliance or HVAC installer's schedule, if you have one"
    ],
    "faqs": [
      {
        "q": "Can I just plug a new appliance into an existing outlet?",
        "a": "Only if the manufacturer allows it and the circuit can carry it. Many appliances specify a dedicated circuit, and large ones need 240 volts. We'll check."
      },
      {
        "q": "My HVAC company is installing a heat pump. Do they do the electrical?",
        "a": "Some do, many don't. We're happy to work alongside your HVAC installer and handle the circuit and disconnect."
      },
      {
        "q": "Does a new circuit need a permit?",
        "a": "Yes. New circuits are permitted work: through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit and schedule the inspection."
      }
    ],
    "related": [
      "electrical-panel-upgrades",
      "subpanel-installation"
    ]
  },
  "subpanel-installation": {
    "image": "subpanel",
    "meta": {
      "title": "Subpanel Installation in Spokane | Acorn Electric",
      "description": "Subpanels for Spokane garages, shops, ADUs and basements. Feeder sizing, grounding and permits handled so the new space has the power it needs."
    },
    "h1": "Subpanel installation for garages, shops and additions",
    "lede": "You've got a shop, a detached garage, an ADU or a basement finish that needs real power, not an extension cord. A subpanel brings circuits to where you're working.",
    "problem": "Your garage, shop or new space needs its own power.",
    "story": [
      "A subpanel is a second, smaller panel fed from your main one. It puts breakers close to where the power is used, and it makes sense when one area needs several circuits: a shop with a welder and a compressor, a detached garage with an EV charger and lights, a basement suite or an ADU.",
      "Done right, it's one of the most useful upgrades a property can have. Done wrong, and we've seen plenty, it's a common source of shocks, nuisance trips and failed inspections."
    ],
    "signs": {
      "heading": "A subpanel might be the answer if…",
      "items": [
        "You're running extension cords to a garage or shop.",
        "Your main panel has no space left but has capacity to spare.",
        "You're finishing a basement or adding an ADU or addition.",
        "You need 240-volt power for shop tools, a welder or a charger in an outbuilding.",
        "Breakers in the garage trip whenever two tools run at once."
      ]
    },
    "work": {
      "heading": "What a subpanel installation involves",
      "intro": "The main decisions are how much power the subpanel needs and how the feeder gets there.",
      "steps": [
        {
          "title": "Plan the load",
          "body": "We list what will run in the space now and later, and size the feeder and subpanel to suit, after confirming the main panel can supply it."
        },
        {
          "title": "Route the feeder",
          "body": "Inside the house that might be through framing or a crawlspace. To a detached building it usually means a trench or an approved overhead route."
        },
        {
          "title": "Set the subpanel",
          "body": "Mounted, grounded and bonded correctly, with a disconnect where the building requires one."
        },
        {
          "title": "Permit and inspection",
          "body": "Subpanels and feeders need an electrical permit. We handle it and the work is inspected."
        }
      ]
    },
    "doneRight": {
      "heading": "Where subpanels usually go wrong",
      "intro": "These details are easy to get wrong and they matter.",
      "points": [
        {
          "title": "Neutrals and grounds kept separate",
          "body": "In a subpanel, the neutral and ground are isolated from each other. Bonding them together, as in a main panel, is a common and dangerous mistake."
        },
        {
          "title": "Detached buildings get their own grounding",
          "body": "An outbuilding needs its own grounding electrode and a means of disconnect. We install both."
        },
        {
          "title": "Feeder sized for the real load",
          "body": "Too small and it overheats or trips; we size it for what you'll run, with room to grow."
        },
        {
          "title": "Buried runs done properly",
          "body": "Underground feeders use the right wiring method at the right depth with protection where they come out of the ground."
        }
      ]
    },
    "factors": {
      "heading": "What affects a subpanel install",
      "items": [
        {
          "title": "Distance and route",
          "body": "Trenching across a yard is a bigger job than a run through an unfinished basement."
        },
        {
          "title": "Size of the subpanel",
          "body": "The amperage you need decides wire size, conduit and breaker."
        },
        {
          "title": "Main panel capacity",
          "body": "If the main panel can't supply the feeder, that needs addressing first."
        },
        {
          "title": "Surfaces in the way",
          "body": "Concrete, finished walls and landscaping all affect the route."
        }
      ]
    },
    "prepare": [
      "Photos of your main panel with the door open",
      "What you plan to run in the new space (tools, heaters, charger, lights)",
      "The distance from the house to the building, and what's between them",
      "Whether the building already has any wiring"
    ],
    "faqs": [
      {
        "q": "How big should my shop subpanel be?",
        "a": "It depends on what you'll run at the same time. A hobby garage and a working shop with a welder and compressor are very different. We size it from your actual list, and leave room for what's next."
      },
      {
        "q": "Do I need a permit for a subpanel in Spokane?",
        "a": "Yes. A new feeder and subpanel need an electrical permit and inspection: through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit."
      },
      {
        "q": "Can a subpanel fix a full main panel?",
        "a": "Sometimes. If you're out of breaker space but your service has spare capacity, moving circuits to a subpanel can work. If you're out of capacity, a subpanel won't help; a service upgrade will."
      },
      {
        "q": "Can you trench to my detached garage?",
        "a": "Getting the feeder there is part of the job. Tell us about the route (lawn, concrete, landscaping) and we'll plan it with you."
      }
    ],
    "related": [
      "electrical-panel-upgrades",
      "ev-charger-installation",
      "hot-tub-wiring"
    ]
  },
  "remodel-and-addition-wiring": {
    "image": "remodel",
    "meta": {
      "title": "Remodel & Addition Electrical in Spokane, WA | Acorn Electric",
      "description": "Kitchen and bath remodels, basements, additions and covered patios. Acorn Electric plans the lighting and circuits with you and wires it right for Spokane homes."
    },
    "h1": "Electrical for remodels and additions in Spokane",
    "lede": "You can picture the finished kitchen, the new bathroom or the covered patio. We help you get the lighting, outlets and circuits right while the walls are open, so it works the way you imagined when it's done.",
    "problem": "You're remodeling or adding on and need the electrical planned and done right.",
    "story": [
      "The electrical in a remodel is mostly invisible when it's finished, which is exactly why it's easy to get wrong. An outlet in the wrong place, a dark corner of the counter, a fan on the same circuit as the microwave: these are the things people live with for years.",
      "We walk the space with you before anything is roughed in, talk through how you'll actually use it, and plan lighting, outlets and circuits around that. Then we wire it properly, get it inspected before the walls close, and come back to trim it out once the finishes are in."
    ],
    "signs": {
      "heading": "Projects we wire",
      "items": [
        "Kitchen remodels: lighting, island outlets, appliance circuits, under-cabinet lights.",
        "Bathroom remodels: fans, heated floors, lighting and GFCI protection.",
        "Basement finishes and bonus rooms.",
        "Room additions and covered patios or decks.",
        "Garage and shop conversions."
      ]
    },
    "work": {
      "heading": "How a remodel job runs",
      "intro": "Remodels work best when the electrician is involved before the framing is finished.",
      "steps": [
        {
          "title": "Walk it and plan it",
          "body": "We go through the space with you (and your contractor, if you have one) and mark out lighting, outlets and switches."
        },
        {
          "title": "Check capacity",
          "body": "New kitchens and additions add load. We confirm the panel and service can carry it, and say so early if they can't."
        },
        {
          "title": "Permit and rough-in",
          "body": "We pull the permit, rough in the wiring and get the rough-in inspection before insulation and drywall."
        },
        {
          "title": "Trim-out and final",
          "body": "Once finishes are in, we install fixtures and devices, test everything and get the final inspection."
        }
      ]
    },
    "doneRight": {
      "heading": "What we pay attention to",
      "intro": "",
      "points": [
        {
          "title": "Lighting that works",
          "body": "Layered lighting for tasks and mood, on switches and dimmers that make sense where you walk in."
        },
        {
          "title": "Outlets where you need them",
          "body": "Spaced for how you'll use the room, and to code for kitchens and baths."
        },
        {
          "title": "Your home treated like a home",
          "body": "Dust controlled, floors protected, and we clean up every day."
        },
        {
          "title": "Good partners",
          "body": "We work cleanly alongside your contractor, plumber and HVAC installer."
        }
      ]
    },
    "factors": {
      "heading": "What shapes a remodel job",
      "items": [
        {
          "title": "Size of the project",
          "body": "A bathroom refresh is a different job from a full kitchen or addition."
        },
        {
          "title": "Open or finished walls",
          "body": "Working in open framing is faster than fishing through finished walls."
        },
        {
          "title": "Panel capacity",
          "body": "New loads may mean panel work too."
        },
        {
          "title": "Lighting choices",
          "body": "Fixture count and controls drive a lot of the work."
        }
      ]
    },
    "prepare": [
      "Plans, sketches or photos of the space as it is now",
      "Your contractor's contact and schedule, if you have one",
      "Appliance and fixture choices, even if they're not final",
      "A photo of your panel with the door open"
    ],
    "faqs": [
      {
        "q": "Do you work with general contractors?",
        "a": "Yes. We're happy to work as part of your contractor's team, or directly with you if you're managing the project yourself."
      },
      {
        "q": "When should I call an electrician in a remodel?",
        "a": "Before framing is finished, ideally during planning. It's far easier to put things in the right place before the walls close."
      },
      {
        "q": "Does a remodel need an electrical permit?",
        "a": "Almost always. Rough-in is inspected before the walls close, then again once fixtures are in. Permits go through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit."
      }
    ],
    "related": [
      "lighting-installation",
      "new-home-electrical",
      "dedicated-appliance-circuits"
    ]
  },
  "new-home-electrical": {
    "image": "new-construction",
    "meta": {
      "title": "New Custom Home Electrical in Spokane, WA | Acorn Electric",
      "description": "Electrical for new custom homes, shops and ADUs in the Spokane area. Acorn Electric plans the layout with you and wires it from temporary power to final inspection."
    },
    "h1": "Electrical for new custom homes in the Spokane area",
    "lede": "You're building the house you'll live in for years. The electrical should fit how you actually live: where you charge the car, where the lights switch on, where you'll want power in ten years. We plan it with you and wire it right.",
    "problem": "You're building a custom home and want the electrical planned around you.",
    "story": [
      "On a new build, the electrical plan often gets decided fast, by default, from a standard layout. That's how you end up with no outlet where the desk goes, a garage that can't take an EV charger, or lights that switch from the wrong end of the hall.",
      "We work with you and your builder from the plan stage: temporary power, the service, lighting and outlet layout, and the circuits you'll need later, like an EV charger, hot tub or shop. Then we wire it cleanly, keep the inspections on schedule, and hand you a home that works the way you expected."
    ],
    "signs": {
      "heading": "We wire…",
      "items": [
        "New custom homes, working with you and your builder.",
        "Detached shops and garages.",
        "ADUs and guest houses.",
        "Homes built EV-ready, hot-tub-ready and future-ready.",
        "Temporary power for the build."
      ]
    },
    "work": {
      "heading": "How a new build runs",
      "intro": "",
      "steps": [
        {
          "title": "Plan review and walkthrough",
          "body": "We go through the plans with you and your builder, then walk the framing to confirm locations before we wire."
        },
        {
          "title": "Temporary power and service",
          "body": "Temporary power for construction, then the permanent service coordinated with your utility."
        },
        {
          "title": "Rough-in and inspection",
          "body": "Wiring, boxes and circuits roughed in and inspected before insulation."
        },
        {
          "title": "Trim-out, final and walkthrough",
          "body": "Fixtures and devices installed, everything tested, final inspection passed, and a walkthrough of your panel with you."
        }
      ]
    },
    "doneRight": {
      "heading": "What we build in",
      "intro": "",
      "points": [
        {
          "title": "Room to grow",
          "body": "Panel space and conduit where it makes sense, so future additions don't mean opening walls."
        },
        {
          "title": "A clear panel directory",
          "body": "Every circuit labeled for what it actually feeds."
        },
        {
          "title": "No corners cut",
          "body": "Full permits, full inspections, and work done to code even where nobody will see it."
        },
        {
          "title": "On the builder's schedule",
          "body": "We keep the inspections moving so we're never the reason the drywall waits."
        }
      ]
    },
    "factors": {
      "heading": "What shapes a new build",
      "items": [
        {
          "title": "Size and layout",
          "body": "Square footage and room count drive the circuit count."
        },
        {
          "title": "Lighting design",
          "body": "Recessed, accent and exterior lighting add up."
        },
        {
          "title": "Service size and utility",
          "body": "Overhead or underground, and which utility serves the lot."
        },
        {
          "title": "Extras",
          "body": "EV charging, hot tubs, shops and smart lighting controls."
        }
      ]
    },
    "prepare": [
      "Your plans (PDF is fine) and the lot address",
      "Your builder's contact and target schedule",
      "Anything you know you'll want: EV, hot tub, shop, outdoor lighting",
      "Who the utility is for the lot, if you know"
    ],
    "faqs": [
      {
        "q": "Can we bring you in if our builder already has an electrician?",
        "a": "That's between you and your builder. We're glad to bid the electrical on a custom home when the builder or owner invites us."
      },
      {
        "q": "Who handles the permit?",
        "a": "We pull the electrical permit for our work and schedule its inspections. Permits go through the City of Spokane inside the city, and usually Washington L&I elsewhere."
      }
    ],
    "related": [
      "remodel-and-addition-wiring",
      "ev-charger-installation",
      "electrical-panel-upgrades"
    ]
  },
  "service-mast-repair": {
    "image": "mast",
    "meta": {
      "title": "Service Mast Repair & Replacement in Spokane | Acorn Electric",
      "description": "Storm-bent or pulled-away service mast? We repair and replace masts, weatherheads and meter bases in Spokane and coordinate with your utility."
    },
    "h1": "Service mast repair and replacement in Spokane",
    "lede": "A windstorm, a heavy snow slide or a tree limb bent the pipe on your roof where the power lines connect. Your utility won't reconnect until a licensed electrician repairs it. We can help.",
    "problem": "A storm or a falling limb damaged where the power connects to your house.",
    "story": [
      "The service mast is the metal pipe on your roof or wall that holds up the utility's service drop and carries the wires down to your meter. The weatherhead is the cap at the top that keeps water out. The meter base is the box the meter plugs into.",
      "When the mast, weatherhead or meter base is damaged, the utility needs a licensed electrician to repair it before power can be safely restored. That's where we come in."
    ],
    "signs": {
      "heading": "Signs your mast needs attention",
      "items": [
        "The mast is bent, leaning, or pulling away from the house.",
        "The service wires sag lower than they used to, or a fitting broke.",
        "The meter base is loose, burned or damaged.",
        "Water is getting in where the mast goes through the roof.",
        "The mast is heavily rusted, or too short to clear the roof properly."
      ]
    },
    "work": {
      "heading": "What a mast repair involves",
      "intro": "Mast work is done with the utility, because it's on their side of the meter until they disconnect.",
      "steps": [
        {
          "title": "Safety first",
          "body": "If wires are down or the mast is badly damaged, stay clear and contact your utility. We plan the repair once it's safe."
        },
        {
          "title": "Assess the damage",
          "body": "We check the mast, weatherhead, meter base, service entrance conductors and roof penetration to see what's actually damaged."
        },
        {
          "title": "Permit and utility coordination",
          "body": "Mast and service entrance work needs a permit, and the utility disconnects and reconnects power. We coordinate that."
        },
        {
          "title": "Repair or replace",
          "body": "Install a properly supported mast, a new weatherhead and new conductors as needed, and flash and seal the roof penetration."
        },
        {
          "title": "Inspection and reconnect",
          "body": "The work is inspected, then the utility reconnects your service."
        }
      ]
    },
    "doneRight": {
      "heading": "Built to handle the next storm",
      "intro": "A mast takes real force from the service drop, plus snow and ice. The repair should be stronger than what failed.",
      "points": [
        {
          "title": "Proper support and height",
          "body": "Securely braced and tall enough to keep the service drop at the clearance the code and utility require."
        },
        {
          "title": "Waterproofed roof penetration",
          "body": "A correctly flashed and sealed roof boot. A leaking mast is a roof problem waiting to happen."
        },
        {
          "title": "Sealed weatherhead and meter base",
          "body": "Water is the long-term enemy of service equipment. We keep it out."
        },
        {
          "title": "Coordinated with the utility",
          "body": "So you're not left waiting between the repair and the reconnect."
        }
      ]
    },
    "factors": {
      "heading": "What affects a mast repair",
      "items": [
        {
          "title": "Extent of damage",
          "body": "A bent mast alone is different from a damaged meter base and conductors."
        },
        {
          "title": "Roof type and pitch",
          "body": "Steep or slippery roofs take more setup."
        },
        {
          "title": "Upgrade opportunity",
          "body": "If the service is old or small, a repair can be a good moment to upgrade it."
        },
        {
          "title": "Utility scheduling",
          "body": "Reconnects depend on the utility's availability, especially after big storms."
        }
      ]
    },
    "prepare": [
      "Photos of the mast, the roofline and the meter from the ground (please don't climb)",
      "Whether the power is currently on or off",
      "Whether you've already contacted your utility",
      "Whether there's any roof leak or interior water staining"
    ],
    "faqs": [
      {
        "q": "Who is responsible for the service mast, me or Avista?",
        "a": "Generally, the utility owns the overhead wires from the pole to the connection at your house, and the homeowner owns the mast, weatherhead and meter base. Damage to those parts is repaired by a licensed electrician hired by the homeowner. Check with your utility for your specific service."
      },
      {
        "q": "My mast is bent but the power is still on. Is it urgent?",
        "a": "Treat it seriously. A bent mast can put strain on the connections and let water in. Keep people and ladders away from it, and get it looked at soon. If wires are down or arcing, stay clear and call your utility right away."
      },
      {
        "q": "Does homeowner's insurance cover mast repair?",
        "a": "Storm damage often is, but policies differ. We're happy to document the damage and the repair for your claim. Check the specifics with your insurer."
      },
      {
        "q": "Does a mast repair need a permit?",
        "a": "Yes. Service entrance work needs a permit and inspection before the utility reconnects: through the City of Spokane inside the city, and usually Washington L&I elsewhere. We pull the permit."
      }
    ],
    "related": [
      "electrical-panel-upgrades",
      "electrical-inspections"
    ]
  }
};

export const services: Service[] = serviceIndex.map((s) => {
  const detail = details[s.slug];
  if (!detail) throw new Error(`Missing service content: ${s.slug}`);
  return { ...s, ...detail };
});

const visible = new Set(publishedServiceIndex.map((s) => s.slug));
export const publishedServices = services.filter((s) => visible.has(s.slug));
export const serviceGroups = serviceGroupDefs.map((g) => ({
  ...g, services: publishedServices.filter((s) => g.slugs.includes(s.slug)),
}));

{
  const slugs = new Set(services.map((s) => s.slug));
  const grouped = serviceGroupDefs.flatMap((g) => g.slugs);
  if (slugs.size !== services.length || Object.keys(details).length !== slugs.size) throw new Error("Service catalog mismatch");
  if (grouped.length !== slugs.size || new Set(grouped).size !== grouped.length || grouped.some((slug) => !slugs.has(slug))) {
    throw new Error("Every service must belong to exactly one service group");
  }
  for (const s of services) {
    if (s.related.some((slug) => !slugs.has(slug) || slug === s.slug)) throw new Error(`Invalid related service on ${s.slug}`);
    if (s.name.length > 80) throw new Error(`Service name exceeds form limit: ${s.slug}`);
  }
}

export function getService(slug: string) {
  return publishedServices.find((s) => s.slug === slug);
}
