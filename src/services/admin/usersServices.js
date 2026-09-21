import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin users resource. Kept separate from hooks so
 * the request shape can be reused outside React if ever needed.
 */
export async function getUsersRequest(params) {
  const res = await axiosPrivate.get("/admin/users", { params });
  return res?.data?.data ?? res?.data;
}

export async function getUserDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/users/${id}`);
  return res?.data?.data ?? res?.data;
}

export async function getProfileRequest() {
  const res = await axiosPrivate.get("/users/me");
  return res?.data?.data ?? res?.data;
}

export async function suspendUserRequest({ id, reason }) {
  const res = await axiosPrivate.patch(`/admin/users/${id}/suspend`, { reason });
  return res?.data?.data ?? res?.data;
}

export async function banUserRequest({ id, reason }) {
  const res = await axiosPrivate.patch(`/admin/users/${id}/ban`, { reason });
  return res?.data?.data ?? res?.data;
}

export async function reactivateUserRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/users/${id}/reactivate`);
  return res?.data?.data ?? res?.data;
}

export async function deleteUserRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/users/${id}`);
  return res?.data?.data ?? res?.data ?? true;
}

export async function inviteUserRequest({ email, role }) {
  const res = await axiosPrivate.post("/admin/users/invite", { email, role });
  return res?.data?.data ?? res?.data;
}
