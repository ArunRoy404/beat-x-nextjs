import { z } from "zod"

export const addArtistSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  stageName: z.string().min(1, "Stage name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  genre: z.string().min(1, "Genre is required"),
})

export const addArtistDefaultValues = {
  fullName: "",
  stageName: "",
  email: "",
  nationality: "",
  gender: "",
  genre: "",
}
