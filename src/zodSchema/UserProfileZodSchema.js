import { z } from "zod"

// PATCH /users/profile documents the avatar as: optional, jpg/jpeg/png/webp,
// max 5MB. Enforced here so a bad file is caught before the upload starts.
export const AVATAR_MAX_BYTES = 5 * 1024 * 1024
export const AVATAR_ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const editProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().optional(),
    avatar: z
        .any()
        .optional()
        .refine(
            (file) => !file || !(file instanceof File) || file.size <= AVATAR_MAX_BYTES,
            "Avatar must be 5MB or smaller"
        )
        .refine(
            (file) => !file || !(file instanceof File) || AVATAR_ACCEPTED_TYPES.includes(file.type),
            "Avatar must be a JPG, PNG or WEBP image"
        ),
})

export const deleteAccountSchema = z.object({
    password: z.string().min(1, "Password is required to delete your account"),
})
