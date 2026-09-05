"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"

const REDIRECT_DELAY_MS = 3000

const textVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
    },
}

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

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mx-4 flex w-full max-w-328 items-center justify-center rounded-[48px] p-6 backdrop-blur-[20px] lg:p-12"
                style={{ borderColor: "var(--auth-wide-outer-border)", borderWidth: 1, borderStyle: "solid" }}
            >
                <div
                    className="flex w-full items-center justify-center rounded-[48px] p-6 backdrop-blur-[5px] sm:p-12"
                    style={{ background: "var(--auth-wide-inner-bg)", borderColor: "var(--auth-wide-inner-border)", borderWidth: 1, borderStyle: "solid" }}
                >
                    <div className="flex w-full max-w-113 flex-col items-center gap-4 rounded-[24px] border border-dark-accent p-6 backdrop-blur-[10px]">
                        <div className="relative flex items-center justify-center">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: [0, 0.5, 0], scale: [0.6, 1.25, 1.5] }}
                                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2, repeat: Infinity, repeatDelay: 0.6 }}
                                className="absolute inset-0 rounded-full bg-secondary/30 blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                            >
                                <Image src="/icons/auth/reset-success-shield.svg" alt="" width={180} height={178} className="relative h-36 w-36.25 sm:h-44.5 sm:w-44.75" />
                            </motion.div>
                        </div>

                        <motion.div variants={textVariants} initial="hidden" animate="show" className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-whitetext text-[24px] font-semibold">Successful!</h1>
                            <p className="text-light-gray text-[16px]">
                                Your Password is Changed Successfully. Now You Can be redirected to the Home page in a few seconds..
                            </p>
                        </motion.div>

                        <Spinner className="size-6 text-secondary" />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default UserResetPasswordSuccessPage
