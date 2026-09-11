import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
  * Raw API calls for user/public albums discovery and details.
  */
export async function getFeaturedAlbumsRequest() {
  const res = await axiosPrivate.get("/albums/featured");
  return res?.data?.data ?? res?.data;
}

export async function getBrowseAlbumsRequest({ page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/albums", { params: { page, limit } });
  return res?.data?.data ?? res?.data;
}

export async function getNewReleaseAlbumsRequest({ page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/albums/new-releases", { params: { page, limit } });
  return res?.data?.data ?? res?.data;
}

export async function getAlbumDetailRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.get(`/albums/${id}`);
  return res?.data?.data ?? res?.data;
}
