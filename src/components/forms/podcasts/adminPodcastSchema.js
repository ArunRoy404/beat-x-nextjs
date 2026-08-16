import { z } from "zod"

// Scoped to what the Admin — Update Podcast (Moderation) endpoint actually
// accepts: description/status/scheduledAt (shared with the Creator update
// route) plus the admin-only editorial flags. Content fields like title,
// language, genre, or cover/audio replacement belong to the Creator —
// Update Podcast route, which isn't wired up here.
export const podcastModerationSchema = z.object({
  description: z.string().optional(),
  visibility: z.enum(["publish", "schedule", "draft"]),
  scheduledAt: z.date().optional(),
  isFeatured: z.boolean(),
  isTrending: z.boolean(),
  trendDirection: z.enum(["up", "down", "stable"]),
}).refine((data) => data.visibility !== "schedule" || data.scheduledAt, {
  message: "Scheduled date is required",
  path: ["scheduledAt"],
})
