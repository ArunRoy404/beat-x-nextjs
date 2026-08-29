"use client"

import { useUserSubscriptionStore } from "@/zustandStore/user/userStore/userSubscriptionStore"

const SubscriptionBenefitCards = () => {
    const benefits = useUserSubscriptionStore((state) => state.subscriptionBenefits)

    return (
        <div className="flex w-full flex-col items-stretch gap-6 sm:flex-row sm:flex-wrap sm:gap-8">
            {benefits.map((benefit) => (
                <div
                    key={benefit.id}
                    className="relative flex h-60 min-w-0 flex-col items-start justify-end overflow-hidden rounded-[32px] p-6 sm:h-75 sm:flex-1"
                    style={{ backgroundImage: `url(${benefit.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="relative flex flex-col gap-2">
                        <h4 className="text-2xl font-black text-whitetext">{benefit.title}</h4>
                        <p className="text-base text-light-gray">{benefit.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SubscriptionBenefitCards
