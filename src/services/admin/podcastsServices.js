import { axiosPrivate } from "@/lib/axios/axiosPrivate";

export async function getPodcastsRequest({ status, genre, q, page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/admin/podcasts", {
    params: { status, genre, q, page, limit },
  });
  return res.data.data;
}

export async function getPodcastDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/podcasts/${id}`);
  return res.data.data;
}

export async function updatePodcastRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/podcasts/${id}`, body);
  return res.data.data;
}

export async function updatePodcastStatusRequest({ id, status }) {
  const res = await axiosPrivate.patch(`/admin/podcasts/${id}`, { status });
  return res.data.data;
}

export async function approvePodcastRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/podcasts/${id}/approve`);
  return res.data?.data ?? res.data ?? true;
}

export async function rejectPodcastRequest({ id, reason }) {
  const res = await axiosPrivate.patch(`/admin/podcasts/${id}/reject`, { reason });
  return res.data?.data ?? res.data ?? true;
}

export async function deletePodcastRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/podcasts/${id}`);
  return res.data?.data ?? res.data ?? true;
}
