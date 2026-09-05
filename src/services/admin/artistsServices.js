import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin artist-verification resources.
 */
export async function getArtistsRequest({ tab, page = 1, limit = 20, q } = {}) {
  const res = await axiosPrivate.get("/admin/artist-verification", {
    params: { tab, page, limit, q },
  });
  return res.data.data;
}

export async function getArtistDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/artist-verification/${id}`);
  return res.data.data;
}
