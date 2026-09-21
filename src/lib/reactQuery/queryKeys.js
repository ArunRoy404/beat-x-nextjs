/**
 * Single source of truth for every TanStack Query key in the app.
 * Import this from any file to read a query OR to invalidate it —
 * e.g. `queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })`
 * from a mutation that lives in a completely different feature folder.
 */
export const queryKeys = {
  auth: {
    all: ["auth"],
    me: () => [...queryKeys.auth.all, "me"],
    loginHistory: () => [...queryKeys.auth.all, "loginHistory"],
  },
  user: {
    all: ["user"],
    me: () => [...queryKeys.user.all, "me"],
    settings: () => [...queryKeys.user.all, "settings"],
    artists: () => [...queryKeys.user.all, "artists"],
    favorites: () => [...queryKeys.user.all, "favorites"],
  },
  songs: {
    all: ["songs"],
    home: () => [...queryKeys.songs.all, "home"],
    dailyDiscovery: (limit) => [...queryKeys.songs.all, "dailyDiscovery", limit],
    newReleases: (params) => [...queryKeys.songs.all, "newReleases", params],
    trending: () => [...queryKeys.songs.all, "trending"],
    featured: () => [...queryKeys.songs.all, "featured"],
    list: (params) => [...queryKeys.songs.all, "list", params],
    liked: () => [...queryKeys.songs.all, "liked"],
    detail: (id) => [...queryKeys.songs.all, "detail", id],
    stream: (id) => [...queryKeys.songs.all, "stream", id],
    like: (id) => [...queryKeys.songs.all, "like", id],
  },
  users: {
    all: ["users"],
    profile: () => [...queryKeys.users.all, "profile"],
    list: (params) => [...queryKeys.users.all, "list", params],
    detail: (id) => [...queryKeys.users.all, "detail", id],
  },
  genre: {
    all: ["genre"],
    list: (params) => [...queryKeys.genre.all, "list", params],
    search: (name) => [...queryKeys.genre.all, "search", name],
  },
  categories: {
    all: ["categories"],
    list: (params) => [...queryKeys.categories.all, "list", params],
  },
  audiobooks: {
    all: ["audiobooks"],
    list: (params) => [...queryKeys.audiobooks.all, "list", params],
    detail: (id) => [...queryKeys.audiobooks.all, "detail", id],
  },
  audiobookReviews: {
    all: ["audiobookReviews"],
    list: (params) => [...queryKeys.audiobookReviews.all, "list", params],
  },
  music: {
    all: ["music"],
    list: (params) => [...queryKeys.music.all, "list", params],
    detail: (id) => [...queryKeys.music.all, "detail", id],
  },
  podcasts: {
    all: ["podcasts"],
    list: (params) => [...queryKeys.podcasts.all, "list", params],
    detail: (id) => [...queryKeys.podcasts.all, "detail", id],
  },
  podcastReviews: {
    all: ["podcastReviews"],
    list: (params) => [...queryKeys.podcastReviews.all, "list", params],
  },
  scheduler: {
    all: ["scheduler"],
    status: () => [...queryKeys.scheduler.all, "status"],
  },
  albums: {
    all: ["albums"],
    list: (params) => [...queryKeys.albums.all, "list", params],
    featured: () => [...queryKeys.albums.all, "featured"],
    newReleases: (params) => [...queryKeys.albums.all, "newReleases", params],
    detail: (id) => [...queryKeys.albums.all, "detail", id],
  },
  playlists: {
    all: ["playlists"],
    mine: (params) => [...queryKeys.playlists.all, "mine", params],
    detail: (id) => [...queryKeys.playlists.all, "detail", id],
  },
  dashboard: {
    all: ["dashboard"],
    overview: () => [...queryKeys.dashboard.all, "overview"],
  },
  videos: {
    all: ["videos"],
    list: (params) => [...queryKeys.videos.all, "list", params],
    trending: () => [...queryKeys.videos.all, "trending"],
    detail: (id) => [...queryKeys.videos.all, "detail", id],
  },
  analytics: {
    all: ["analytics"],
    detail: (params) => [...queryKeys.analytics.all, "detail", params],
  },
  artists: {
    all: ["artists"],
    list: (params) => [...queryKeys.artists.all, "list", params],
    detail: (id) => [...queryKeys.artists.all, "detail", id],
  },
  products: {
    all: ["products"],
    dashboard: () => [...queryKeys.products.all, "dashboard"],
    list: (params) => [...queryKeys.products.all, "list", params],
    detail: (id) => [...queryKeys.products.all, "detail", id],
    analytics: (id) => [...queryKeys.products.all, "analytics", id],
  },
  events: {
    all: ["events"],
    dashboard: () => [...queryKeys.events.all, "dashboard"],
    list: (params) => [...queryKeys.events.all, "list", params],
    detail: (id) => [...queryKeys.events.all, "detail", id],
    analytics: (id) => [...queryKeys.events.all, "analytics", id],
  },
  subscriptions: {
    all: ["subscriptions"],
    dashboard: () => [...queryKeys.subscriptions.all, "dashboard"],
    list: (params) => [...queryKeys.subscriptions.all, "list", params],
  },
  rolesRbac: {
    all: ["rolesRbac"],
    dashboard: () => [...queryKeys.rolesRbac.all, "dashboard"],
    list: (params) => [...queryKeys.rolesRbac.all, "list", params],
  },
};

