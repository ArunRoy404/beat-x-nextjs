export const albumsStatsCards = [
  {
    id: 1,
    title: "My Albums",
    value: "1",
    icon: "Folder",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)"
  },
  {
    id: 2,
    title: "Published",
    value: "1",
    icon: "CheckCircle",
    iconColor: "#34C759",
    iconBg: "rgba(52, 199, 89, 0.15)"
  },
  {
    id: 3,
    title: "Total Tracks",
    value: "6",
    icon: "Music",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)"
  },
  {
    id: 4,
    title: "Total Streams",
    value: "12.4M",
    icon: "Activity",
    iconColor: "#E5F97D",
    iconBg: "rgba(229, 249, 125, 0.15)"
  }
]

export const albumsList = [
  {
    id: 1,
    name: "Asha",
    artist: "Tahsin",
    genre: "Pop",
    status: "Published",
    tracksCount: 5,
    duration: "38 min",
    streams: 12400000,
    released: "2024-02-01",
    description: "TAHSIN's debut studio album exploring themes of hope and longing through modern Bangla pop. Recorded over 18 months in Dhaka and Mumbai.",
    avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150",
    tracksList: [
      { id: 101, title: "Tumi Onek Dami", duration: "4:20", joined: "2026-01-24", status: "Published" },
      { id: 102, title: "Amar Hote Hote", duration: "3:58", joined: "2026-01-24", status: "Published" },
      { id: 103, title: "Neon Horizon", duration: "4:20", joined: "2026-01-24", status: "Published" }
    ]
  },
  {
    id: 2,
    name: "Aura",
    artist: "Jishan",
    genre: "Hip Hop",
    status: "Under Review",
    tracksCount: 8,
    duration: "28 min",
    streams: 450000,
    released: "2026-02-15",
    description: "A deep dive into street culture and hard hitting drums, capturing urban environments and modern stories.",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=150",
    tracksList: [
      { id: 201, title: "Midnight Ride", duration: "3:10", joined: "2026-02-10", status: "Published" },
      { id: 202, title: "Concrete Jungle", duration: "3:45", joined: "2026-02-12", status: "Published" }
    ]
  },
  {
    id: 3,
    name: "Melancholy",
    artist: "Fahim",
    genre: "Rock",
    status: "Scheduled",
    tracksCount: 10,
    duration: "45 min",
    streams: 0,
    released: "2026-08-01",
    description: "Classic progressive rock vibes combining rich storytelling with ambient synths and melodic guitar solos.",
    avatar: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=150",
    tracksList: [
      { id: 301, title: "Shattered Glass", duration: "5:12", joined: "2026-03-01", status: "Scheduled" }
    ]
  },
  {
    id: 4,
    name: "Ethereal",
    artist: "Nabila",
    genre: "Electronic",
    status: "Rejected",
    tracksCount: 6,
    duration: "32 min",
    streams: 12000,
    released: "2025-12-10",
    description: "Ambient and chill electronic tracks designed for deep work, relaxation, or introspection.",
    avatar: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=150",
    tracksList: [
      { id: 401, title: "Starlight Glow", duration: "4:05", joined: "2025-11-20", status: "Rejected" }
    ]
  }
]
