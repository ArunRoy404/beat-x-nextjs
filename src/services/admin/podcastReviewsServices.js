import { axiosPrivate } from "@/lib/axios/axiosPrivate";

export async function getPodcastReviewsRequest({ podcastId, page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/admin/podcasts/reviews", {
    params: { podcastId, page, limit },
  });
  return res.data.data;
}

export async function moderateReviewRequest({ id, hidden, reason }) {
  const res = await axiosPrivate.patch(`/admin/podcasts/reviews/${id}/moderate`, { hidden, reason });
  return res.data.data;
}

export async function deleteReviewRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/podcasts/reviews/${id}`);
  return res.data.data;
}
