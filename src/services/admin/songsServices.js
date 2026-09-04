import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin songs resource (Admin Only, No Artist Upload
 * Path). Kept separate from hooks so the request shape can be reused
 * outside React if ever needed.
 */
export async function getSongsRequest({ status, genre, album, q, page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/admin/songs", {
    params: { status, genre, album, q, page, limit },
  });
  return res.data.data;
}

export async function getSongDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/songs/${id}`);
  return res.data.data;
}

// Async: the backend accepts the audio upload and immediately returns a
// trackingId; the song record exists right away, audio processing finishes
// server-side and updates on its own via the periodic refetch.
export async function createSongRequest(formData) {
  const res = await axiosPrivate.post("/admin/songs", formData);
  return res.data.data;
}

// Behaves like create (async, resolves with a trackingId) only when a new
// audio file is included; text-only edits apply immediately and return the
// updated song. Callers should check for a trackingId on the result.
export async function updateSongRequest({ id, formData }) {
  const res = await axiosPrivate.patch(`/admin/songs/${id}`, formData);
  return res.data.data;
}

// Take Down / Restore both hit this same route with a JSON { status } body.
export async function updateSongStatusRequest({ id, status }) {
  const res = await axiosPrivate.patch(`/admin/songs/${id}`, { status });
  return res.data.data;
}

export async function deleteSongRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/songs/${id}`);
  return res.data?.data ?? res.data ?? true;
}

export async function approveSongRequest({ id }) {
  const res = await axiosPrivate.patch(`/admin/songs/${id}/approve`);
  return res.data?.data ?? res.data;
}

export async function rejectSongRequest({ id, reason }) {
  const res = await axiosPrivate.patch(`/admin/songs/${id}/reject`, { reason });
  return res.data?.data ?? res.data;
}
