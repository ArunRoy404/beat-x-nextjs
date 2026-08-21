"use client"

import HeroBanner from "@/components/user/home/HeroBanner"
import YourMixSection from "@/components/user/home/YourMixSection"
import NewReleasesColumn from "@/components/user/home/NewReleasesColumn"
import RecommendedColumn from "@/components/user/home/RecommendedColumn"

const UserHomePage = () => {
    return (
        <div className="flex w-full flex-col gap-6 py-6">
            <HeroBanner />
            <YourMixSection />
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <NewReleasesColumn />
                <RecommendedColumn />
            </div>
        </div>
    )
}

export default UserHomePage
