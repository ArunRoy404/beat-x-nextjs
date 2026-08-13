import React from "react"

const PayoutMethodRow = ({ method }) => {
    return (
        <div
            className="flex items-center gap-4 p-4 self-stretch rounded-[16px] border border-dark-accent bg-light-gray/15 w-full"
        >
            {/* Provider Avatar */}
            <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] font-semibold uppercase"
                style={{ backgroundColor: method.color }}
            >
                {method.label.charAt(0)}
            </div>

            {/* Provider Info */}
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span className="text-white text-[12px] font-semibold not-italic">
                    {method.label}
                </span>
                <span className="text-white/40 text-[11.25px] font-normal not-italic leading-[15px]">
                    {method.number}
                </span>
            </div>

            {/* Primary Badge */}
            {method.isPrimary && (
                <span className="text-[10px] font-medium text-green-success bg-green-success/15 border border-green-success/20 px-2 py-0.5 rounded-full shrink-0 select-none">
                    Primary
                </span>
            )}
        </div>
    )
}

export default PayoutMethodRow
