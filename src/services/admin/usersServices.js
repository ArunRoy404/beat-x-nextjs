import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin users resource. Kept separate from hooks so
 * the request shape can be reused outside React if ever needed.
 */
export async function getUsersRequest() {
  const res = await axiosPrivate.get("/users");
  return res.data.data;
}
