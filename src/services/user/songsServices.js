import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for user song feeds and discovery.
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


