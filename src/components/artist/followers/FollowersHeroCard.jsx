"use client"

import React from "react"
import { useArtistFollowersStore } from "@/zustandStore/artist/artistStore/artistFollowersStore"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const FollowersHeroCard = () => {
    const stats = useArtistFollowersStore((state) => state.followersStats)

    return (
        <CommonCard
            className="flex flex-col items-center justify-center gap-2 p-8 rounded-[16px] text-center w-full"
            style={{ background: "var(--followers-hero-bg)", borderColor: "var(--followers-hero-border)" }}
        >
            <span className="text-light-gray text-[12px] font-normal not-italic relative z-10">
                Total Followers
            </span>
            <span className="text-secondary text-[48px] font-black not-italic leading-none relative z-10">
                {stats.total.toLocaleString()}
            </span>
            <span className="text-green-success text-[13px] font-medium not-italic relative z-10">
                +{stats.weeklyChange.toLocaleString()} this week · +{stats.monthlyChange.toLocaleString()} this month
            </span>
        </CommonCard>
    )
}

export default FollowersHeroCard
