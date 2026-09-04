import { axiosPrivate } from "@/lib/axios/axiosPrivate";

/**
 * Raw API calls for the admin videos resource.
 */
export async function getVideosRequest({ status, genre, q, page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/admin/videos", {
    params: { status, genre, q, page, limit },
  });
  return res.data.data;
}

export async function getVideoDetailRequest({ id }) {
  const res = await axiosPrivate.get(`/admin/videos/${id}`);
  return res.data.data;
}

export async function createVideoRequest(formData) {
  const res = await axiosPrivate.post("/admin/videos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function updateVideoRequest({ id, body }) {
  const res = await axiosPrivate.patch(`/admin/videos/${id}`, body);
  return res.data.data;
}

export async function updateVideoCoverRequest({ id, file }) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosPrivate.patch(`/admin/videos/${id}/cover`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
}

export async function deleteVideoRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/videos/${id}`);
  return res.data.data;
}
