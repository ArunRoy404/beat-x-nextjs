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

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "New password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "New password must be different from your current one",
        path: ["newPassword"],
    })
