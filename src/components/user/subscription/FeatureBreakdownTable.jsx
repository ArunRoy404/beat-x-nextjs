"use client"

import { cn } from "@/lib/utils"
import { useUserSubscriptionStore } from "@/zustandStore/user/userStore/userSubscriptionStore"

const columnAccentClasses = {
    plain: "text-table-header-text",
    primary: "text-primary",
    secondary: "text-secondary",
    gradient: "bg-(image:--button-bg) bg-clip-text text-transparent",
}

const FeatureBreakdownTable = () => {
    const table = useUserSubscriptionStore((state) => state.featureBreakdownTable)

    return (
        <div className="flex w-full flex-col gap-6">
            <h2 className="text-3xl font-black text-whitetext sm:text-4xl">Feature Breakdown</h2>
            <div className="w-full overflow-x-auto">
                <div className="flex min-w-[700px] flex-col">
                    <div className="flex items-center justify-between border-b border-table-header-border bg-background py-2">
                        <p className="flex-1 px-4 py-2 text-center text-xl font-semibold text-table-header-text">Core Features</p>
                        {table.columns.map((column) => (
                            <p
                                key={column.label}
                                className={cn("flex-1 px-4 py-2 text-center text-xl font-semibold", columnAccentClasses[column.accent])}
                            >
                                {column.label}
                            </p>
                        ))}
                    </div>

                    {table.rows.map((row) => (
                        <div key={row.feature} className="flex items-center justify-between border-x border-b border-tag-chip-bg py-2">
                            <p className="flex-1 px-4 py-2 text-base font-semibold text-whitetext">{row.feature}</p>
                            {row.values.map((value, index) => (
                                <p key={index} className="flex-1 px-4 py-2 text-center text-sm text-light-gray">
                                    {value}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FeatureBreakdownTable
