import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API call for public/user approved artists list.
 */
export async function getApprovedArtistsRequest() {
  const res = await axiosPrivate.get("/users/artists");
  return res?.data?.data;
}
