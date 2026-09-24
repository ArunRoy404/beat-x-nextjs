import { z } from "zod"

// POST /admin/audiobooks — the documented create formdata is title/author/
// narrator/synopsis/language/genre/status/cover only. isBestseller/isTrending/
// isFeatured/bestsellerRank/trendDirection/publishedAt only appear in the
// PATCH field list (admin-editorial fields set after creation), so they're
// left out of create entirely rather than guessed at.
export const audioBookCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  narrator: z.string().min(1, "Narrator is required"),
  synopsis: z.string().min(1, "Synopsis is required"),
  language: z.string().min(1, "Language is required"),
  genre: z.string().min(1, "Genre is required"),
  status: z.string().min(1, "Status is required"),
})

// PATCH /admin/audiobooks/{id} — all fields optional per the contract, but
// kept required here to match how the edit form is actually used (always
// editing a complete, already-published record).
export const audioBookSchema = audioBookCreateSchema.extend({
  isBestseller: z.boolean(),
  isTrending: z.boolean(),
  isFeatured: z.boolean(),
  bestsellerRank: z.string().optional(),
  trendDirection: z.string().optional(),
  publishedAt: z.date({ required_error: "Published date is required", invalid_type_error: "Published date is required" }),
})
