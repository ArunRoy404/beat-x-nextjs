import { userExploreAssets } from "./userExploreAssets"

export const genreFilters = [
  "Poppular",
  "Pop Punk",
  "Romance",
  "Pop",
  "Reggae",
  "Viral",
  "Soft",
  "Indie",
  "Rock",
  "Melode",
  "Hip Hop",
  "Jazz",
]

export const exploreHero = {
  badge: "TRENDING GENRE",
  titleLine1: "RETRO",
  titleLine2: "SYNTHWAVE",
  description: "The pulse of the 80s reimagined for the future. Dive into the neon-soaked sounds of modern synthesis.",
  artwork: userExploreAssets.hero,
}

export const genres = [
  { id: "synthwave", title: "Synthwave", subtitle: "8.4M Monthly Listeners", art: userExploreAssets.genres.synthwave },
  { id: "cyber-pop", title: "Cyber-Pop", subtitle: "12.1M Monthly Listeners", art: userExploreAssets.genres.cyberPop },
  { id: "dark-techno", title: "Dark Techno", subtitle: "5.2M Monthly Listeners", art: userExploreAssets.genres.darkTechno },
  { id: "lo-fi-future", title: "Lo-Fi Future", subtitle: "18.9M Monthly Listeners", art: userExploreAssets.genres.loFiFuture },
  { id: "glitch-hop", title: "Glitch Hop", subtitle: "3.4M Monthly Listeners", art: userExploreAssets.genres.glitchHop },
  { id: "ambient-void", title: "Ambient Void", subtitle: "6.7M Monthly Listeners", art: userExploreAssets.genres.ambientVoid },
]

export const recentSearches = [
  { id: "search-1", type: "cluster", title: "Hyper-Vocal", subtitle: "Artist Cluster" },
  { id: "search-2", type: "single", title: "Osru", subtitle: "Singles • Deadline Music", art: userExploreAssets.recentSearchAlbum },
  { id: "search-3", type: "playlist", title: "Late Night Chill", subtitle: "Playlist Search" },
]

export const liveSessions = [
  { id: "live-1", status: "LIVE", title: "Mina K - Analog Set", subtitle: "24.5k watching", avatar: userExploreAssets.liveSessions.minaK },
  { id: "live-2", status: "SOON", title: "Ghost Circuit VR", subtitle: "Starts in 2h", avatar: userExploreAssets.liveSessions.ghostCircuit },
]
