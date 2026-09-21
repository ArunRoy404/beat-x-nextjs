import { axiosPrivate } from "@/lib/axios/axiosPrivate";

export async function getAudiobookReviewsRequest({ audiobookId, page = 1, limit = 20 } = {}) {
  const res = await axiosPrivate.get("/admin/audiobooks/reviews", {
    params: { audiobookId, page, limit },
  });
  return res?.data?.data;
}

export async function moderateAudiobookReviewRequest({ id, hidden, reason = "Admin moderation" }) {
  const res = await axiosPrivate.patch(`/admin/audiobooks/reviews/${id}/moderate`, { hidden, reason });
  return res?.data?.data ?? res?.data;
}

export async function deleteAudiobookReviewRequest({ id }) {
  const res = await axiosPrivate.delete(`/admin/audiobooks/reviews/${id}`);
  return res?.data?.data ?? res?.data ?? true;
}
