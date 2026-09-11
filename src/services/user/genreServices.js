import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for public/user genres and categories.
 */
export async function getUserGenresRequest() {
  const res = await axiosPrivate.get("/genre");
  return res?.data?.data ?? res?.data;
}

export async function getUserCategoriesRequest() {
  const res = await axiosPrivate.get("/category");
  return res?.data?.data ?? res?.data;
}

export async function searchUserGenresRequest(name) {
  const res = await axiosPrivate.get("/genre/search", { params: { name } });
  return res?.data?.data ?? res?.data;
}
