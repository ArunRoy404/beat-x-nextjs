import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
  * Raw API calls for user/public videos, trending feeds, and streaming.
  */
export async function getTrendingVideosRequest() {
  const res = await axiosPrivate.get("/videos/trending");
  return res?.data?.data ?? res?.data;
}

export async function getBrowseVideosRequest({ page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/videos", { params: { page, limit } });
  return res?.data?.data ?? res?.data;
}

export async function getVideoDetailRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.get(`/videos/${id}`);
  return res?.data?.data ?? res?.data;
}

export async function getVideoStreamUrlRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.get(`/videos/${id}/stream`);
  return res?.data?.data ?? res?.data;
}

export async function toggleLikeVideoRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.post(`/videos/${id}/like`);
  return res?.data?.data ?? res?.data;
}
