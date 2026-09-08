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

/**
 * PATCH /users/profile takes multipart form-data (name, phone, avatar file),
 * so callers build a FormData — axiosPrivate strips its JSON content-type
 * when it sees one and lets axios set the multipart boundary.
 */
export async function updateMyProfileRequest(formData) {
  const res = await axiosPrivate.patch("/users/profile", formData);
  return res?.data?.data;
}

/** Permanently deletes the caller's own account. Password-confirmed. */
export async function deleteMyAccountRequest({ password }) {
  const res = await axiosPrivate.delete("/users/me", { data: { password } });
  return res?.data?.data;
}
