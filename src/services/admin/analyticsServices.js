import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API call for the admin analytics endpoint.
 * Accepts params e.g. { range: "7d" | "30d" | "3m" | "6m" | "1y" }
 */
export async function getAdminAnalyticsRequest(params) {
  const res = await axiosPrivate.get("/admin/analytics", { params });
  return res?.data?.data;
}
