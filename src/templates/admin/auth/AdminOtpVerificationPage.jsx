"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonOtpInput from "@/components/shared/CommonInputs/CommonOtpInput/CommonOtpInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"

const RESEND_SECONDS = 45

const AdminOtpVerificationPage = () => {
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)

    useEffect(() => {
        if (secondsLeft <= 0) return
        const timer = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [secondsLeft])

    const handleResend = () => {
        setSecondsLeft(RESEND_SECONDS)
        toast.success("Verification code resent!")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (otp.length !== 6) {
            setError("Enter the 6 digit verification code")
            return
        }
        setError("")
        toast.success("Code verified successfully!")
        router.push("/admin/reset-password")
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
                        className="text-secondary text-[13px] font-medium hover:underline cursor-pointer"
                    >
                        Resend Code
                    </button>
                )}
            </form>
        </AuthLayout>
    )
}

export default AdminOtpVerificationPage
