import { z } from "zod";

export const playlistSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Playlist title is required")
    .max(100, "Playlist title cannot exceed 100 characters"),
});
