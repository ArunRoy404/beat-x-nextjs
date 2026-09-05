"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useUserSubscriptionStore } from "@/zustandStore/user/userStore/userSubscriptionStore"
import PricingPlansSection from "@/components/user/subscription/PricingPlansSection"
import FeatureBreakdownTable from "@/components/user/subscription/FeatureBreakdownTable"
import SubscriptionBenefitCards from "@/components/user/subscription/SubscriptionBenefitCards"
import SubscriptionInquiries from "@/components/user/subscription/SubscriptionInquiries"

const UserSubscriptionPage = () => {
    const router = useRouter()
    const hero = useUserSubscriptionStore((state) => state.subscriptionHero)

    return (
        <div className="flex w-full flex-col gap-6 py-6">
            <div className="flex flex-col items-start gap-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <span className="flex size-10 items-center justify-center rounded-full border border-light-gray">
                        <ArrowLeft className="size-5 text-whitetext" />
                    </span>
                    <span className="text-base text-light-gray">Return to Library</span>
                </button>
                <h1 className="text-2xl font-black text-whitetext sm:text-3xl lg:text-[40px]">
                    {hero.title} <span className="bg-(image:--button-bg) bg-clip-text text-transparent">{hero.highlight}</span>
                </h1>
                <p className="max-w-3xl text-sm text-light-gray sm:text-base">{hero.description}</p>
            </div>

            <div className="flex w-full flex-col gap-8 sm:gap-10">
                <PricingPlansSection />
                <FeatureBreakdownTable />
                <SubscriptionBenefitCards />
                <SubscriptionInquiries />
            </div>
        </div>
    )
}

export default UserSubscriptionPage
