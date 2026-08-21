"use client"

import { Play } from "lucide-react"
import { useUserExploreStore } from "@/zustandStore/user/userStore/userExploreStore"

const GenreHeroBanner = () => {
    const hero = useUserExploreStore((state) => state.exploreHero)

    return (
        <div className="relative h-72 w-full shrink-0 overflow-hidden rounded-[16px] sm:h-96 lg:h-[450px]">
            <img alt="" src={hero.artwork} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-(image:--explore-hero-overlay-gradient)" />
            <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center gap-4 px-6 sm:px-12">
                <span className="w-fit rounded-full bg-trending-badge-bg/10 px-3 py-1 text-xs text-trending-badge-bg">
                    {hero.badge}
                </span>
                <h1 className="text-5xl leading-none font-semibold text-whitetext sm:text-6xl lg:text-[72px]">
                    <span className="block">{hero.titleLine1}</span>
                    <span className="block text-primary">{hero.titleLine2}</span>
                </h1>
                <p className="text-lg text-light-gray">{hero.description}</p>
                <button
                    type="button"
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-[32px] bg-secondary px-8 py-4 text-base font-semibold text-button-text"
                >
                    <Play className="size-5" fill="currentColor" />
                    LISTEN NOW
                </button>
            </div>
        </div>
    )
}

export default GenreHeroBanner
