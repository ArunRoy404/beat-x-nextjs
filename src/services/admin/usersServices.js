import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin users resource. Kept separate from hooks so
 * the request shape can be reused outside React if ever needed.
 */
export async function getUsersRequest(params) {
  const res = await axiosPrivate.get("/users", { params });
  return res?.data?.data ?? res?.data;
}

export async function getProfileRequest() {
  const res = await axiosPrivate.get("/users/me");
  return res?.data?.data ?? res?.data;
}

