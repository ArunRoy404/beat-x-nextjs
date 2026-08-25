import { userPodcastsAssets } from "./userPodcastsAssets"

export const podcastHero = {
  badge: "FEATURED",
  meta: "Episode 142 • New Today",
  titleLine1: "DEADLINE",
  titleLine2: "ADDA",
  description: "Dive into the Tranding Tiktok Fild with guest Nafaisa Nisha. Exploring how New Topic",
  artwork: userPodcastsAssets.hero,
}

export const podcastVibes = [
  { id: "true-crime", title: "TRUE CRIME", subtitle: "1,402 SHOWS", art: userPodcastsAssets.vibes.trueCrime, size: "wide" },
  { id: "tech", title: "TECH", subtitle: "840 SHOWS", art: userPodcastsAssets.vibes.tech, size: "wide" },
  { id: "comedy", title: "COMEDY", art: null, size: "tall" },
]

export const trendingRefractions = [
  { id: "the-quantum-echo", rank: "01", title: "The Quantum Echo", channel: "Frequency Labs", duration: "48 min", art: userPodcastsAssets.trending.trending1 },
  { id: "backstage-pass-after-hours", rank: "02", title: "Backstage Pass: After Hours", channel: "Sonic Media", duration: "1h 12 min", art: userPodcastsAssets.trending.trending2 },
  { id: "global-pulse-weekly-recap", rank: "03", title: "Global Pulse: Weekly Re-Cap", channel: "The Modernist", duration: "35 min", art: userPodcastsAssets.trending.trending3 },
  { id: "neon-static-nightcast", rank: "04", title: "Neon Static: Nightcast", channel: "Frequency Labs", duration: "52 min", art: userPodcastsAssets.trending.trending1 },
  { id: "the-mixdown-debrief", rank: "05", title: "The Mixdown Debrief", channel: "Sonic Media", duration: "39 min", art: userPodcastsAssets.trending.trending2 },
  { id: "offbeat-city-diaries", rank: "06", title: "Offbeat: City Diaries", channel: "The Modernist", duration: "58 min", art: userPodcastsAssets.trending.trending3 },
  { id: "signal-drop-weekly", rank: "07", title: "Signal Drop Weekly", channel: "Frequency Labs", duration: "44 min", art: userPodcastsAssets.trending.trending1 },
  { id: "afterparty-unfiltered", rank: "08", title: "Afterparty: Unfiltered", channel: "Sonic Media", duration: "1h 05 min", art: userPodcastsAssets.trending.trending2 },
  { id: "the-loop-closing-set", rank: "09", title: "The Loop: Closing Set", channel: "The Modernist", duration: "41 min", art: userPodcastsAssets.trending.trending3 },
]
