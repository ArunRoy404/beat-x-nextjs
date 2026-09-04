import { axiosPrivate } from "@/lib/axios/axiosPrivate";

export async function getAlbumsRequest({ status, genre, q, page = 1, limit = 20 } = {}) {
  const params = { page, limit };
  if (status && status !== "all") params.status = status;
  if (genre && genre !== "all") params.genre = genre;
  if (q && q.trim()) params.q = q.trim();

  const res = await axiosPrivate.get("/admin/albums", { params });
  return res.data.data;
}

export async function getAlbumDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/albums/${id}`);
  return res.data.data;
}

export async function createAlbumRequest(formData) {
  const res = await axiosPrivate.post("/admin/albums", formData);
  return res.data.data;
}

export async function updateAlbumRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/albums/${id}`, body);
  return res.data.data;
}

export async function updateAlbumStatusRequest({ id, status }) {
  const res = await axiosPrivate.patch(`/admin/albums/${id}`, { status });
  return res.data.data;
}

export async function replaceAlbumCoverRequest({ id, formData }) {
  const res = await axiosPrivate.patch(`/admin/albums/${id}/cover`, formData);
  return res.data.data;
}

export async function deleteAlbumRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/albums/${id}`);
  return res.data.data;
}
