"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Logo from "@/components/shared/Logo"
import AuthHeader from "./AuthHeader"
import SonicFrequencyWidget from "./SonicFrequencyWidget"

const AuthLayout = ({ backHref, title, description, children }) => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Background Art */}
            <Image
                src="/bg-images/dashboard_bg.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            {/* Card */}
            <div
                className="relative z-10 w-full max-w-[648px] mx-4 rounded-[48px] p-12 backdrop-blur-[20px] flex flex-col items-center justify-center gap-12"
                style={{ background: "var(--auth-card-bg)", borderColor: "var(--auth-card-border)", borderWidth: 1, borderStyle: "solid" }}
            >
                {backHref && (
                    <Link
                        href={backHref}
                        className="absolute top-6 left-6 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                )}

                <Logo />

                <AuthHeader title={title} description={description} />

                {children}
            </div>

            <SonicFrequencyWidget />
        </div>
    )
}

export default AuthLayout
