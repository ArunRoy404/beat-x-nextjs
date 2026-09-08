import { axiosPrivate } from "@/lib/axios/axiosPrivate";

export async function getMySettingsRequest() {
  const res = await axiosPrivate.get("/users/settings");
  return res?.data?.data;
}

/**
 * PATCH /users/settings is partial — callers send only the keys they are
 * changing. `theme`, `language` and `wifiOnlyMode` are deliberately never
 * sent from this app (see USER_EDITABLE_SETTINGS).
 */
export async function updateMySettingsRequest(body) {
  const res = await axiosPrivate.patch("/users/settings", body);
  return res?.data?.data;
}
