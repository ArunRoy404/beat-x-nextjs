import { userTrendingAssets } from "./userTrendingAssets"
import { userHomeAssets } from "./userHomeAssets"
import { videos } from "./userWatchData"

export const trendingHeroSlides = [
  {
    id: "cyberpunk-dreams",
    rank: "#1 Worldwide",
    title: "Cyberpunk Dreams: The Orchestral Cut",
    description: "Experience the chart-topping cinematic journey that redefined modern production. Over 45 million streams this week.",
    background: userTrendingAssets.hero,
  },
  {
    id: "deadline-studio-sessions",
    rank: "#2 Worldwide",
    title: "Deadline Studio: The Sessions Vol. 1",
    description: "A single continuous take at the iconic Prism Studios — the multi-platinum visual album everyone's talking about.",
    background: "/watch/images/hero-deadline-studio.jpg",
  },
  {
    id: "bhalo-thake-mon-live",
    rank: "#3 Worldwide",
    title: "Bhalo Thake Mon: The Live Cut",
    description: "Fahim Islam and Nabila Rahnum's viral duet, now trending across every chart on the platform.",
    background: "/watch/images/player-hero-bhalo-thake-mon.jpg",
  },
]

export const hotAlbums = [
  { id: "neon-pulse", rank: "#1", title: "Neon Pulse", subtitle: "The Architect", art: userTrendingAssets.albums.neonPulse },
  { id: "subterranean", rank: "#2", title: "Subterranean", subtitle: "Vela Nova", art: userTrendingAssets.albums.subterranean },
  { id: "frequency-x", rank: "#3", title: "Frequency X", subtitle: "Echo System", art: userTrendingAssets.albums.frequencyX },
  { id: "rewired", rank: "#4", title: "Rewired", subtitle: "Circuit Theory", art: userHomeAssets.photos.albumArt2 },
  { id: "deadline-mix", rank: "#5", title: "Deadline Mix", subtitle: "Minimalist", art: userHomeAssets.photos.albumArt4 },
]

export const recentSearches = [
  {
    id: "midnight-protocol",
    rank: "01",
    title: "Midnight Protocol",
    subtitle: "Data Stream",
    thumbnail: userTrendingAssets.recentSearches.midnightProtocol,
    trend: "up",
  },
  {
    id: "void-walker",
    rank: "02",
    title: "Void Walker",
    subtitle: "Lumina",
    thumbnail: userTrendingAssets.recentSearches.voidWalker,
    trend: "up",
  },
  {
    id: "atmospheric-drift",
    rank: "03",
    title: "Atmospheric Drift",
    subtitle: "Nebula",
    thumbnail: null,
    trend: "down",
  },
]

export const trendingVideos = videos

export const globalTop50 = {
  playlistOfTheWeek: {
    title: "Playlist of the Week",
    subtitle: "Global Viral Hits",
    cta: "Stream Global",
    background: userTrendingAssets.playlistOfTheWeek,
  },
  chart: [
    { id: "system-overload", rank: "#1", title: "System Overload", subtitle: "Cyberia", art: userTrendingAssets.albums.neonPulse },
    { id: "deep-horizon", rank: "#2", title: "Deep Horizon", subtitle: "Echoes of Sol", art: userTrendingAssets.albums.subterranean },
    { id: "frequency-x-global", rank: "#3", title: "Frequency X", subtitle: "Echo System", art: userTrendingAssets.albums.frequencyX },
    { id: "rewired-global", rank: "#4", title: "Rewired", subtitle: "Circuit Theory", art: userHomeAssets.photos.albumArt2 },
    { id: "deadline-mix-global", rank: "#5", title: "Deadline Mix", subtitle: "Minimalist", art: userHomeAssets.photos.albumArt4 },
  ],
}
