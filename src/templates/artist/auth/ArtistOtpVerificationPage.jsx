"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommonOtpInput from "@/components/shared/CommonInputs/CommonOtpInput/CommonOtpInput"
import ArtistAuthLayout from "@/components/shared/AuthLayout/ArtistAuthLayout"

const RESEND_SECONDS = 45

const ArtistOtpVerificationPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)

    useEffect(() => {
        if (!email) {
            router.replace("/artist/register")
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
        setSecondsLeft(RESEND_SECONDS)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (otp.length !== 6) {
            setError("Enter the 6 digit verification code")
            return
        }
        setError("")
        router.push("/artist/verification/personal-info")
    }

    return (
        <ArtistAuthLayout
            backHref="/artist/register"
            stepLabel="Step 2 of 3 — Verify OTP"
            progressPercent={59}
            title="Verify Your Account"
            description="Enter the OTP sent to your email/phone"
        >
            <div className="flex w-full flex-col items-center gap-4">
                <span className="flex size-13 shrink-0 items-center justify-center rounded-[16px] border border-secondary bg-secondary/10 text-secondary">
                    <Mail className="w-7 h-7" />
                </span>

                <p className="text-light-gray text-[16px] text-center w-full">
                    We sent a 6-digit code to <span className="text-whitetext font-semibold">{email}</span> and your phone number.
                </p>

                <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-6">
                    <CommonOtpInput
                        length={6}
                        value={otp}
                        onChange={(val) => {
                            setOtp(val)
                            if (error) setError("")
                        }}
                        error={error}
                        rootClassName="gap-2"
                        inputClassName="size-12 sm:size-16 md:size-20 rounded-[16px] border-transparent bg-(--otp-input-bg) text-light-gray text-[16px] font-semibold"
                    />

                    {secondsLeft > 0 ? (
                        <span className="text-light-gray text-[13px]">
                            Didn&apos;t receive it? <span className="text-secondary font-medium">Resend Code in {secondsLeft}s</span>
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

                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                        Verify OTP
                    </Button>
                </form>
            </div>
        </ArtistAuthLayout>
    )
}

export default ArtistOtpVerificationPage
