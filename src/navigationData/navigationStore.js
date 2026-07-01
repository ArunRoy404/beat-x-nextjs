import { create } from "zustand"

const defaultNavigationData = {
  sidebarTitle: "ADMIN CONTROL",
  navMain: [
    {
      category: "Overview",
      items: [
        { title: "Dashboard", url: "/admin/dashboard", iconName: "GridViewIcon" },
        { title: "Analytics", url: "/admin/dashboard/analytics", iconName: "Analytics01Icon" },
      ],
    },
    {
      category: "Content",
      items: [
        { title: "Music's & Songs", url: "/admin/dashboard/music", iconName: "MusicNote01Icon" },
        { title: "Podcasts", url: "/admin/dashboard/podcasts", iconName: "PodcastIcon" },
        { title: "Audiobooks", url: "/admin/dashboard/audiobooks", iconName: "AudioBook01Icon" },
        { title: "Videos & Watch", url: "/admin/dashboard/videos", iconName: "Video01Icon" },
      ],
    },
    {
      category: "Users",
      items: [
        { title: "Artist's", url: "/admin/dashboard/artists", iconName: "Mic01Icon" },
        { title: "Users", url: "/admin/dashboard/users", iconName: "UserGroupIcon" },
      ],
    },
    {
      category: "Store",
      items: [
        { title: "Shop & Products", url: "/admin/dashboard/shop", iconName: "ShoppingBag01Icon" },
        { title: "Tours & Events", url: "/admin/dashboard/tours", iconName: "Calendar01Icon" },
        { title: "Subscriptions", url: "/admin/dashboard/subscriptions", iconName: "CreditCardIcon" },
        { title: "Orders", url: "/admin/dashboard/orders", iconName: "Package01Icon" },
        { title: "Revenue", url: "/admin/dashboard/revenue", iconName: "MoneyBag01Icon" },
      ],
    },
    {
      category: "Platform",
      items: [
        { title: "Moderation", url: "/admin/dashboard/moderation", iconName: "Shield01Icon" },
        { title: "Sales Reports", url: "/admin/dashboard/sales-reports", iconName: "Invoice01Icon" },
        { title: "Settings", url: "/admin/dashboard/settings", iconName: "Settings05Icon" },
      ],
    },
  ],
}

export const useNavigationStore = create((set) => ({
  navigationData: defaultNavigationData,
  setNavigationData: (data) => set({ navigationData: data }),
}))
