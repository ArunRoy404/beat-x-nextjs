"use client"

import { useUserHomeStore } from "@/zustandStore/user/userStore/userHomeStore"
import MixCard from "./MixCard"

const YourMixSection = () => {
    const mixes = useUserHomeStore((state) => state.mixes)

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-whitetext sm:text-[32px]">Your Mix</h2>
                    <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                        View All
                    </button>
                </div>
                <p className="text-sm text-light-gray sm:text-base">Personalized rhythms for your unique flow.</p>
            </div>
            <div className="flex w-full flex-wrap gap-4 sm:gap-6">
                {mixes.map((mix) => (
                    <MixCard key={mix.id} mix={mix} />
                ))}
            </div>
        </section>
    )
}

export default YourMixSection
