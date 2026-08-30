"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"
import { useForgotPassword } from "@/hooks/api/auth/useForgotPassword"

const forgotPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
})

const UserForgotPasswordPage = () => {
    const router = useRouter()
    const { mutate: sendResetCode, isPending } = useForgotPassword()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    })

    const onSubmit = ({ email }) => {
        sendResetCode(
            { email },
            {
                onSuccess: () => {
                    toast.success("Verification code sent to your email!")
                    router.push(`/otp-verification?email=${encodeURIComponent(email)}`)
                },
                onError: (error) => {
                    toast.error(error.message || "Could not send verification code")
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
            wideShell
            title="Forgot Password?"
            titleClassName="text-whitetext"
            description="If you need help resetting your password, we can help by sending you a link to reset it."
            descriptionClassName="text-[16px] max-w-none"
            cardClassName="max-w-126"
            gapClassName="gap-4"
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4 w-full">
                <CommonInput
                    label="Email"
                    type="email"
                    placeholder="artist@example.com"
                    leftIcon={<Mail className="w-5 h-5" />}
                    className="rounded-[16px] bg-dark-accent border-transparent"
                    {...register("email")}
                    error={errors.email?.message}
                />

                <Button type="submit" variant="gradient" size="lg" className="w-full mt-2" isLoading={isPending}>
                    Continue
                </Button>
            </form>
        </AuthLayout>
    )
}

export default UserForgotPasswordPage
