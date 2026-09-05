import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API call for the admin dashboard overview endpoint.
 */
export async function getAdminDashboardOverviewRequest() {
  const res = await axiosPrivate.get("/admin/dashboard");
  return res?.data?.data;
}
