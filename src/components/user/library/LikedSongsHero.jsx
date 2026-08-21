"use client"

import { Heart, Play } from "lucide-react"
import { useUserLibraryStore } from "@/zustandStore/user/userStore/userLibraryStore"

const LikedSongsHero = () => {
    const hero = useUserLibraryStore((state) => state.likedSongsHero)

    return (
        <div className="relative flex h-85 flex-1 flex-col justify-between overflow-hidden rounded-[16px] border border-(--glass-panel-border) bg-(image:--liked-hero-gradient) p-10">
            <Heart className="pointer-events-none absolute -top-1 right-0 size-62 text-secondary/[0.08]" fill="currentColor" />
            <span className="w-fit rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1 text-xs text-secondary">
                {hero.badge}
            </span>
            <h1 className="text-6xl font-semibold text-whitetext lg:text-[72px]">{hero.title}</h1>
            <p className="max-w-lg text-base text-light-gray">{hero.description}</p>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-secondary shadow-[0px_10px_15px_-3px_rgba(58,223,250,0.2),0px_4px_6px_-4px_rgba(58,223,250,0.2)]"
                >
                    <Play className="size-4.5 text-button-text" fill="currentColor" />
                </button>
                <button
                    type="button"
                    className="flex h-14 cursor-pointer items-center justify-center rounded-full border border-(--glass-panel-border) bg-(--glass-panel-bg) px-8 text-base font-semibold text-whitetext backdrop-blur-xl"
                >
                    Shuffle All
                </button>
            </div>
        </div>
    )
}

export default LikedSongsHero
