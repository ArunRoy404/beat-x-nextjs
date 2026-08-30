import { userAlbumsAssets } from "./userAlbumsAssets"

export const albumsSummary = {
  totalCollection: 124,
  recentAdditions: 3,
}

export const recentlyPlayedAlbums = [
  { id: "rp-1", title: "Neon Pulse", subtitle: "The Architect", meta: "2023", art: userAlbumsAssets.recentlyPlayed.neonPulse },
  { id: "rp-2", title: "Subterranean", subtitle: "Vela Nova", meta: "2023", art: userAlbumsAssets.recentlyPlayed.subterranean },
  { id: "rp-3", title: "Live from Sector 7", subtitle: "The Synthesizers", meta: "2022", art: userAlbumsAssets.recentlyPlayed.liveFromSector7 },
  { id: "rp-4", title: "Circuit Breaker", subtitle: "Binary Pulse", meta: "2024", art: userAlbumsAssets.recentlyPlayed.circuitBreaker },
]

export const featuredFavoriteAlbum = {
  id: "fav-featured",
  badge: "MOST PLAYED",
  title: "Astro Dreams",
  subtitle: "Luna Ray",
  meta: "2023",
  art: userAlbumsAssets.favorites.astroDreams,
}

export const favoriteAlbums = [
  { id: "fav-1", title: "Prism Shift", subtitle: "Spectrum", art: userAlbumsAssets.favorites.prismShift },
  { id: "fav-2", title: "Velocity", subtitle: "Fast Track", art: userAlbumsAssets.favorites.velocity },
  { id: "fav-3", title: "Midnight Drive", subtitle: "The Glitch", art: userAlbumsAssets.favorites.midnightDrive },
  { id: "fav-4", title: "Blue Notes", subtitle: "Jazz Fusion", art: userAlbumsAssets.favorites.blueNotes },
]
