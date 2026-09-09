"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonFormActions from "@/components/shared/CommonFormActions"
import ProfileAvatarPicker from "@/components/user/profile/ProfileAvatarPicker"
import { editProfileSchema } from "@/zodSchema/UserProfileZodSchema"
import { useUpdateProfile } from "@/hooks/api/user/profile/useUpdateProfile"

const inputClassName = "rounded-full bg-white/[0.03] border-white/10"

const EditProfileForm = ({ profile, onSuccess, onCancel }) => {
    const { mutate: updateProfile, isPending } = useUpdateProfile()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: profile?.name ?? "",
            phone: profile?.phone ?? "",
            avatar: profile?.avatar ?? undefined,
        },
    })

    const onSubmit = ({ name, phone, avatar }) => {
        const formData = new FormData()
        formData.append("name", name)
        if (phone) formData.append("phone", phone)
        // Only send the file when a new one was picked — the existing avatar
        // comes back from the API as a string and must not be re-uploaded.
        if (avatar instanceof File) formData.append("avatar", avatar)

        updateProfile(formData, {
            onSuccess: () => {
                onSuccess?.()
            },
        })
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                    <ProfileAvatarPicker
                        value={field.value}
                        name={profile?.name}
                        onChange={field.onChange}
                        error={errors.avatar?.message}
                    />
                )}
            />

            <CommonInput
                label="Full Name"
                placeholder="Your name"
                className={inputClassName}
                {...register("name")}
                error={errors.name?.message}
            />

            <CommonInput
                label="Phone"
                type="tel"
                placeholder="+15551234567"
                className={inputClassName}
                {...register("phone")}
                error={errors.phone?.message}
            />

            <CommonFormActions
                onCancel={onCancel}
                submitLabel="Save Changes"
                isPending={isPending}
            />
        </CommonFormContainer>
    )
}

export default EditProfileForm
