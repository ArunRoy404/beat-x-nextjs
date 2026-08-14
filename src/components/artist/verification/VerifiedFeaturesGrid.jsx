import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import VerifiedCheckIcon from "@/components/shared/icons/VerifiedCheckIcon"

const VerifiedFeaturesGrid = ({ features = [] }) => {
    return (
        <CommonCard className="flex flex-col gap-4 w-full">
            <h3 className="text-whitetext text-[18px] font-semibold z-10 relative">
                Verified Features Unlocked
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 z-10 relative">
                {features.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-[10px] border border-green-success/15 bg-green-success/10"
                    >
                        <VerifiedCheckIcon color="#34C759" size={16} />
                        <span className="text-whitetext text-[14px] not-italic font-medium">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </CommonCard>
    )
}

export default VerifiedFeaturesGrid
