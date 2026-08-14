import { cache } from "react";
import { isServer } from "@tanstack/react-query";
import { makeQueryClient } from "./queryClient";

// Server: a fresh QueryClient per request, memoized via React's cache() so
// every prefetch call within the same render tree shares one instance.
const getServerQueryClient = cache(makeQueryClient);

// Browser: a single long-lived QueryClient across the whole session.
let browserQueryClient;

export function getQueryClient() {
  if (isServer) {
    return getServerQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
