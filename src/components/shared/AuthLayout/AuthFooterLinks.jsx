import React from "react"

const LINKS = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Service", href: "/terms-of-service" },
    { label: "Support", href: "/support" },
]

const AuthFooterLinks = () => {
    return (
        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-6 sm:flex">
            {LINKS.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    className="text-light-gray text-[13px] font-semibold whitespace-nowrap hover:text-whitetext transition-colors"
                >
                    {link.label.toUpperCase()}
                </a>
            ))}
        </div>
    )
}

export default AuthFooterLinks
