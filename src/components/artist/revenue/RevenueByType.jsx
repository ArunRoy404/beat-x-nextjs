import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const RevenueByType = ({ data = [] }) => {
    const maxAmount = Math.max(...data.map((item) => item.amount), 1)

    return (
        <CommonCard className="flex flex-col gap-4 h-[380px] w-full">
            <h3 className="text-whitetext text-[16px] font-semibold z-10 relative">
                Revenue by Type
            </h3>

            <div className="flex flex-col gap-4 z-10 relative overflow-y-auto pr-1 custom-scrollbar">
                {data.map((item) => {
                    const percent = Math.round((item.amount / maxAmount) * 100)
                    return (
                        <div key={item.id} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-light-gray">{item.label}</span>
                                <span className="text-whitetext font-medium">৳{item.amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${percent}%`, backgroundColor: item.color }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </CommonCard>
    )
}

export default RevenueByType
