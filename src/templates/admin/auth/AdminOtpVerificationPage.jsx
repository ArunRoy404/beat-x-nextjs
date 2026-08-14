"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonOtpInput from "@/components/shared/CommonInputs/CommonOtpInput/CommonOtpInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"
import { useForgotPassword } from "@/hooks/api/auth/useForgotPassword"

const RESEND_SECONDS = 45

const AdminOtpVerificationPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const { mutate: sendResetCode, isPending: isResending } = useForgotPassword()

    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)

    useEffect(() => {
        if (!email) {
            router.replace("/admin/forgot-password")
        }
    }, [email, router])

    useEffect(() => {
        if (secondsLeft <= 0) return
        const timer = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [secondsLeft])

    const handleResend = () => {
        sendResetCode(
            { email },
            {
                onSuccess: () => {
                    setSecondsLeft(RESEND_SECONDS)
                    toast.success("Verification code resent!")
                },
                onError: (error) => {
                    toast.error(error.message || "Could not resend verification code")
                },
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (otp.length !== 6) {
            setError("Enter the 6 digit verification code")
            return
        }
        setError("")
        router.push(`/admin/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`)
    }

    return (
        <AuthLayout
            backHref="/admin/forgot-password"
            title="OTP Verification"
            description="Please check your email and enter the 6 digit verification code to continue. The code will expire shortly for security reasons."
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
                <CommonOtpInput
                    length={6}
                    value={otp}
                    onChange={(val) => {
                        setOtp(val)
                        if (error) setError("")
                    }}
                    error={error}
                />

                <Button type="submit" variant="gradient" size="lg" className="w-full mt-2">
                    Verify Now
                </Button>

                {secondsLeft > 0 ? (
                    <span className="text-secondary text-[13px] font-medium">
                        Resend Code in {secondsLeft}s
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-secondary text-[13px] font-medium hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending ? "Resending..." : "Resend Code"}
                    </button>
                )}
            </form>
        </AuthLayout>
    )
}

export default AdminOtpVerificationPage
