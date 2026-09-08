import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the signed-in listener's own profile.
 *
 * Note: `/users/me` is also called from `services/admin/usersServices.js` for
 * the admin profile screen. They're kept separate on purpose — the two areas
 * are different domains and the admin module must not be coupled to changes
 * made for the user area.
 */
export async function getMyProfileRequest() {
  const res = await axiosPrivate.get("/users/me");
  return res?.data?.data;
}
