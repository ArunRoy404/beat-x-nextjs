import { axiosPrivate } from "@/lib/axios/axiosPrivate";
import { axiosPublic } from "@/lib/axios/axiosPublic";

/**
 * Raw API calls for user song feeds, playback streaming, details, and discovery.
 */
export async function getSongsHomeRequest() {
  const res = await axiosPrivate.get("/songs/home");
  return res?.data?.data;
}

export async function getDailyDiscoveryRequest({ limit = 10 } = {}) {
  const res = await axiosPrivate.get("/songs/daily-discovery", {
    params: { limit },
  });
  return res?.data?.data;
}

export async function getNewReleasesRequest({ page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/songs/new-releases", {
    params: { page, limit },
  });
  return res?.data?.data;
}

export async function getTrendingSongsRequest() {
  const res = await axiosPrivate.get("/songs/trending");
  return res?.data?.data;
}

export async function getFeaturedSongsRequest() {
  const res = await axiosPrivate.get("/songs/featured");
  return res?.data?.data;
}

export async function getLikedSongsRequest({ page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/songs/liked", {
    params: { page, limit },
  });
  return res?.data?.data ?? res?.data;
}


export async function getSongStreamUrlRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.get(`/songs/${id}/stream`);
  return res?.data?.data;
}

export async function getSongDetailRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.get(`/songs/${id}`);
  return res?.data?.data;
}

export async function toggleLikeSongRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.post(`/songs/${id}/like`);
  return res?.data?.data;
}

export async function getBrowseSongsRequest({ page = 1, limit = 50 } = {}) {
  const res = await axiosPrivate.get("/songs", {
    params: { page, limit },
  });
  return res?.data?.data ?? res?.data;
}

export async function saveSongProgressRequest({ id, positionMs = 0, completed = false }) {
  if (!id) return null;
  const res = await axiosPrivate.post(`/songs/${id}/progress`, {
    positionMs,
    completed,
  });
  return res?.data?.data;
}



