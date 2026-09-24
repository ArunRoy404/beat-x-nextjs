import { axiosPrivate } from "@/lib/axios/axiosPrivate";

export async function getPodcastsRequest({ status, category, genre, q, page = 1, limit = 10 } = {}) {
  const res = await axiosPrivate.get("/admin/podcasts", {
    params: {
      status,
      category: category || genre,
      q,
      page,
      limit,
    },
  });
  return res?.data?.data;
}

/**
 * Admins share the same create route as artists (POST /creator/podcasts) —
 * there's no separate /admin/podcasts create route. Admin-created content
 * publishes immediately per whatever status is sent (no pending_review
 * queueing, unlike an artist submission through this same route).
 */
export async function createPodcastRequest(formData) {
  const res = await axiosPrivate.post("/creator/podcasts", formData);
  return res?.data?.data;
}

export async function getPodcastDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/podcasts/${id}`);
  return res?.data?.data;
}

export async function updatePodcastRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/podcasts/${id}`, body);
  return res?.data?.data;
}

export async function updatePodcastStatusRequest({ id, status }) {
  const res = await axiosPrivate.patch(`/admin/podcasts/${id}`, { status });
  return res?.data?.data;
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
