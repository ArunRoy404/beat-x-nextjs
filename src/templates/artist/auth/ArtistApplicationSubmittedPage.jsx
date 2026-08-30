"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const STATUS_ITEMS = [
    { label: "Account Created", state: "done" },
    { label: "OTP Verified", state: "done" },
    { label: "Application Submitted", state: "done" },
    { label: "Under Review", state: "current" },
    { label: "Decision", state: "upcoming" },
]

const textVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
    },
}

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
}

const rowVariants = {
    hidden: { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const StatusRow = ({ label, state }) => (
    <motion.div variants={rowVariants} className="flex items-center gap-3">
        <span
            className={cnState(state)}
        >
            {state === "done" && <Check className="size-3 text-green-success" />}
            {state === "current" && <Clock className="size-3 text-yellow-warning" />}
            {state === "upcoming" && <span className="size-1.5 rounded-full bg-white/10" />}
        </span>
        <span className={`text-[14px] ${state === "current" ? "text-yellow-warning" : state === "upcoming" ? "text-light-gray/40" : "text-whitetext"}`}>
            {label}
        </span>
    </motion.div>
)

const cnState = (state) => {
    if (state === "done") return "flex size-5.5 shrink-0 items-center justify-center rounded-full border border-green-success/40 bg-green-success/15"
    if (state === "current") return "flex size-5.5 shrink-0 items-center justify-center rounded-full border border-yellow-warning/30 bg-yellow-warning/12"
    return "flex size-5.5 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/4"
}

const ArtistApplicationSubmittedPage = () => {
    const router = useRouter()

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
                    <div className="flex w-full max-w-105 flex-col items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                            className="flex size-18.75 items-center justify-center rounded-[16px] border-2 border-green-success bg-green-success/10"
                        >
                            <ShieldCheck className="size-9 text-green-success" />
                        </motion.div>

                        <motion.div variants={textVariants} initial="hidden" animate="show" className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-whitetext text-[24px] font-semibold">Application Submitted!</h1>
                            <p className="text-light-gray text-[16px]">
                                Your artist verification application is now under review. Our team typically reviews applications within 2–5 business days.
                            </p>
                        </motion.div>

                        <div className="flex w-full flex-col items-start gap-4 rounded-[24px] border border-dark-accent bg-white/10 p-6 backdrop-blur-[10px]">
                            <p className="text-whitetext/30 text-[12px] font-semibold">Application Status</p>

                            <motion.div variants={listVariants} initial="hidden" animate="show" className="flex w-full flex-col gap-4">
                                {STATUS_ITEMS.map((item) => (
                                    <StatusRow key={item.label} label={item.label} state={item.state} />
                                ))}
                            </motion.div>
                        </div>

                        <Button
                            type="button"
                            variant="gradient"
                            size="lg"
                            className="w-full"
                            onClick={() => router.push("/artist/dashboard")}
                        >
                            Go to Singer Portal
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ArtistApplicationSubmittedPage
