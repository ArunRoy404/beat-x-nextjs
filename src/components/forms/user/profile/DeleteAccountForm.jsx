"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonFormActions from "@/components/shared/CommonFormActions"
import { deleteAccountSchema } from "@/zodSchema/UserProfileZodSchema"
import { useDeleteAccount } from "@/hooks/api/user/profile/useDeleteAccount"

const DeleteAccountForm = ({ onCancel }) => {
    const { mutate: deleteAccount, isPending } = useDeleteAccount()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(deleteAccountSchema),
        defaultValues: { password: "" },
    })

    const onSubmit = ({ password }) => {
        deleteAccount({ password })
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="shrink-0 rounded-[12px] border border-dashed border-red-error/30 bg-red-error/5 p-4">
                <p className="text-[12px] leading-[18px] text-red-error">
                    This permanently deletes your account, library and purchase history. It cannot be undone.
                </p>
            </div>

            <CommonInput
                label="Confirm Password"
                type="password"
                placeholder="Enter your password"
                leftIcon={<Lock className="h-5 w-5" />}
                className="rounded-full border-white/10 bg-white/[0.03]"
                {...register("password")}
                error={errors.password?.message}
            />

            <CommonFormActions
                onCancel={onCancel}
                submitLabel="Delete Account"
                submitVariant="default"
                submitClassName="border-0 bg-red-error text-whitetext hover:bg-red-error/90"
                isPending={isPending}
            />
        </CommonFormContainer>
    )
}

export default DeleteAccountForm
