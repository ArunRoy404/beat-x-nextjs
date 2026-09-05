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

export async function updateArtistChecklistRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/checklist`, body);
  return res.data.data;
}

export async function updateArtistSocialChecklistRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/social-links/checklist`, body);
  return res.data.data;
}

export async function reviewOverviewRequest({ id, body = { reviewed: true } }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/review/overview`, body);
  return res.data.data;
}

export async function reviewMediaAssetsRequest({ id, body = { reviewed: true } }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/review/media_assets`, body);
  return res.data.data;
}

export async function approveArtistRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/approve`);
  return res.data.data;
}

export async function rejectArtistRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/reject`, body);
  return res.data.data;
}

export async function requestMoreInfoArtistRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/request-info`, body);
  return res.data.data;
}

export async function suspendArtistRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/suspend`, body);
  return res.data.data;
}

export async function reactivateArtistRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/reactivate`);
  return res.data.data;
}

export async function updateArtistGenresRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/genres`, body);
  return res.data.data;
}

export async function deleteArtistRequest({ id, password }) {
  const res = await axiosPrivate.delete(`/admin/artist-verification/${id}`, {
    data: { password },
  });
  return res.data.data;
}
