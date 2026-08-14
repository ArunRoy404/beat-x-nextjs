import React from "react"
import { cn } from "@/lib/utils"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import VerifiedCheckIcon from "@/components/shared/icons/VerifiedCheckIcon"

const VerificationTimeline = ({ timeline = [] }) => {
    return (
        <CommonCard className="flex flex-col gap-5 w-full">
            <h3 className="text-whitetext text-[18px] font-semibold z-10 relative">
                Verification Timeline
            </h3>

            <div className="flex flex-col z-10 relative">
                {timeline.map((step, idx) => {
                    const isLast = idx === timeline.length - 1
                    return (
                        <div key={step.id} className="flex gap-3">
                            {/* Icon + connecting line */}
                            <div className="flex flex-col items-center shrink-0">
                                <div className="w-6 h-6 rounded-full bg-green-success/20 border border-green-success/30 flex items-center justify-center text-green-success shrink-0">
                                    <VerifiedCheckIcon color="#34C759" size={14} />
                                </div>
                                {!isLast && <div className="w-px flex-1 bg-green-success/20 my-1" />}
                            </div>

                            {/* Title + date */}
                            <div className={cn("flex flex-col gap-0.5", !isLast && "pb-5")}>
                                <span className="text-whitetext text-[15px] not-italic font-semibold">
                                    {step.title}
                                </span>
                                <span className="text-dark-gray text-[12px] not-italic font-normal">
                                    {step.date}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </CommonCard>
    )
}

export default VerificationTimeline
