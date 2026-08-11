const buildStatsCards = ({ streams, streamsChange, listeners, listenersChange, followersGrowth, followersChange, listenTime, listenTimeChange }) => [
  {
    id: 1,
    title: "Total Streams",
    value: streams,
    change: `${streamsChange}%`,
    isPositive: true,
    icon: "Headphones",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)"
  },
  {
    id: 2,
    title: "Monthly Listeners",
    value: listeners,
    change: `${listenersChange}%`,
    isPositive: true,
    icon: "Radio",
    iconColor: "#34C759",
    iconBg: "rgba(52, 199, 89, 0.15)"
  },
  {
    id: 3,
    title: "Followers Growth",
    value: `+${followersGrowth}`,
    change: `${followersChange}%`,
    isPositive: true,
    icon: "TrendingUp",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)"
  },
  {
    id: 4,
    title: "Avg Listen Time",
    value: listenTime,
    change: `${listenTimeChange}%`,
    isPositive: true,
    icon: "Clock",
    iconColor: "#FFAE00",
    iconBg: "rgba(254, 174, 0, 0.15)"
  }
]

export const statsCardsByPeriod = {
  "7D": buildStatsCards({ streams: "720K", streamsChange: 6, listeners: "180K", listenersChange: 4, followersGrowth: "980", followersChange: 5, listenTime: "36h 50m", listenTimeChange: 3 }),
  "30D": buildStatsCards({ streams: "3.1M", streamsChange: 10, listeners: "520K", listenersChange: 8, followersGrowth: "3.4k", followersChange: 7, listenTime: "39h 15m", listenTimeChange: 9 }),
  "3M": buildStatsCards({ streams: "7.8M", streamsChange: 14, listeners: "890K", listenersChange: 16, followersGrowth: "5.9k", followersChange: 9, listenTime: "40h 55m", listenTimeChange: 12 }),
  "6M": buildStatsCards({ streams: "12.4M", streamsChange: 18, listeners: "1.2M", listenersChange: 24, followersGrowth: "8.3k", followersChange: 12, listenTime: "42h 24m", listenTimeChange: 24 }),
  "1Y": buildStatsCards({ streams: "22.6M", streamsChange: 22, listeners: "1.9M", listenersChange: 28, followersGrowth: "15.2k", followersChange: 16, listenTime: "45h 10m", listenTimeChange: 20 })
}

export const growthOverviewStreamDataByRange = {
  "7D": [
    { name: "Mon", a: 10, b: 20 },
    { name: "Tue", a: 18, b: 45 },
    { name: "Wed", a: 14, b: 35 },
    { name: "Thu", a: 22, b: 60 },
    { name: "Fri", a: 19, b: 55 },
    { name: "Sat", a: 26, b: 80 },
    { name: "Sun", a: 32, b: 95 }
  ],
  "30D": [
    { name: "Wk 1", a: 20, b: 45 },
    { name: "Wk 2", a: 35, b: 90 },
    { name: "Wk 3", a: 28, b: 110 },
    { name: "Wk 4", a: 48, b: 160 }
  ],
  "3M": [
    { name: "Jun", a: 20, b: 40 },
    { name: "Jul", a: 55, b: 130 },
    { name: "Aug", a: 45, b: 100 },
    { name: "Sep", a: 70, b: 150 },
    { name: "Oct", a: 60, b: 130 },
    { name: "Nov", a: 90, b: 180 },
    { name: "Dec", a: 130, b: 260 }
  ]
}

export const growthOverviewContentDataByRange = {
  "7D": [
    { name: "Mon", a: 8, b: 18 },
    { name: "Tue", a: 16, b: 40 },
    { name: "Wed", a: 12, b: 32 },
    { name: "Thu", a: 20, b: 58 },
    { name: "Fri", a: 17, b: 50 },
    { name: "Sat", a: 24, b: 75 },
    { name: "Sun", a: 30, b: 92 }
  ],
  "30D": [
    { name: "Wk 1", a: 18, b: 42 },
    { name: "Wk 2", a: 32, b: 85 },
    { name: "Wk 3", a: 26, b: 105 },
    { name: "Wk 4", a: 45, b: 155 }
  ],
  "3M": [
    { name: "Jun", a: 18, b: 38 },
    { name: "Jul", a: 50, b: 125 },
    { name: "Aug", a: 42, b: 95 },
    { name: "Sep", a: 65, b: 145 },
    { name: "Oct", a: 55, b: 125 },
    { name: "Nov", a: 85, b: 175 },
    { name: "Dec", a: 130, b: 260 }
  ]
}

export const peakListeningHoursData = [
  { hour: "6am", listens: 300 },
  { hour: "9am", listens: 450 },
  { hour: "12pm", listens: 1450 },
  { hour: "6pm", listens: 1150 },
  { hour: "9pm", listens: 2100 },
  { hour: "12am", listens: 750 }
]

export const genreBreakdownData = [
  { name: "POP", value: 38, color: "#34C759" },
  { name: "R&B", value: 24, color: "#FFAE00" },
  { name: "Synthwave", value: 18, color: "#CC97FF" },
  { name: "Folk", value: 12, color: "#4C8DFF" },
  { name: "Electronic", value: 8, color: "#3ADFFA" }
]
