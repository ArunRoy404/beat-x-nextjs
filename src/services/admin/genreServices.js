import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin genre resource. Kept separate from hooks so
 * the request shape can be reused outside React if ever needed.
 */
export async function getGenresRequest() {
  const res = await axiosPrivate.get("/genre");
  return res.data.data;
}

export async function searchGenresRequest({ name }) {
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
  return res.data.data;
}
