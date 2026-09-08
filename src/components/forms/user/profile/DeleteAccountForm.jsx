"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import { deleteAccountSchema } from "@/zodSchema/UserProfileZodSchema"
import { useDeleteAccount } from "@/hooks/api/user/profile/useDeleteAccount"

const DeleteAccountForm = ({ onCancel }) => {
    const router = useRouter()
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
        deleteAccount(
            { password },
            {
                onSuccess: () => {
                    toast.success("Your account has been deleted.")
                    router.push("/register")
                    router.refresh()
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to delete your account.")
                },
            }
        )
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

            <div className="flex shrink-0 items-center justify-end gap-3 pt-2">
                <Button type="button" variant="outline" size="lg" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="destructive"
                    size="lg"
                    isLoading={isPending}
                    className="bg-red-error/15 text-red-error hover:bg-red-error/25"
                >
                    Delete Account
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default DeleteAccountForm
