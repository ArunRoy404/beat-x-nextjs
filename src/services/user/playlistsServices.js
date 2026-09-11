import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for user/public playlists management.
 */
export async function getMyPlaylistsRequest({ page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/playlists/mine", {
    params: { page, limit },
  });
  return res?.data?.data ?? res?.data;
}

export async function getPlaylistDetailRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.get(`/playlists/${id}`);
  return res?.data?.data ?? res?.data;
}

export async function createPlaylistRequest(payload) {
  const res = await axiosPrivate.post("/playlists", payload);
  return res?.data?.data ?? res?.data;
}

export async function updatePlaylistRequest(id, payload) {
  if (!id) return null;
  const res = await axiosPrivate.patch(`/playlists/${id}`, payload);
  return res?.data?.data ?? res?.data;
}

export async function deletePlaylistRequest(id) {
  if (!id) return null;
  const res = await axiosPrivate.delete(`/playlists/${id}`);
  return res?.data?.data ?? res?.data;
}

export async function addSongToPlaylistRequest({ playlistId, songId }) {
  if (!playlistId || !songId) return null;
  const res = await axiosPrivate.post(`/playlists/${playlistId}/songs`, { songId });
  return res?.data?.data ?? res?.data;
}

export async function removeSongFromPlaylistRequest({ playlistId, songId }) {
  if (!playlistId || !songId) return null;
  const res = await axiosPrivate.delete(`/playlists/${playlistId}/songs/${songId}`);
  return res?.data?.data ?? res?.data;
}
