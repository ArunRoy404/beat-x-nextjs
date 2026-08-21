import { userHomeAssets } from "./userHomeAssets"
import { userWatchAssets } from "./userWatchAssets"

export const videoCategories = ["All Videos", "Music Videos", "Live Sessions", "Behind the Scenes", "Interviews", "Jazz"]

export const watchHero = {
  id: "deadline-studio-sessions-1",
  badge: "FEATURED PREMIERE",
  title: "Deadline Studio: The Studio Sessions-1",
  description:
    "Experience the multi-platinum artist's latest visual album, captured in a single continuous take at the iconic Prism Studios.",
  artwork: userWatchAssets.hero,
}

export const liveNow = {
  viewersLabel: "128K WATCHING",
  streams: [
    {
      id: "midnight-pulse-world-tour",
      viewers: "42.5K viewers",
      title: "Midnight Pulse: World Tour",
      subtitle: "Luna Ray • Electronic",
      background: userWatchAssets.live.live1Bg,
      avatar: userWatchAssets.live.live1Avatar,
    },
    {
      id: "acoustic-sunsets-live",
      viewers: "12K viewers",
      title: "Acoustic Sunsets: Live from",
      subtitle: "The Wildwood Folk • Indie",
      background: userWatchAssets.live.live2Bg,
      avatar: userWatchAssets.live.live2Avatar,
    },
    {
      id: "velvet-jazz-hour",
      viewers: "8.4K viewers",
      title: "Velvet Jazz Hour with Sarah",
      subtitle: "Sarah Jo • Jazz/Soul",
      background: userWatchAssets.live.live3Bg,
      avatar: userWatchAssets.live.live3Avatar,
    },
  ],
}

export const videos = [
  {
    id: "lock-downer-dingulo",
    size: "tall",
    title: "Lock Downer Dingulo",
    channel: "Deadline Drama",
    views: "1.2M views",
    postedAgo: "2 days ago",
    duration: "04:12",
    thumbnail: userWatchAssets.trending.trend1,
    description: "A full-length drama feature from Deadline Drama, exploring love and family across a single festival night.",
    hashtags: ["#DeadlineDrama", "#FullDrama"],
  },
  {
    id: "sonar-horin",
    size: "short",
    title: "Sonar Horin",
    channel: "Deadline Entertainment",
    views: "850K views",
    postedAgo: "1 week ago",
    duration: "12:45",
    thumbnail: userWatchAssets.trending.trend2,
    description: "Deadline Entertainment presents a folk drama following a family's journey through rural Bangladesh.",
    hashtags: ["#DeadlineEntertainment", "#FullNatok"],
  },
  {
    id: "mittha-premer-sotti-golpo",
    size: "tall",
    title: "Mittha Premer Sotti Golpo",
    channel: "Deadline Drama",
    views: "1.2M views",
    postedAgo: "2 days ago",
    duration: "03:58",
    thumbnail: userWatchAssets.trending.trend3,
    description: "A romantic drama from Deadline Drama about two strangers whose lives intertwine over one summer.",
    hashtags: ["#DeadlineDrama", "#FullNatok"],
  },
  {
    id: "mister-cotton",
    size: "short",
    title: "Mister Cotton",
    channel: "Deadline Entertainment",
    views: "850K views",
    postedAgo: "1 week ago",
    duration: "06:20",
    thumbnail: userWatchAssets.trending.trend4,
    description: "A slice-of-life comedy-drama from Deadline Entertainment following an eccentric small-town tailor.",
    hashtags: ["#DeadlineEntertainment"],
  },
  {
    id: "tor-lagiya-samz-vai",
    size: "tall",
    title: "Tor Lagiya by Samz Vai: Official Music Video",
    channel: "Deadline Music",
    views: "1.2M views",
    postedAgo: "2 days ago",
    duration: "04:12",
    thumbnail: userWatchAssets.trending.trend5,
    description: "Official music video for Tor Lagiya, performed by Samz Vai and released under Deadline Music.",
    hashtags: ["#SamzVai", "#DeadlineMusic"],
  },
  {
    id: "bhalo-thake-mon-fahim",
    size: "short",
    title: "Valo Thake Mon by Fahim Music Video",
    channel: "Deadline Music",
    views: "850K views",
    postedAgo: "1 week ago",
    duration: "12:45",
    thumbnail: userWatchAssets.trending.trend6,
    heroImage: userWatchAssets.playerHero,
    titleBn: "ভালো থাকে মন - Bhalo Thake Mon By Fahim",
    trending: true,
    premieredAgo: "Premiered 2 hours ago",
    descriptionTitle: "ভালো থাকে মন - Bhalo Thake Mon | Apurba | Mehazabien | Fahim Islam | Nabila Rahnum | New Song 2026",
    description:
      "Song: Bhalo Thake Mon (ভালো থাকে মন), Singer: Fahim Islam & Nabila Rahnum\nLyricist: Robiul Islam Jibon, Composer (Tune): Naved Parvez\nMusic Arrangement: Naved Parvez\nStarring: Ziaul Faruq Apurba & Mehazabien Chowdhury\nEdit & Color: Siam Mahmud\nLabel: Deadline Music\nYear: 2026",
    hashtags: ["#FahimIslam", "#BhaloThakeMon", "#Nabilarahnum"],
  },
]

