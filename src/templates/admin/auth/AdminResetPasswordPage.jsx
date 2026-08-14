"use client"

import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"
import { useResetPassword } from "@/hooks/api/auth/useResetPassword"

const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

const AdminResetPasswordPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const otp = searchParams.get("otp")
    const { mutate: resetPassword, isPending } = useResetPassword()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: "", confirmPassword: "" },
    })

    useEffect(() => {
        if (!email || !otp) {
            router.replace("/admin/forgot-password")
        }
    }, [email, otp, router])

    const onSubmit = ({ newPassword }) => {
        resetPassword(
            { email, otp, newPassword },
            {
                onSuccess: () => {
                    toast.success("Password changed successfully!")
                    router.push("/admin/reset-password/success")
                },
                onError: (error) => {
                    toast.error(error.message || "Could not reset password")
                },
            }
        )
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <AuthLayout
            backHref="/admin/otp-verification"
            title="Reset Password?"
            description="Please enter a new password for your account. Use a strong password to keep your account secure."
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4 w-full">
                <CommonInput
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock className="w-4 h-4" />}
                    {...register("newPassword")}
                    error={errors.newPassword?.message}
                />

                <CommonInput
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock className="w-4 h-4" />}
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />

                <Button type="submit" variant="gradient" size="lg" className="w-full mt-2" isLoading={isPending}>
                    Change Password
                </Button>
            </form>
        </AuthLayout>
    )
}

export default AdminResetPasswordPage
