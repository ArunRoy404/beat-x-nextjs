export function buildSongFormData(data) {
  const formData = new FormData()

  formData.append("title", data.title)
  formData.append("artist", data.artist)
  formData.append("genre", data.genre)
  formData.append("explicit", String(data.explicit))

  formData.append("status", data.visibility === "publish" ? "active" : "draft")
  if (data.visibility === "schedule" && data.scheduledAt) {
    formData.append("scheduledAt", data.scheduledAt.toISOString())
  }

  if (data.audio instanceof File) formData.append("audio", data.audio)
  if (data.cover instanceof File) formData.append("cover", data.cover)

  return formData
}
