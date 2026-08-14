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
};
