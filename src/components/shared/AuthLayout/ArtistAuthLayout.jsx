"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import AuthHeader from "./AuthHeader"
import SonicFrequencyWidget from "./SonicFrequencyWidget"
import AuthFooterLinks from "./AuthFooterLinks"

const shellVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

const cardContainerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.09, delayChildren: 0.2 },
    },
}

const cardItemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
}

const ArtistWizardHeader = ({ backHref, roleLabel, roleIcon = "🎵", stepLabel, progressPercent = 0 }) => (
    <div className="flex w-full items-start justify-center gap-4">
        {backHref && (
            <Link
                href={backHref}
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
            >
                <ChevronLeft className="size-6" />
            </Link>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary/10 px-2 py-1 text-secondary text-[12px] font-semibold whitespace-nowrap">
                    {roleIcon} {roleLabel}
                </span>
                <span className="text-light-gray text-[16px] font-semibold">{stepLabel}</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-secondary"
                />
            </div>
        </div>
    </div>
)

const ArtistAuthCard = ({
    backHref,
    roleLabel,
    roleIcon,
    stepLabel,
    progressPercent,
    title,
    description,
    children,
    className,
    style,
}) => (
    <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="show"
        className={cn(
            "relative z-10 flex w-full flex-col items-start gap-6 rounded-[48px] p-6 backdrop-blur-[5px] sm:p-12",
            className
        )}
        style={style}
    >
        <motion.div variants={cardItemVariants} className="w-full">
            <ArtistWizardHeader
                backHref={backHref}
                roleLabel={roleLabel}
                roleIcon={roleIcon}
                stepLabel={stepLabel}
                progressPercent={progressPercent}
            />
        </motion.div>

        <motion.div variants={cardItemVariants} className="w-full">
            <AuthHeader
                title={title}
                description={description}
                titleClassName="text-whitetext text-[24px] sm:text-[28px] font-semibold"
                descriptionClassName="text-[16px] max-w-none"
            />
        </motion.div>

        <motion.div variants={cardItemVariants} className="w-full flex flex-col items-start gap-6">
            {children}
        </motion.div>
    </motion.div>
)

const ArtistAuthLayout = ({
    backHref,
    roleLabel = "Singer",
    roleIcon = "🎵",
    stepLabel,
    progressPercent,
    title,
    description,
    sidePanel,
    cardClassName,
    children,
}) => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-10">
            <Image src="/bg-images/dashboard_bg.png" alt="" fill priority sizes="100vw" className="object-cover" />

            <motion.div
                variants={shellVariants}
                initial="hidden"
                animate="show"
                className={cn(
                    "relative z-10 mx-4 flex w-full max-w-328 items-center justify-center rounded-[48px] p-6 backdrop-blur-[20px] lg:p-12",
                    sidePanel && "flex-col gap-8 lg:flex-row lg:gap-12"
                )}
                style={{ borderColor: "var(--auth-wide-outer-border)", borderWidth: 1, borderStyle: "solid" }}
            >
                {sidePanel && <div className="hidden w-full max-w-100 shrink-0 lg:flex">{sidePanel}</div>}

                <ArtistAuthCard
                    backHref={backHref}
                    roleLabel={roleLabel}
                    roleIcon={roleIcon}
                    stepLabel={stepLabel}
                    progressPercent={progressPercent}
                    title={title}
                    description={description}
                    className={cn("w-full max-w-146", cardClassName)}
                    style={{ background: "var(--auth-wide-inner-bg)", borderColor: "var(--auth-wide-inner-border)", borderWidth: 1, borderStyle: "solid" }}
                >
                    {children}
                </ArtistAuthCard>
            </motion.div>

            <SonicFrequencyWidget />
            <AuthFooterLinks />
        </div>
    )
}

export default ArtistAuthLayout
