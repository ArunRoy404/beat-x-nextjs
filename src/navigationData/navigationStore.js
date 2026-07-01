import { create } from "zustand"

const defaultNavigationData = {
  sidebarTitle: "ADMIN CONTROL",
  navMain: [
    {
      category: "Overview",
      items: [
        { title: "Dashboard", url: "/admin/dashboard", iconName: "GridViewIcon" },
        { title: "Analytics", url: "/admin/analytics", iconName: "Analytics01Icon" },
      ],
    },
    {
      category: "Content",
      items: [
        { title: "Music's & Songs", url: "/admin/music", iconName: "MusicNote01Icon" },
        { title: "Podcasts", url: "/admin/podcasts", iconName: "PodcastIcon" },
        { title: "Audiobooks", url: "/admin/audiobooks", iconName: "AudioBook01Icon" },
        { title: "Videos & Watch", url: "/admin/videos", iconName: "Video01Icon" },
      ],
    },
    {
      category: "Users",
      items: [
        { title: "Artist's", url: "/admin/artists", iconName: "Mic01Icon" },
        { title: "Users", url: "/admin/users", iconName: "UserGroupIcon" },
      ],
    },
    {
      category: "Store",
      items: [
        { title: "Shop & Products", url: "/admin/shop", iconName: "ShoppingBag01Icon" },
        { title: "Tours & Events", url: "/admin/tours", iconName: "Calendar01Icon" },
        { title: "Subscriptions", url: "/admin/subscriptions", iconName: "CreditCardIcon" },
        { title: "Orders", url: "/admin/orders", iconName: "Package01Icon" },
        { title: "Revenue", url: "/admin/revenue", iconName: "MoneyBag01Icon" },
      ],
    },
    {
      category: "Platform",
      items: [
        { title: "Moderation", url: "/admin/moderation", iconName: "Shield01Icon" },
        { title: "Sales Reports", url: "/admin/sales-reports", iconName: "Invoice01Icon" },
        { title: "Settings", url: "/admin/settings", iconName: "Settings05Icon" },
      ],
    },
  ],
}

export const useNavigationStore = create((set) => ({
  navigationData: defaultNavigationData,
  setNavigationData: (data) => set({ navigationData: data }),
}))
