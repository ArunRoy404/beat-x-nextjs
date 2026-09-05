import React from "react"
import Image from "next/image"

const PROVIDERS = [
    { id: "apple", label: "Continue with Apple", icon: "/icons/auth/social-apple-logo.png", width: 32, height: 40 },
    { id: "google", label: "Continue with Google", icon: "/icons/auth/social-google-logo.png", width: 39, height: 40 },
    { id: "facebook", label: "Continue with Facebook", icon: "/icons/auth/social-facebook-logo.svg", width: 40, height: 40 },
]

const AuthSocialLogins = ({ label = "OR SIGN UP WITH" }) => {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-center gap-2">
                <span className="h-px flex-1 border-t border-dark-gray" />
                <span className="text-light-gray text-[12px] whitespace-nowrap">{label}</span>
                <span className="h-px flex-1 border-t border-dark-gray" />
            </div>

            <div className="grid w-full grid-cols-3 gap-4">
                {PROVIDERS.map((provider) => (
                    <button
                        key={provider.id}
                        type="button"
                        aria-label={provider.label}
                        className="flex h-[50px] cursor-pointer items-center justify-center rounded-[12px] transition-opacity hover:opacity-80"
                    >
                        <Image src={provider.icon} alt="" width={provider.width} height={provider.height} className="h-10 w-auto" />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default AuthSocialLogins
