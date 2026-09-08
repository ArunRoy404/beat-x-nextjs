"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { toast } from "sonner"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonFormActions from "@/components/shared/CommonFormActions"
import { changePasswordSchema } from "@/zodSchema/UserProfileZodSchema"
import { useChangePassword } from "@/hooks/api/user/profile/useChangePassword"

const inputClassName = "rounded-full bg-white/[0.03] border-white/10"

const ChangePasswordForm = ({ onSuccess, onCancel }) => {
    const { mutate: changePassword, isPending } = useChangePassword()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const onSubmit = (values) => {
        changePassword(values, {
            onSuccess: () => {
                toast.success("Password changed successfully!")
                reset()
                onSuccess?.()
            },
            onError: (error) => {
                toast.error(error?.message || "Failed to change your password.")
            },
        })
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <CommonInput
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
                leftIcon={<Lock className="h-5 w-5" />}
                className={inputClassName}
                {...register("currentPassword")}
                error={errors.currentPassword?.message}
            />

            <CommonInput
                label="New Password"
                type="password"
                placeholder="Min. 8 characters"
                leftIcon={<Lock className="h-5 w-5" />}
                className={inputClassName}
                {...register("newPassword")}
                error={errors.newPassword?.message}
            />

            <CommonInput
                label="Confirm New Password"
                type="password"
                placeholder="Re-enter your new password"
                leftIcon={<Lock className="h-5 w-5" />}
                className={inputClassName}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
            />

            <CommonFormActions
                onCancel={onCancel}
                submitLabel="Change Password"
                isPending={isPending}
            />
        </CommonFormContainer>
    )
}

export default ChangePasswordForm
