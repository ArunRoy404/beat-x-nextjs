"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"

const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

const AdminResetPasswordPage = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: "", confirmPassword: "" },
    })

    const onSubmit = () => {
        toast.success("Password changed successfully!")
        router.push("/admin/reset-password/success")
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

                <Button type="submit" variant="gradient" size="lg" className="w-full mt-2">
                    Change Password
                </Button>
            </form>
        </AuthLayout>
    )
}

export default AdminResetPasswordPage
