import { z } from "zod"

export const audioBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  narrator: z.string().min(1, "Narrator is required"),
  synopsis: z.string().min(1, "Synopsis is required"),
  language: z.string().min(1, "Language is required"),
  genre: z.string().min(1, "Genre is required"),
  status: z.string().min(1, "Status is required"),
  isBestseller: z.boolean(),
  isTrending: z.boolean(),
  isFeatured: z.boolean(),
  bestsellerRank: z.string().optional(),
  trendDirection: z.string().optional(),
  publishedAt: z.date({ required_error: "Published date is required", invalid_type_error: "Published date is required" }),
})
