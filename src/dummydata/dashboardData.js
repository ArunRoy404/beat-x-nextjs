export const greetingData = {
  greeting: "Good Evening, Admin!",
  statusLabel: "Platform Status",
  activeUsersText: "9.4M users",
  activeUsersLabel: "active",
  pendingReportsText: "34 reports",
  pendingReportsLabel: "pending",
  operationalText: "All systems operational",
  metrics: [
    { value: "99.98%", label: "API Uptime", type: "success" },
    { value: "124ms", label: "Response", type: "warning" },
    { value: "284K", label: "Sessions", type: "primary" }
  ]
}

export const statsCards = [
  {
    id: 1,
    title: "Total Users",
    value: "9.4M",
    change: "+ 18%",
    isPositive: true,
    icon: "Users",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)"
  },
  {
    id: 2,
    title: "Active Users",
    value: "8.4M",
    change: "+ 12%",
    isPositive: true,
    icon: "Activity",
    iconColor: "#FF8DFE",
    iconBg: "rgba(255, 141, 254, 0.15)"
  },
  {
    id: 3,
    title: "Premium Subs",
    value: "2.1M",
    change: "+ 18%",
    isPositive: true,
    icon: "CreditCard",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)"
  },
  {
    id: 4,
    title: "Active Artist's",
    value: "12,840",
    change: "+ 12%",
    isPositive: true,
    icon: "Mic",
    iconColor: "#B1FE4D",
    iconBg: "rgba(177, 254, 77, 0.15)"
  },
  {
    id: 5,
    title: "Total Songs",
    value: "892K",
    change: "+ 18%",
    isPositive: true,
    icon: "Music",
    iconColor: "#FFAE00",
    iconBg: "rgba(254, 174, 0, 0.15)"
  },
  {
    id: 6,
    title: "Total Albums",
    value: "18.4K",
    change: "+ 4%",
    isPositive: true,
    icon: "Folder",
    iconColor: "#3A8EFA",
    iconBg: "rgba(58, 142, 250, 0.15)"
  },
  {
    id: 7,
    title: "Podcasts",
    value: "124K",
    change: "+ 12%",
    isPositive: true,
    icon: "Radio",
    iconColor: "#34C759",
    iconBg: "rgba(52, 199, 89, 0.15)"
  },
  {
    id: 8,
    title: "Videos",
    value: "48.2K",
    change: "- 8%",
    isPositive: false,
    icon: "Play",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)"
  },
  {
    id: 9,
    title: "Audiobooks",
    value: "8.4K",
    change: "+ 18%",
    isPositive: true,
    icon: "BookOpen",
    iconColor: "#B1FE4D",
    iconBg: "rgba(177, 254, 77, 0.15)"
  },
  {
    id: 10,
    title: "Pending Verification",
    value: "1,421",
    change: "+ 12%",
    isPositive: true,
    icon: "UserCheck",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)"
  },
  {
    id: 11,
    title: "Revenue (MTD)",
    value: "৳61.8L",
    change: "+ 31%",
    isPositive: true,
    icon: "DollarSign",
    iconColor: "#34C759",
    iconBg: "rgba(52, 199, 89, 0.15)"
  },
  {
    id: 12,
    title: "Pending Payouts",
    value: "৳89.2L",
    change: "- 8%",
    isPositive: false,
    icon: "Wallet",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)"
  }
]

export const platformGrowthData = [
  { name: "Jan", stream: 0, followers: 0 },
  { name: "Feb", stream: 2.1, followers: 3.5 },
  { name: "Mar", stream: 3.0, followers: 4.8 },
  { name: "Apr", stream: 3.8, followers: 5.2 },
  { name: "May", stream: 4.5, followers: 6.0 },
  { name: "Jun", stream: 5.2, followers: 7.2 },
  { name: "Jul", stream: 6.2, followers: 8.0 },
  { name: "Aug", stream: 6.8, followers: 9.8 },
  { name: "Sep", stream: 7.2, followers: 10.2 },
  { name: "Oct", stream: 7.5, followers: 11.0 },
  { name: "Nov", stream: 8.0, followers: 12.5 },
  { name: "Dec", stream: 9.0, followers: 14.5 }
]

export const genreMixData = [
  { name: "POP", value: 38, color: "#34C759" },
  { name: "R&B", value: 24, color: "#FFAE00" },
  { name: "Synthwave", value: 18, color: "#CC97FF" },
  { name: "Folk", value: 12, color: "#3A8EFA" },
  { name: "Electronic", value: 8, color: "#3ADFFA" },
  { name: "Others", value: 2, color: "#6B6B6B" }
]

export const revenueStreamsData = [
  { name: "Jul", subscription: 160, store: 50, events: 100 },
  { name: "Aug", subscription: 160, store: 50, events: 100 },
  { name: "Sep", subscription: 160, store: 50, events: 100 },
  { name: "Oct", subscription: 160, store: 50, events: 100 },
  { name: "Nov", subscription: 160, store: 50, events: 100 },
  { name: "Dec", subscription: 160, store: 50, events: 100 }
]

