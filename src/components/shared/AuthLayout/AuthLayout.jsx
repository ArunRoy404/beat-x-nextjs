"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "@/components/shared/Logo"
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

const AuthCard = ({
    backHref,
    icon,
    title,
    description,
    titleClassName,
    descriptionClassName,
    children,
    className,
    gapClassName = "gap-8",
    style,
}) => (
    <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="show"
        className={cn(
            "relative z-10 flex w-full flex-col items-center justify-center rounded-[48px] p-8 backdrop-blur-[20px] sm:p-12",
            gapClassName,
            className
        )}
        style={style}
    >
        {backHref && (
            <Link
                href={backHref}
                className="absolute top-6 left-6 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white transition-colors hover:bg-white/10 hover:scale-105 active:scale-95"
            >
                <ArrowLeft className="w-4 h-4" />
            </Link>
        )}

        <motion.div variants={cardItemVariants}>
            <Logo />
        </motion.div>

        {icon && <motion.div variants={cardItemVariants}>{icon}</motion.div>}

        <motion.div variants={cardItemVariants} className="w-full">
            <AuthHeader title={title} description={description} titleClassName={titleClassName} descriptionClassName={descriptionClassName} />
        </motion.div>

        <motion.div variants={cardItemVariants} className="w-full flex flex-col items-center">
            {children}
        </motion.div>
    </motion.div>
)

const AuthLayout = ({
    backHref,
    icon,
    title,
    description,
    titleClassName,
    descriptionClassName,
    children,
    sidePanel,
    cardClassName,
    gapClassName,
    wideShell = false,
}) => {
    const useWideShell = wideShell || Boolean(sidePanel)

    if (!useWideShell) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
                <Image src="/bg-images/dashboard_bg.png" alt="" fill priority sizes="100vw" className="object-cover" />

                <AuthCard
                    backHref={backHref}
                    icon={icon}
                    title={title}
                    description={description}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    gapClassName={gapClassName}
                    className={cn("mx-4 max-w-162", cardClassName)}
                    style={{ background: "var(--auth-card-bg)", borderColor: "var(--auth-card-border)", borderWidth: 1, borderStyle: "solid" }}
                >
                    {children}
                </AuthCard>

                <SonicFrequencyWidget />
                <AuthFooterLinks />
            </div>
        )
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            <Image src="/bg-images/dashboard_bg.png" alt="" fill priority sizes="100vw" className="object-cover" />

            <motion.div
                variants={shellVariants}
                initial="hidden"
                animate="show"
                className={cn(
                    "relative z-10 mx-4 flex w-full max-w-328 items-center justify-center rounded-[48px] p-6 backdrop-blur-[20px] lg:p-12",
                    sidePanel && "flex-col gap-8 lg:flex-row lg:gap-0"
                )}
                style={{
                    background: sidePanel ? "var(--auth-wide-outer-bg)" : undefined,
                    borderColor: "var(--auth-wide-outer-border)",
                    borderWidth: 1,
                    borderStyle: "solid",
                }}
            >
                {sidePanel && <div className="hidden w-full max-w-100 shrink-0 lg:flex">{sidePanel}</div>}

                <AuthCard
                    backHref={backHref}
                    icon={icon}
                    title={title}
                    description={description}
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    gapClassName={gapClassName}
                    className={cn("w-full", sidePanel ? "max-w-158.25" : "max-w-126", cardClassName)}
                    style={{ background: "var(--auth-wide-inner-bg)", borderColor: "var(--auth-wide-inner-border)", borderWidth: 1, borderStyle: "solid" }}
                >
                    {children}
                </AuthCard>
            </motion.div>

            <SonicFrequencyWidget />
            <AuthFooterLinks />
        </div>
    )
}

export default AuthLayout
