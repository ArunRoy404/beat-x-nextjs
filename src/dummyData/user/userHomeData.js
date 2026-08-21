import { userHomeAssets } from "./userHomeAssets"

export const heroContent = [
  {
    id: "hero-1",
    title: "Cyber Dreams",
    subtitle: "By Fahim Islam",
    badges: ["TRENDING NOW", "NEW RELEASE"],
    artwork: userHomeAssets.photos.heroCyberDreams,
  },
  {
    id: "hero-2",
    title: "Bhalo Thake Mon",
    subtitle: "By Fahim Islam",
    badges: ["FEATURED MIX", "POPULAR NOW"],
    artwork: userHomeAssets.photos.mixOverlay1,
  },
  {
    id: "hero-3",
    title: "Ami Tor Mayay",
    subtitle: "By Mahtim Sakib",
    badges: ["RECOMMENDED", "TOP GENRE"],
    artwork: userHomeAssets.photos.mixOverlay2,
  },
  {
    id: "hero-4",
    title: "Sonic Playground",
    subtitle: "By BeatX Curation",
    badges: ["CURATED FOR YOU", "NEW ATMOSPHERE"],
    artwork: userHomeAssets.photos.mixOverlay3,
  }
]

export const mixes = [
  { id: "mix-1", title: "Bhalo Thake Mon", subtitle: "By Fahim Islam", art: userHomeAssets.photos.mixOverlay1 },
  { id: "mix-2", title: "Ami Tor Mayay", subtitle: "By Mahtim Sakib", art: userHomeAssets.photos.mixOverlay2 },
  { id: "mix-3", title: "O Meye", subtitle: "By Jisan Khan Shuvo", art: userHomeAssets.photos.mixOverlay3 },
  { id: "mix-4", title: "Tor Lagiya", subtitle: "By Samz Vai", art: userHomeAssets.photos.mixOverlay4 },
  { id: "mix-5", title: "Rewired Mix", subtitle: "By Circuit Theory", art: userHomeAssets.photos.albumArt2 },
  { id: "mix-6", title: "Deadline Curation", subtitle: "By BeatX Curation", art: userHomeAssets.photos.albumArt4 },
]

export const newReleases = [
  { id: "release-1", title: "Amajoniya", subtitle: "James Rollins", tag: "E-book", tagColor: "primary", art: userHomeAssets.photos.albumArt1 },
  { id: "release-2", title: "Rewired", subtitle: "Circuit Theory", tag: "ALBUM", tagColor: "secondary", art: userHomeAssets.photos.albumArt2 },
  { id: "release-3", title: "Ridy Sheikh", subtitle: "Internet personality", tag: "Podcast", tagColor: "primary", art: userHomeAssets.photos.albumArt3 },
  { id: "release-4", title: "Deadline Mix", subtitle: "Minimalist", tag: "ALBUM", tagColor: "secondary", art: userHomeAssets.photos.albumArt4 },
]

export const recommendedArtists = [
  { id: "artist-1", name: "Fahim Islam", subtitle: "Hay Dj • 4.2M Singer", art: userHomeAssets.photos.albumArt5 },
  { id: "artist-2", name: "Tasrif Khan", subtitle: "Ambient • 890K Singer", art: userHomeAssets.photos.albumArt6 },
  { id: "artist-3", name: "Tahsan Rahman Khan", subtitle: "Techno • 2.5M Singer", art: userHomeAssets.photos.albumArt7 },
]

export const dailyRadar = {
  title: "Sonic Prism Mix",
  description: "Based on your recent listens to Lorn and Moderat.",
  cta: "Start Listening",
}
