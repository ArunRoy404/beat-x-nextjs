import { SONG_STATUS } from "@/lib/constants/songStatus"

/**
 * Builds the multipart body for POST/PATCH /admin/songs.
 *
 * `isFeatured`/`isTrending` come from AdminUpdateSongDto and are only sent
 * when the caller actually supplies them (the create DTO has no such fields).
 * `trendDirection` is intentionally left out: the API accepts it but does not
 * document its allowed values, so there's nothing to offer without guessing.
 */
export function buildSongFormData(data) {
  const formData = new FormData()

  if (data?.title) formData.append("title", data.title)
  if (data?.artist) formData.append("artist", data.artist)
  if (data?.genre) formData.append("genre", data.genre)
  if (data?.album && data.album !== "none") formData.append("album", data.album)
  if (data?.explicit !== undefined) formData.append("explicit", String(data.explicit))

  const status =
    data?.status ||
    (data?.visibility === "publish"
      ? SONG_STATUS.ACTIVE
      : data?.visibility === "schedule"
        ? SONG_STATUS.SCHEDULED
        : SONG_STATUS.DRAFT)
  formData.append("status", status)

  if (data?.visibility === "schedule" && data?.scheduledAt) {
    formData.append("scheduledAt", data.scheduledAt.toISOString())
  }

  if (data?.isFeatured !== undefined) formData.append("isFeatured", String(data.isFeatured))
  if (data?.isTrending !== undefined) formData.append("isTrending", String(data.isTrending))

  if (data?.audio instanceof File) formData.append("audio", data.audio)
  if (data?.cover instanceof File) formData.append("cover", data.cover)

  return formData
}
