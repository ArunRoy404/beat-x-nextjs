/**
 * Builds the multipart body for POST /admin/audiobooks (create only — edits
 * go through updateAudioBookRequest as plain JSON instead). The create DTO
 * only documents title/author/narrator/synopsis/language/genre/status/cover;
 * isBestseller/isTrending/isFeatured/bestsellerRank/trendDirection/
 * publishedAt only appear in the PATCH field list, so they're deliberately
 * not sent here.
 */
export function buildAudioBookFormData(data) {
  const formData = new FormData()

  formData.append("title", data.title)
  formData.append("author", data.author)
  formData.append("narrator", data.narrator)
  formData.append("synopsis", data.synopsis)
  formData.append("language", data.language)
  formData.append("genre", data.genre)
  formData.append("status", data.status)
  if (data.cover instanceof File) formData.append("cover", data.cover)

  return formData
}
