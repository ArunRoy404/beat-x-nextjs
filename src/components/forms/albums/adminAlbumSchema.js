import { z } from "zod"

const baseAlbumFields = {
  title: z.string().min(1, "Album title is required"),
  artist: z.string().min(1, "Artist name is required"),
  genre: z.string().min(1, "Genre is required"),
  explicit: z.boolean(),
  visibility: z.enum(["publish", "schedule", "draft"]),
  scheduledAt: z.date().optional(),
}

// Create Album (form-data) doesn't accept isFeatured — that's an
// editorial flag only exposed on the Update Album (Admin) route.
export const createAlbumSchema = z.object({
  coverImage: z.any().optional(),
  ...baseAlbumFields,
}).refine((data) => data.visibility !== "schedule" || data.scheduledAt, {
  message: "Scheduled date is required",
  path: ["scheduledAt"],
})

export const editAlbumSchema = z.object({
  coverImage: z.any().optional(),
  ...baseAlbumFields,
  isFeatured: z.boolean(),
}).refine((data) => data.visibility !== "schedule" || data.scheduledAt, {
  message: "Scheduled date is required",
  path: ["scheduledAt"],
})
