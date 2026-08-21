import { userLibraryAssets } from "./userLibraryAssets"

export const likedSongsHero = {
  badge: "PERSONAL COLLECTION",
  title: "Liked Songs",
  description: "Your personal sonic history. 1,428 tracks that defined your journey through the soundscape.",
}

export const sonicReplay = {
  badge: "Weekly Update",
  title: "Sonic Replay",
  subtitle: "Based on your recent listening",
}

export const discoveryPrism = {
  title: "Discovery Prism",
  subtitle: "Expand your library horizons",
}

export const playlists = [
  { id: "playlist-1", title: "Hyper-Focus", subtitle: "Industrial Ambient & Glitch", art: userLibraryAssets.playlists.hyperFocus },
  { id: "playlist-2", title: "Neon Noir", subtitle: "Dark Jazz & Rainy Sax", art: userLibraryAssets.playlists.neonNoir },
  { id: "playlist-3", title: "Hyper-Focus", subtitle: "80s Retro-futurism", art: userLibraryAssets.playlists.retro80s },
  { id: "playlist-4", title: "Deep Silence", subtitle: "Meditation & White Noise", art: userLibraryAssets.playlists.deepSilence },
  { id: "playlist-5", title: "Organic Flow", subtitle: "Indie Folk & Soul", art: userLibraryAssets.playlists.organicFlow },
]

export const topArtists = [
  { id: "artist-1", name: "Elena Vost", subtitle: "12 Albums • Electronic", avatar: userLibraryAssets.artists.elenaVost, verified: true },
  { id: "artist-2", name: "Ghost Signal", subtitle: "5 Albums • Techno", avatar: userLibraryAssets.artists.ghostSignal, verified: true },
  { id: "artist-3", name: "The Prismatics", subtitle: "8 Albums • Funk", avatar: userLibraryAssets.artists.thePrismatics, verified: true },
]

export const recentAlbums = [
  { id: "album-1", title: "Quantum Drift", artist: "The Prismatics", released: "Oct 2023", tracks: "14 tracks", art: userLibraryAssets.artists.ghostSignal },
  { id: "album-2", title: "Silence Is Gold", artist: "Ghost Signal", released: "Aug 2023", tracks: "9 tracks", art: userLibraryAssets.albums.silenceIsGold },
  { id: "album-3", title: "Solaris Dreams", artist: "Elena Vost", released: "May 2023", tracks: "12 tracks", art: userLibraryAssets.albums.solarisDreams },
]
