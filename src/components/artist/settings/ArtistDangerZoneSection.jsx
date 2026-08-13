import React from "react"
import { TriangleAlert } from "lucide-react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import ArtistDangerZoneActionRow from "./ArtistDangerZoneActionRow"

const ArtistDangerZoneSection = ({ actions = [] }) => {
    return (
        <CommonCard className="flex flex-col gap-5 border-red-error/20 bg-red-error/5">
            {/* Header */}
            <div className="flex items-start gap-2 z-10 relative">
                <TriangleAlert className="w-5 h-5 text-red-error shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-red-error text-[24px] not-italic font-semibold">
                        Danger Zone
                    </h3>
                    <p className="text-light-gray text-[14px] not-italic font-normal">
                        These actions cannot be undone. Proceed with caution.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 z-10 relative">
                {actions.map((action) => (
                    <ArtistDangerZoneActionRow key={action.id} action={action} />
                ))}
            </div>
        </CommonCard>
    )
}

export default ArtistDangerZoneSection