export const upNextVideos = [
  { id: "bhalo-thake-mon-fahim", title: "Valo Thake Mon: Music Video", channel: "Deadline Music", views: "120K VIEWS", postedAgo: "3 DAYS AGO", duration: "03:42", thumbnail: userWatchAssets.upNext.upNext1 },
  { id: "tor-lagiya-samz-vai", title: "Music Video By Samz Vai", channel: "Deadline Music", views: "85K VIEWS", postedAgo: "1 WEEK AGO", duration: "15:20", thumbnail: userWatchAssets.upNext.upNext2 },
  { id: "deadline-hit-jukebox", title: "Deadline Hit Music: Jukebox", channel: "Deadline Music", views: "42K VIEWS", postedAgo: "5 HOURS AGO", duration: "08:12", thumbnail: userWatchAssets.upNext.upNext3 },
  { id: "mister-cotton", title: "Mister Cotton : 2024…", channel: "Deadline Music", views: "1.1M VIEWS", postedAgo: "2 WEEKS AGO", duration: "05:55", thumbnail: userWatchAssets.upNext.upNext4 },
  { id: "mittha-premer-sotti-golpo", title: "Mittha Premer\nSotti Golpo", channel: "Deadline Music", views: "310K VIEWS", postedAgo: "1 MONTH AGO", duration: "08:12", thumbnail: userWatchAssets.upNext.upNext5 },
]

export const queueMiniItem = {
  title: "Notun Diner Music",
  subtitle: "Lumina Synthesis",
  thumbnail: userWatchAssets.queueMiniThumb,
}

export const upcomingReminders = [
  {
    id: "glitch-heart-final-cut",
    tag: "PREMIERE",
    tagVariant: "primary",
    time: "IN 4 HOURS",
    title: "Glitch Heart: Final Cut",
    subtitle: "Synthetica",
    cta: "Set Reminder",
    ctaVariant: "primary",
    glow: true,
  },
  {
    id: "unplugged-sessions-vol-4",
    tag: "LIVESTREAM",
    tagVariant: "secondary",
    time: "TOMORROW 8PM",
    title: "Unplugged Sessions:\nVolume 4",
    subtitle: "River & Pine",
    cta: "Get Tickets",
    ctaVariant: "secondary",
  },
  {
    id: "masterclass-analog-sound-design",
    tag: "EXCLUSIVE",
    tagVariant: "lime",
    time: "FRI 12PM",
    title: "Masterclass: Analog\nSound Design",
    subtitle: "Master K",
    cta: "Notify Me",
    ctaVariant: "solid",
  },
]

export const weeklyTopCharts = [
  { rank: "01", title: "Thunder & Rain", subtitle: "The Storm Riders", trend: "up" },
  { rank: "02", title: "Midnight City Lights", subtitle: "RetroWave King", trend: "up" },
  { rank: "03", title: "Ocean Floor", subtitle: "Deep Dive", trend: "down" },
]

export const proFeaturePromo = {
  tag: "PRO FEATURE",
  title: "Unlock High Fidelity Audio",
  description: "Upgrade to Prism Pro for lossless audio and spatial 3D mastering on every video.",
  cta: "Learn more",
}

export const findVideoById = (id) => {
  const fullVideo = videos.find((video) => video.id === id)
  if (fullVideo) return fullVideo

  const liveStream = liveNow.streams.find((stream) => stream.id === id)
  if (liveStream) {
    return {
      id: liveStream.id,
      title: liveStream.title,
      thumbnail: liveStream.background,
      heroImage: liveStream.background,
      views: liveStream.viewers,
      postedAgo: "Live now",
      description: `${liveStream.subtitle} — currently streaming live.`,
      hashtags: [],
    }
  }

  const upNextVideo = upNextVideos.find((video) => video.id === id)
  if (upNextVideo) {
    return {
      id: upNextVideo.id,
      title: upNextVideo.title,
      thumbnail: upNextVideo.thumbnail,
      heroImage: upNextVideo.thumbnail,
      views: upNextVideo.views,
      postedAgo: upNextVideo.postedAgo,
      description: `${upNextVideo.channel} • ${upNextVideo.views} • ${upNextVideo.postedAgo}`,
      hashtags: [],
    }
  }

  return undefined
}
