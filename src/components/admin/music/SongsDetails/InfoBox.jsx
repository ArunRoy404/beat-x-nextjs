import React from "react"

const InfoBox = ({ label, value }) => {
    return (
        <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 flex flex-col gap-[4px] w-full">
            <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider">{label}</span>
            <span className="text-[14px] text-whitetext font-medium not-italic truncate">{value || "-"}</span>
        </div>
    )
}

export default InfoBox