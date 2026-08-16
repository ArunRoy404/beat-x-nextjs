/**
 * Every SSR/ISR page path that POST /api/revalidate busts by default
 * (when the request body doesn't pass an explicit `paths` override).
 * Add a path here whenever a new page ships with server-side prefetch.
 */
export const isrPaths = [
  "/admin/dashboard/users",
];
