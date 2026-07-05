import { z } from "zod"

export const uploadSongSchema = z.object({
  audioFile: z.any().refine((file) => file !== null, {
    message: "Audio file is required",
  }),
  coverImage: z.any().optional(),
  songTitle: z.string().min(1, "Song title is required"),
  artist: z.string().min(1, "Artist name is required"),
  album: z.string().optional(),
  genre: z.string().min(1, "Genre is required"),
  releaseDate: z.date({
    required_error: "Release date is required",
    invalid_type_error: "Release date is required",
  }),
  description: z.string().optional(),
  visibility: z.enum(["publish", "schedule", "draft"]),
  isExplicit: z.boolean(),
})

export const uploadSongDefaultValues = {
  audioFile: null,
  coverImage: null,
  songTitle: "",
  artist: "",
  album: "",
  genre: "",
  releaseDate: null,
  description: "",
  visibility: "publish",
  isExplicit: false,
}