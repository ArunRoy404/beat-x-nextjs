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
    list: () => [...queryKeys.users.all, "list"],
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
  analytics: {
    all: ["analytics"],
    detail: (params) => [...queryKeys.analytics.all, "detail", params],
  },
};
