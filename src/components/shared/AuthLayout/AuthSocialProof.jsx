import React from "react"
import Image from "next/image"
import Logo from "@/components/shared/Logo"

const AVATARS = [
    "/auth/images/social-proof-avatar-1.jpg",
    "/auth/images/social-proof-avatar-2.jpg",
    "/auth/images/social-proof-avatar-3.jpg",
]

const AuthSocialProof = ({ tagline = "Refracting sound with listeners worldwide.", countLabel = "+12k" }) => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-6">
            <Logo />

            <div className="flex w-full flex-col items-center gap-4">
                <div className="flex items-center">
                    {AVATARS.map((avatar, index) => (
                        <div
                            key={avatar}
                            className="size-12 shrink-0 overflow-hidden rounded-full border-4 border-dark-accent"
                            style={{ marginLeft: index === 0 ? 0 : -16 }}
                        >
                            <Image src={avatar} alt="" width={48} height={48} className="size-full object-cover" />
                        </div>
                    ))}
                    <div
                        className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-dark-accent bg-tag-chip-bg"
                        style={{ marginLeft: -16 }}
                    >
                        <span className="text-secondary text-[16px] font-semibold">{countLabel}</span>
                    </div>
                </div>
                <p className="text-light-gray text-[16px] text-center">{tagline}</p>
            </div>
        </div>
    )
}

export default AuthSocialProof
