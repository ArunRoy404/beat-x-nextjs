"use client"

import React from "react"
import { useArtistPayoutStore } from "@/zustandStore/artist/artistStore/artistPayoutStore"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import RequestPayoutDialog from "@/components/dialogs/artist/RequestPayoutDialog"

const AvailableBalanceCard = () => {
    const balance = useArtistPayoutStore((state) => state.payoutBalance)

    return (
        <CommonCard
            className="flex flex-col items-center justify-center gap-4 p-6 rounded-[12px] text-center flex-1"
            style={{ background: "var(--payout-balance-bg)", borderColor: "var(--payout-balance-border)" }}
        >
            <span className="text-light-gray text-[12px] font-normal not-italic relative z-10">
                Available Balance
            </span>
            <span className="text-green-success text-[48px] font-black not-italic leading-none relative z-10">
                ৳{balance.available.toLocaleString()}
            </span>
            <span className="text-light-gray text-[14px] font-semibold not-italic relative z-10">
                Min withdrawal: ৳{balance.minWithdrawal}
            </span>

            <div className="relative z-10">
                <RequestPayoutDialog />
            </div>
        </CommonCard>
    )
}

export default AvailableBalanceCard
