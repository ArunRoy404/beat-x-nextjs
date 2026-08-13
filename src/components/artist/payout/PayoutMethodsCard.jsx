"use client"

import React from "react"
import { useArtistPayoutStore } from "@/zustandStore/artist/artistStore/artistPayoutStore"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import PayoutMethodRow from "./PayoutMethodRow"
import AddPayoutMethodDialog from "@/components/dialogs/artist/AddPayoutMethodDialog"

const PayoutMethodsCard = () => {
    const methods = useArtistPayoutStore((state) => state.payoutMethods)

    return (
        <CommonCard className="flex flex-col gap-4 flex-1">
            <div className="flex items-center justify-between z-10 relative">
                <h3 className="text-whitetext text-[16px] font-semibold">
                    Payout Methods
                </h3>
                <AddPayoutMethodDialog />
            </div>

            <div className="flex flex-col gap-3 z-10 relative">
                {methods.map((method) => (
                    <PayoutMethodRow key={method.id} method={method} />
                ))}
            </div>
        </CommonCard>
    )
}

export default PayoutMethodsCard
