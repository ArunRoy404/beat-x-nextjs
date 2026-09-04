/**
 * Every SSR/ISR page path that POST /api/revalidate busts by default
 * (when the request body doesn't pass an explicit `paths` override).
 * Add a path here whenever a new page ships with server-side prefetch.
 */
export const isrPaths = [
  "/admin/dashboard/overview",
  "/admin/dashboard/users",
  "/admin/dashboard/genre",
  "/admin/dashboard/audiobooks",
  "/admin/dashboard/music",
  "/admin/dashboard/podcasts",
  "/admin/dashboard/albums",
];
