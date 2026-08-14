import React from "react"
import VerifiedCheckIcon from "@/components/shared/icons/VerifiedCheckIcon"

const VerifiedArtistBanner = ({ status }) => {
    return (
        <div className="flex p-4 items-center gap-4 self-stretch rounded-[16px] border-t border-b border-yellow-warning/15 bg-yellow-warning/15 w-full">
            {/* Icon Container */}
            <div
                className="flex w-[60px] h-[60px] justify-center items-center rounded-[15px] shrink-0"
                style={{ background: "var(--verified-badge-gradient)", boxShadow: "var(--verified-badge-glow)" }}
            >
                <VerifiedCheckIcon color="#FFFFFF" size={24} />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 min-w-0">
                <h3 className="text-whitetext text-[18px] not-italic font-semibold">
                    {status?.title}
                </h3>
                <p className="text-light-gray text-[14px] not-italic font-normal">
                    {status?.description}
                </p>
                <span className="text-dark-gray text-[12px] not-italic font-normal">
                    Verified since {status?.verifiedSince}
                </span>
            </div>
        </div>
    )
}

export default VerifiedArtistBanner
