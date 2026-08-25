import { userTicketsAssets } from "./userTicketsAssets"

export const ticketsHero = {
  badge: "LIVE NOW",
  title: "NEON PULSE: THE\nWORLD TOUR",
  location: "O2 Arena, London",
  dates: "Oct 24 - Oct 26",
  artwork: userTicketsAssets.hero,
}

export const ticketPromos = [
  { id: "cyber-rhythm-festival", tag: "ELECTRONIC", title: "Cyber Rhythm Festival", cta: "BOOK SESSION", art: userTicketsAssets.promos.cyberRhythm },
  { id: "midnight-jazz-sessions", tag: "SOUL & JAZZ", title: "Midnight Jazz\nSessions", cta: "RESERVE TABLE", art: userTicketsAssets.promos.midnightJazz },
]

export const sonicHubCities = ["Dhaka", "C.T.G", "Comilla"]

export const sonicHubs = [
  { id: "hatirjhil", name: "HATIRJHIL", city: "Dhaka", events: "12 EVENTS", art: userTicketsAssets.hubs.hatirjhil },
  { id: "gc-more", name: "GC MORE", city: "C.T.G", events: "12 EVENTS", art: userTicketsAssets.hubs.gcMore },
  { id: "comilla-university", name: "Comilla University", city: "COMILLA", events: "24 EVENTS", art: userTicketsAssets.hubs.comillaUniversity },
  { id: "coxs-bazar", name: "Cox-bazar", city: "C.T.G", events: "15 EVENTS", art: userTicketsAssets.hubs.coxsBazar },
  { id: "ali-amjads-clock", name: "Ali Amjad's Clock", city: "Sylhet", events: "31 EVENTS", art: userTicketsAssets.hubs.aliAmjadsClock },
]

export const virtualDimensions = {
  eyebrow: "VIRTUAL DIMENSIONS",
  titleLine1: "THE CONCERT IS",
  titleLine2Prefix: "WHEREVER ",
  titleLine2Highlight: "YOU ARE.",
  description:
    "Experience high-fidelity 8K VR streams with spatial audio. No travel, no queues, just pure immersion in the front row of the world's biggest stages.",
  stats: [
    { value: "360°", label: "VISUAL FIELD" },
    { value: "ATMOS", label: "SPATIAL AUDIO" },
  ],
  cta: "ENTER DIMENSION",
  artwork: userTicketsAssets.vrImmersion,
}

export const trendingEvents = [
  { id: "synth-summer-24", title: "Synth Summer'24", location: "Ibiza, Spain • July 15", price: "৳129.00", badge: "SOLD OUT", art: userTicketsAssets.events.synthSummer },
  { id: "frequency-zero", title: "Frequency Zero", location: "Stockholm, SE • Aug 02", price: "৳85.00", art: userTicketsAssets.events.frequencyZero },
  { id: "echoes-in-the-dark", title: "Echoes in the Dark", location: "Chicago, USA • Sept 12", price: "৳150.00", badge: "TRENDING", art: userTicketsAssets.events.echoesInTheDark },
  { id: "glitch-society-live", title: "Glitch Society Live", location: "Seoul, Korea • Oct 30", price: "৳110.00", art: userTicketsAssets.events.glitchSociety },
]
