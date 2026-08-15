import { env } from "@/config/env";

export function getApiBaseUrl() {
  if (typeof window === "undefined") return env.apiBaseUrl;
  return env.useApiProxy ? "/api/proxy" : env.apiBaseUrl;
}
