export function buildAudioBookFormData(data) {
  const formData = new FormData()

  formData.append("title", data.title)
  formData.append("author", data.author)
  formData.append("narrator", data.narrator)
  formData.append("synopsis", data.synopsis)
  formData.append("language", data.language)
  formData.append("genre", data.genre)
  formData.append("status", data.status)
  formData.append("isBestseller", String(data.isBestseller))
  formData.append("isTrending", String(data.isTrending))
  formData.append("isFeatured", String(data.isFeatured))

  if (data.bestsellerRank) formData.append("bestsellerRank", data.bestsellerRank)
  if (data.trendDirection) formData.append("trendDirection", data.trendDirection)
  if (data.publishedAt) formData.append("publishedAt", data.publishedAt.toISOString())
  if (data.cover instanceof File) formData.append("cover", data.cover)

  return formData
}
