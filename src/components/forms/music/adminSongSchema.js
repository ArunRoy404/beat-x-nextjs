import { z } from "zod"

export const songSchema = z.object({
  title: z.string().min(1, "Song title is required"),
  artist: z.string().min(1, "Artist name is required"),
  genre: z.string().min(1, "Genre is required"),
  explicit: z.boolean(),
  visibility: z.enum(["publish", "schedule", "draft"]),
  scheduledAt: z.date().optional(),
}).refine((data) => data.visibility !== "schedule" || data.scheduledAt, {
  message: "Scheduled date is required",
  path: ["scheduledAt"],
})
