import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin artist-verification resources.
 */
export async function getArtistsRequest({ tab, page = 1, limit = 20, q } = {}) {
  const res = await axiosPrivate.get("/admin/artist-verification", {
    params: { tab, page, limit, q },
  });
  return res?.data?.data;
}

export async function getArtistDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/artist-verification/${id}`);
  return res?.data?.data;
}

export async function updateArtistChecklistRequest({ id, body, data, ...rest }) {
  const payload = body || data || rest;
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/checklist`, payload);
  return res?.data?.data;
}

export async function updateArtistSocialChecklistRequest({ id, body, data, ...rest }) {
  const payload = body || data || rest;
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/social-links/checklist`, payload);
  return res?.data?.data;
}

export async function reviewOverviewRequest({ id, body, ...rest }) {
  const payload = body || (typeof rest.reviewed === "boolean" ? rest : { reviewed: true });
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/review/overview`, payload);
  return res?.data?.data;
}

export async function reviewMediaAssetsRequest({ id, body, ...rest }) {
  const payload = body || (typeof rest.reviewed === "boolean" ? rest : { reviewed: true });
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/review/media_assets`, payload);
  return res?.data?.data;
}

export async function approveArtistRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/approve`);
  return res?.data?.data;
}

export async function rejectArtistRequest({ id, body, reasonCode, note, ...rest }) {
  const payload = body || { reasonCode, note, ...rest };
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/reject`, payload);
  return res?.data?.data;
}

export async function requestMoreInfoArtistRequest({ id, body, items, message, ...rest }) {
  const payload = body || { items, message, ...rest };
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/request-info`, payload);
  return res?.data?.data;
}

export async function suspendArtistRequest({ id, body, reason, ...rest }) {
  const payload = body || { reason, ...rest };
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/suspend`, payload);
  return res?.data?.data;
}

export async function reactivateArtistRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/reactivate`);
  return res?.data?.data;
}

export async function updateArtistGenresRequest({ id, body, genres, ...rest }) {
  const payload = body || { genres: genres || rest };
  const res = await axiosPrivate.patch(`/admin/artist-verification/${id}/genres`, payload);
  return res?.data?.data;
}

export async function deleteArtistRequest({ id, password, body }) {
  const res = await axiosPrivate.delete(`/admin/artist-verification/${id}`, {
    data: body || { password },
  });
  return res?.data?.data;
}
