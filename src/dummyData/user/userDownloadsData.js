import { userDownloadsAssets } from "./userDownloadsAssets"

export const storageUsage = {
  usedGB: 42.5,
  totalGB: 128,
  usedPercent: 33,
  breakdown: [
    { id: "audio", label: "AUDIO (28GB)", color: "var(--secondary)" },
    { id: "videos", label: "VIDEOS (14GB)", color: "var(--primary)" },
  ],
}

export const recommendedDownload = {
  badge: "RECOMMENDED DOWNLOAD",
  title: "The Audio Odyssey (Live)",
  subtitle: "Full 4K Video Concert",
  meta: "4.2 GB",
}

export const downloadsFilters = ["All", "Tracks", "Albums", "Podcasts"]

export const downloadedItems = [
  {
    id: "dl-1",
    title: "Neon Horizon",
    artist: "Solar Echoes",
    type: "Single",
    format: "FLAC 24-bit",
    formatTone: "secondary",
    size: "48.2 MB",
    status: "done",
    art: userDownloadsAssets.tracks.neonHorizon,
  },
  {
    id: "dl-2",
    title: "The Deep Narrative",
    artist: "Future Minds",
    type: "Podcast",
    format: "MP3 320kbps",
    formatTone: "neutral",
    size: "112.5 MB",
    status: "downloading",
    progress: 65,
    art: userDownloadsAssets.tracks.theDeepNarrative,
  },
  {
    id: "dl-3",
    title: "Vanta Black Dreams",
    artist: "Obsidian Aura",
    type: "Album",
    format: "FLAC 24-bit",
    formatTone: "secondary",
    size: "892.1 MB",
    status: "done",
    art: userDownloadsAssets.tracks.vantaBlackDreams,
  },
]

export const smartDownloads = {
  title: "Smart Downloads",
  description: "Automatically download your most played tracks to stay ahead of the rhythm.",
  ctaLabel: "Configure Settings",
}
