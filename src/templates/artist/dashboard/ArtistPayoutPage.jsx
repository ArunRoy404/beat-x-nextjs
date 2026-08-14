"use client"

import React from "react"
import AvailableBalanceCard from "@/components/artist/payout/AvailableBalanceCard"
import PayoutMethodsCard from "@/components/artist/payout/PayoutMethodsCard"
import PayoutHistory from "@/components/artist/payout/PayoutHistory"

const ArtistPayoutPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Balance + Methods row */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <AvailableBalanceCard />
        <PayoutMethodsCard />
      </div>

      {/* Payout history table */}
      <PayoutHistory />
    </div>
  )
}

export default ArtistPayoutPage
