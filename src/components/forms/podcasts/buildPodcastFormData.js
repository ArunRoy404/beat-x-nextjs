import { PODCAST_STATUS } from "@/lib/constants/podcastStatus"

/**
 * Builds the multipart body for POST /creator/podcasts (the shared
 * admin/artist create route). Admin-created content publishes immediately
 * per whatever status is sent — no pending_review queueing.
 */
export function buildPodcastFormData(data) {
  const formData = new FormData()

  if (data?.title) formData.append("title", data.title)
  if (data?.description) formData.append("description", data.description)
  if (data?.language) formData.append("language", data.language)
  if (data?.category) formData.append("category", data.category)

  const status =
    data?.status ||
    (data?.visibility === "publish"
      ? PODCAST_STATUS.ACTIVE
      : data?.visibility === "schedule"
        ? PODCAST_STATUS.SCHEDULED
        : PODCAST_STATUS.DRAFT)
  formData.append("status", status)

  if (data?.visibility === "schedule" && data?.scheduledAt) {
    formData.append("scheduledAt", data.scheduledAt.toISOString())
  }

  if (data?.cover instanceof File) formData.append("cover", data.cover)

  return formData
}
