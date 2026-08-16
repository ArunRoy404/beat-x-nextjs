import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin audiobooks resource (+ nested chapters).
 * Kept separate from hooks so the request shape can be reused outside
 * React if ever needed.
 */
export async function getAudioBooksRequest({ status, genre, q, page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/admin/audiobooks", {
    params: { status, genre, q, page, limit },
  });
  return res.data.data;
}

// No dedicated /admin/audiobooks/:id route exists — the public detail
// endpoint accepts a bearer token too and is the only way to fetch a
// single audiobook's full chapter list.
export async function getAudioBookDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/audiobooks/${id}`);
  return res.data.data;
}

export async function createAudioBookRequest(formData) {
  const res = await axiosPrivate.post("/admin/audiobooks", formData);
  return res.data.data;
}

export async function deleteAudioBookRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/audiobooks/${id}`);
  return res.data.data;
}

// Async: the backend accepts the audio upload and immediately returns a
// trackingId — actual processing/transcode progress is tracked separately
// via GET /uploads/:uploadId/progress (SSE, see useUploadProgress).
export async function createChapterRequest({ audiobookId, formData }) {
  const res = await axiosPrivate.post(`/admin/audiobooks/${audiobookId}/chapters`, formData);
  return res.data.data;
}

export async function updateChapterRequest({ audiobookId, chapterId, formData }) {
  const res = await axiosPrivate.patch(`/admin/audiobooks/${audiobookId}/chapters/${chapterId}`, formData);
  return res.data.data;
}

export async function deleteChapterRequest({ audiobookId, chapterId }) {
  const res = await axiosPrivate.delete(`/admin/audiobooks/${audiobookId}/chapters/${chapterId}`);
  return res.data.data;
}
