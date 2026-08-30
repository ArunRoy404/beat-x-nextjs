"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

const REDIRECT_DELAY_MS = 3000

const UserResetPasswordSuccessPage = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/")
        }, REDIRECT_DELAY_MS)
        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            <Image src="/bg-images/dashboard_bg.png" alt="" fill priority sizes="100vw" className="object-cover" />

            <div
                className="relative z-10 mx-4 flex w-full max-w-328 items-center justify-center rounded-[48px] p-6 backdrop-blur-[20px] lg:p-12"
                style={{ borderColor: "var(--auth-wide-outer-border)", borderWidth: 1, borderStyle: "solid" }}
            >
                <div
                    className="flex w-full items-center justify-center rounded-[48px] p-6 backdrop-blur-[5px] sm:p-12"
                    style={{ background: "var(--auth-wide-inner-bg)", borderColor: "var(--auth-wide-inner-border)", borderWidth: 1, borderStyle: "solid" }}
                >
                    <div className="flex w-full max-w-113 flex-col items-center gap-4 rounded-[24px] border border-dark-accent p-6 backdrop-blur-[10px]">
                        <Image src="/icons/auth/reset-success-shield.svg" alt="" width={180} height={178} className="h-36 w-36.25 sm:h-44.5 sm:w-44.75" />

                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-whitetext text-[24px] font-semibold">Successful!</h1>
                            <p className="text-light-gray text-[16px]">
                                Your Password is Changed Successfully. Now You Can be redirected to the Home page in a few seconds..
                            </p>
                        </div>

                        <Spinner className="size-6 text-secondary" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserResetPasswordSuccessPage
