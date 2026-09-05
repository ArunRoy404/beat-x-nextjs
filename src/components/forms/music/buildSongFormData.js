export function buildSongFormData(data) {
  const formData = new FormData()

  if (data.title) formData.append("title", data.title)
  if (data.artist) formData.append("artist", data.artist)
  if (data.genre) formData.append("genre", data.genre)
  if (data.explicit !== undefined) formData.append("explicit", String(data.explicit))

  const status = data.status || (data.visibility === "publish" ? "active" : "draft")
  formData.append("status", status)

  if (data.visibility === "schedule" && data.scheduledAt) {
    formData.append("scheduledAt", data.scheduledAt.toISOString())
  }

  if (data.audio instanceof File) formData.append("audio", data.audio)
  if (data.cover instanceof File) formData.append("cover", data.cover)

  return formData
}
