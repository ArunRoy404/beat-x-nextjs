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
  },
  users: {
    all: ["users"],
    list: (params) => [...queryKeys.users.all, "list", params],
  },
  genre: {
    all: ["genre"],
    list: (params) => [...queryKeys.genre.all, "list", params],
    search: (name) => [...queryKeys.genre.all, "search", name],
  },
  audiobooks: {
    all: ["audiobooks"],
    list: (params) => [...queryKeys.audiobooks.all, "list", params],
    detail: (id) => [...queryKeys.audiobooks.all, "detail", id],
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
    detail: (id) => [...queryKeys.albums.all, "detail", id],
  },
  dashboard: {
    all: ["dashboard"],
    overview: () => [...queryKeys.dashboard.all, "overview"],
  },
  videos: {
    all: ["videos"],
    list: (params) => [...queryKeys.videos.all, "list", params],
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
};