export const recentUploadsData = [
  {
    id: "01",
    title: "Tumi Onek Dami",
    plays: "4.2M plays",
    status: "Published",
    cover: "/images/tumi_onek_dami.png"
  },
  {
    id: "02",
    title: "Bhalo Thako Mon",
    plays: "3.1M plays",
    status: "Published",
    cover: "/images/bhalo_thako_mon.png"
  },
  {
    id: "03",
    title: "Neon Prophets",
    plays: "Sarah J. Miller",
    status: "Published",
    cover: "/images/neon_prophets.png"
  },
  {
    id: "04",
    title: "Bhalo Thako Mon",
    plays: "3.1M plays",
    status: "Draft",
    cover: "/images/bhalo_thako_mon.png"
  },
  {
    id: "05",
    title: "Bhalo Thako Mon",
    plays: "3.1M plays",
    status: "Scheduled",
    cover: "/images/bhalo_thako_mon.png"
  }
]

export const recentActivityData = [
  {
    id: 1,
    text: "Skyline Residency building added to portfolio",
    time: "May 23, 8:33 AM",
    color: "#3ADFFA"
  },
  {
    id: 2,
    text: "Rent payment of ₹45,000 received from Meera Iyer (Flat 301)",
    time: "May 23, 8:33 AM",
    color: "#FFAE00"
  },
  {
    id: 3,
    text: "Critical: CCTV camera malfunction at Skyline Residency",
    time: "May 23, 8:33 AM",
    color: "#34C759"
  },
  {
    id: 4,
    text: "Ankit Verma moved into Sunrise Tower, Flat 101",
    time: "May 23, 8:33 AM",
    color: "#FFAE00"
  },
  {
    id: 5,
    text: "Flat 302 at Skyline Residency marked for maintenance",
    time: "May 23, 8:33 AM",
    color: "#3ADFFA"
  },
  {
    id: 6,
    text: "₹75,000 paid for lift motor replacement at Skyline Residency",
    time: "May 23, 8:33 AM",
    color: "#6B6B6B"
  },
  {
    id: 7,
    text: "Flat 302 at Skyline Residency marked for maintenance",
    time: "May 23, 8:33 AM",
    color: "#CC97FF"
  }
]

export const upcomingEventsData = [
  {
    id: 1,
    month: "NOV",
    day: "24",
    title: "Neon City Arena",
    location: "Tokyo, Japan",
    status: "Upcoming",
    ticketsSold: "320/500 tickets sold"
  },
  {
    id: 2,
    month: "NOV",
    day: "24",
    title: "The Grid Pavilion",
    location: "Berlin, Germany",
    status: "Upcoming",
    ticketsSold: "320/500 tickets sold"
  }
]

export const analyticsStatsCards = [
  {
    id: 1,
    title: "Total Streams",
    value: "124M",
    change: "+ 12%",
    isPositive: true,
    icon: "Headphones",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)"
  },
  {
    id: 2,
    title: "Monthly Listeners",
    value: "2.4M",
    change: "+ 18%",
    isPositive: true,
    icon: "Users",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)"
  },
  {
    id: 3,
    title: "Follower Growth",
    value: "+83k",
    change: "+ 12%",
    isPositive: true,
    icon: "TrendingUp",
    iconColor: "#34C759",
    iconBg: "rgba(52, 199, 89, 0.15)"
  },
  {
    id: 4,
    title: "AVG Listen Time",
    value: "43min",
    change: "+ 31%",
    isPositive: true,
    icon: "Clock",
    iconColor: "#FFAE00",
    iconBg: "rgba(254, 174, 0, 0.15)"
  }
]

export const growthOverviewData = [
  { name: "Jun", stream: 5, followers: 8 },
  { name: "Jul", stream: 30, followers: 45 },
  { name: "Aug", stream: 60, followers: 100 },
  { name: "Sep", stream: 100, followers: 150 },
  { name: "Oct", stream: 110, followers: 180 },
  { name: "Nov", stream: 140, followers: 220 },
  { name: "Dec", stream: 160, followers: 250 }
]

export const peakListeningHoursData = [
  { name: "6am", value: 650 },
  { name: "9am", value: 300 },
  { name: "12pm", value: 1500 },
  { name: "6pm", value: 1200 },
  { name: "9pm", value: 1900 },
  { name: "12am", value: 450 }
]

export const genreDistributionData = [
  { name: "POP", value: 38, color: "#34C759" },
  { name: "R&B", value: 24, color: "#FFAE00" },
  { name: "Synthwave", value: 18, color: "#CC97FF" },
  { name: "Folk", value: 12, color: "#3A8EFA" },
  { name: "Electronic", value: 8, color: "#3ADFFA" }
]


