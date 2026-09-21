import { z } from "zod"

// Scoped to description/status/scheduledAt plus the admin-only editorial
// flags. PATCH /admin/podcasts/{id} also accepts title/language/category/
// ownerId, but editing those isn't wired up on this form yet — left out
// deliberately for now, not because they belong to a different route.
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

// POST /creator/podcasts (the shared admin/artist create route) — creates a
// top-level podcast show. Cover is required by the contract (max 5MB).
export const podcastCreateSchema = z.object({
  title: z.string().min(1, "Podcast title is required"),
  description: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  category: z.string().min(1, "Category is required"),
  visibility: z.enum(["publish", "schedule", "draft"]),
  scheduledAt: z.date().optional(),
}).refine((data) => data.visibility !== "schedule" || data.scheduledAt, {
  message: "Scheduled date is required",
  path: ["scheduledAt"],
})
