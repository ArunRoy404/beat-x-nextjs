import { z } from "zod"

export const uploadPodcastSchema = z.object({
  audioFile: z.any().refine((file) => file !== null, {
    message: "Audio file is required",
  }),
  coverImage: z.any().optional(),
  episodeTitle: z.string().min(1, "Episode title is required"),
  artist: z.string().min(1, "Artist/Host name is required"),
  seriesName: z.string().min(1, "Series name is required"),
  category: z.string().min(1, "Category is required"),
  season: z.string().min(1, "Season number is required"),
  episodeNumber: z.string().min(1, "Episode number is required"),
  releaseDate: z.date({
    required_error: "Release date is required",
    invalid_type_error: "Release date is required",
  }),
  description: z.string().optional(),
  visibility: z.enum(["publish", "schedule", "draft"]),
  isExplicit: z.boolean(),
})

export const editPodcastSchema = z.object({
  audioFile: z.any().optional(),
  coverImage: z.any().optional(),
  episodeTitle: z.string().min(1, "Episode title is required"),
  artist: z.string().min(1, "Artist/Host name is required"),
  seriesName: z.string().min(1, "Series name is required"),
  category: z.string().min(1, "Category is required"),
  season: z.string().min(1, "Season number is required"),
  episodeNumber: z.string().min(1, "Episode number is required"),
  releaseDate: z.date({
    required_error: "Release date is required",
    invalid_type_error: "Release date is required",
  }),
  description: z.string().optional(),
  visibility: z.enum(["publish", "schedule", "draft"]),
  isExplicit: z.boolean(),
})

export const uploadPodcastDefaultValues = {
  audioFile: null,
  coverImage: null,
  episodeTitle: "",
  artist: "",
  seriesName: "",
  category: "",
  season: "",
  episodeNumber: "",
  releaseDate: null,
  description: "",
  visibility: "publish",
  isExplicit: false,
}
