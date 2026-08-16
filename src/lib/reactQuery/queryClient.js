import { QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query";
import { env } from "@/config/env";

const STALE_TIME = env.revalidateTime * 1000;

/**
 * One factory used on both server and client so defaults never drift.
 * `getQueryClient` below decides whether to memoize per-request (server)
 * or reuse a single browser instance (client).
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
        gcTime: STALE_TIME * 2,
        // Keeps data fresh on its own — no manual revalidate call needed.
        refetchInterval: STALE_TIME,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
      dehydrate: {
        // include pending queries so streaming SSR can resolve them on the client
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}
