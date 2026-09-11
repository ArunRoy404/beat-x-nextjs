import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin videos resource (Moderation Only).
 */
export async function getVideosRequest({ status, genre, q, page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/admin/videos", {
    params: { status, genre, q, page, limit },
  });
  return res?.data?.data;
}

export async function getVideoDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/videos/${id}`);
  return res?.data?.data;
}

export async function updateVideoRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/videos/${id}`, body);
  return res?.data?.data;
}

export async function deleteVideoRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/videos/${id}`);
  return res?.data?.data ?? res?.data ?? true;
}

export async function approveVideoRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/videos/${id}/approve`);
  return res?.data?.data ?? res?.data;
}

export async function rejectVideoRequest({ id, reason }) {
  const res = await axiosPrivate.patch(`/admin/videos/${id}/reject`, { reason });
  return res?.data?.data ?? res?.data;
}
