"use client"

import { Sparkles } from "lucide-react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { useUserHomeStore } from "@/zustandStore/user/userStore/userHomeStore"
import ArtistFollowSuggestion from "./ArtistFollowSuggestion"

const RecommendedColumn = () => {
    const recommendedArtists = useUserHomeStore((state) => state.recommendedArtists)
    const dailyRadar = useUserHomeStore((state) => state.dailyRadar)

    return (
        <section className="flex w-full flex-col gap-4 lg:w-88 lg:shrink-0">
            <h2 className="text-2xl font-switzer text-whitetext sm:text-[30px]">Recommended</h2>
            <CommonGlassPanel className="flex flex-col gap-6 overflow-hidden p-4">
                <div aria-hidden className="pointer-events-none absolute -top-px -right-px size-32 rounded-full bg-primary/20 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-px -left-px size-32 rounded-full bg-secondary/20 blur-3xl" />

                <div className="relative flex flex-col gap-4">
                    {recommendedArtists.map((artist) => (
                        <ArtistFollowSuggestion key={artist.id} artist={artist} />
                    ))}
                </div>

                <div className="relative flex flex-col gap-4 border-t border-white/5 pt-4">
                    <span className="text-xs text-light-gray">YOUR DAILY RADAR</span>
                    <div className="flex flex-col items-center gap-4 rounded-[16px] bg-background p-4">
                        <div className="flex size-16 items-center justify-center rounded-full bg-(image:--gradient-purple-lime)">
                            <Sparkles className="size-6 text-button-text" />
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-lg font-semibold text-whitetext">{dailyRadar.title}</span>
                            <span className="text-xs text-light-gray">{dailyRadar.description}</span>
                        </div>
                        <button
                            type="button"
                            className="w-full cursor-pointer rounded-full bg-dark-accent py-2 text-sm font-semibold text-whitetext"
                        >
                            {dailyRadar.cta}
                        </button>
                    </div>
                </div>
            </CommonGlassPanel>
        </section>
    )
}

export default RecommendedColumn
