import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin genre resource. Kept separate from hooks so
 * the request shape can be reused outside React if ever needed.
 */
export async function getGenresRequest({ page = 1, limit = 20, q } = {}) {
  const params = { page, limit };
  if (q) params.q = q;
  const res = await axiosPrivate.get("/genre", { params });
  return res.data.data;
}

export async function searchGenresRequest({ name } = {}) {
  const res = await axiosPrivate.get("/genre/search", { params: { name } });
  return res.data.data;
}

export async function createGenreRequest({ name }) {
  const res = await axiosPrivate.post("/genre", { name });
  return res.data.data;
}

export async function updateGenreRequest({ id, name }) {
  const res = await axiosPrivate.patch(`/genre/${id}`, { name });
  return res.data.data;
}

export async function deleteGenreRequest({ id }) {
  const res = await axiosPrivate.delete(`/genre/${id}`);
  return res.data?.data ?? res.data ?? true;
}
