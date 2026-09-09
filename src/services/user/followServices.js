import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API call to follow or unfollow a user/artist (toggle).
 */
export async function toggleFollowUserRequest({ id }) {
  const res = await axiosPrivate.post(`/users/${id}/follow`);
  return res?.data?.data;
}
