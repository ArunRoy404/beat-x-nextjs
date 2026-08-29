"use client"

import { useUserSubscriptionStore } from "@/zustandStore/user/userStore/userSubscriptionStore"
import PlanCard from "./PlanCard"

const PricingPlansSection = () => {
    const plans = useUserSubscriptionStore((state) => state.subscriptionPlans)

    return (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
            ))}
        </div>
    )
}

export default PricingPlansSection
