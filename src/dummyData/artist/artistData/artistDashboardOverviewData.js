export const statsCards = [
  {
    id: 1,
    title: "Total Streams",
    value: "12.4M",
    change: "18%",
    isPositive: true,
    icon: "Headphones",
    iconColor: "#3ADFFA",
    iconBg: "rgba(58, 223, 250, 0.15)"
  },
  {
    id: 2,
    title: "Followers",
    value: "248k",
    change: "12%",
    isPositive: true,
    icon: "Users",
    iconColor: "#CC97FF",
    iconBg: "rgba(204, 151, 255, 0.15)"
  },
  {
    id: 3,
    title: "Revenue",
    value: "৳3,240",
    change: "24%",
    isPositive: true,
    icon: "Wallet",
    iconColor: "#34C759",
    iconBg: "rgba(52, 199, 89, 0.15)"
  },
  {
    id: 4,
    title: "Monthly Listeners",
    value: "1.2M",
    change: "24%",
    isPositive: true,
    icon: "Radio",
    iconColor: "#34C759",
    iconBg: "rgba(52, 199, 89, 0.15)"
  }
]

export const weeklyStreamsDataByRange = {
  "7D": [
    { name: "Mon", stream: 3.4 },
    { name: "Tue", stream: 4.1 },
    { name: "Wed", stream: 3.8 },
    { name: "Thu", stream: 4.6 },
    { name: "Fri", stream: 5.2 },
    { name: "Sat", stream: 6.0 },
    { name: "Sun", stream: 6.4 }
  ],
  "30D": [
    { name: "Wk 1", stream: 3.6 },
    { name: "Wk 2", stream: 4.4 },
    { name: "Wk 3", stream: 5.1 },
    { name: "Wk 4", stream: 6.4 }
  ],
  "3M": [
    { name: "Jan", stream: 3.2 },
    { name: "Feb", stream: 3.6 },
    { name: "Mar", stream: 3.4 },
    { name: "Apr", stream: 4.0 },
    { name: "May", stream: 3.8 },
    { name: "Jun", stream: 4.4 },
    { name: "Jul", stream: 4.8 },
    { name: "Aug", stream: 4.6 },
    { name: "Sep", stream: 5.2 },
    { name: "Oct", stream: 5.6 },
    { name: "Nov", stream: 5.4 },
    { name: "Dec", stream: 6.4 }
  ]
}

export const revenueOverviewData = [
  { name: "Jan", revenue: 800 },
  { name: "Feb", revenue: 800 },
  { name: "Mar", revenue: 1600 },
  { name: "Apr", revenue: 1400 },
  { name: "May", revenue: 2000 },
  { name: "Jun", revenue: 3200 }
]

export const topTracksTableData = [
  { id: 1, title: "Bangladesh Tech Weekly", series: "Tech BD", listeners: "28.4K", revenue: "56.8K", status: "Published" },
  { id: 2, title: "Startup Stories BD", series: "Business BD", listeners: "19.2K", revenue: "38.4K", status: "Published" },
  { id: 3, title: "Neon Horizon", series: "Wellness", listeners: "15.4K", revenue: "30.8K", status: "Published" },
  { id: 4, title: "Mindful Living", series: "Wellness", listeners: "11.6K", revenue: "23.2K", status: "Under Review" },
  { id: 5, title: "History of Bengal", series: "History", listeners: "9.8K", revenue: "19.6K", status: "Published" }
]

export const topTracksListData = [
  { id: 1, title: "Tumi Onek Dami", plays: "4.2M plays", changePercent: 12, isPositive: true, duration: "4:20", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=150" },
  { id: 2, title: "Bhalo Thako Mon", plays: "3.1M plays", changePercent: 8, isPositive: true, duration: "3:58", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=150" },
  { id: 3, title: "Neon Prophets", plays: "2.4M plays", changePercent: 3, isPositive: false, duration: "3:15", cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=150" },
  { id: 4, title: "Mindful Living", plays: "1.8M plays", changePercent: 5, isPositive: true, duration: "4:02", cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=150" }
]

export const recentActivityData = [
  { id: 1, text: "Your song 'Nishithe Asha' hit 4M streams!", time: "3 hr ago", color: "#3ADFFA" },
  { id: 2, text: "612 new followers this week", time: "6 hr ago", color: "#34C759" },
  { id: 3, text: "Your track 'Tumi Onek Dami' was added to 3 playlists", time: "8 hr ago", color: "#CC97FF" }
]

export const upcomingEventsData = [
  { id: 1, month: "NOV", day: "24", title: "Neon City Arena", location: "Tokyo, Japan", status: "Upcoming", ticketsSold: "320/500 tickets sold" },
  { id: 2, month: "DEC", day: "02", title: "The Grid Pavilion", location: "Berlin, Germany", status: "Upcoming", ticketsSold: "180/300 tickets sold" }
]
