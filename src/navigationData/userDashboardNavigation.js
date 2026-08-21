export const userDashboardNavigation = {
  sidebarTitle: "BEATX",
  navMain: [
    {
      category: "Main",
      items: [
        { title: "Home", url: "/", iconName: "HomeIcon" },
        { title: "Explore", url: "/explore", iconName: "SearchNormalIcon" },
        { title: "Trending", url: "/trending", iconName: "TrendingIcon" },
      ],
    },
    {
      category: "Your Library",
      items: [
        { title: "Library", url: "/library", iconName: "MusicLibraryIcon" },
        { title: "Albums", url: "/library/albums", iconName: "AlbumIcon" },
        { title: "Create Playlist", url: "/library/create-playlist", iconName: "AddCircleIcon" },
        { title: "Like Songs", url: "/library/liked", iconName: "HeartIcon" },
        { title: "Download", url: "/library/downloads", iconName: "DownloadTrayIcon" },
      ],
    },
    {
      category: "Media",
      items: [
        { title: "Watch", url: "/watch", iconName: "Video01Icon" },
        { title: "Podcasts", url: "/podcasts", iconName: "PodcastIcon" },
        { title: "Audio Book", url: "/audio-books", iconName: "AudioBook01Icon" },
      ],
    },
    {
      category: "Store",
      items: [
        { title: "Shop", url: "/shop", iconName: "ShoppingBag01Icon" },
        { title: "Tickets", url: "/tickets", iconName: "Ticket2Icon" },
      ],
    },
  ],
}
