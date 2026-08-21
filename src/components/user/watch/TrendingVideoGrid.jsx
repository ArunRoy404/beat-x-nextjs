"use client"

import { useUserWatchStore } from "@/zustandStore/user/userStore/userWatchStore"
import TrendingVideoCard from "./TrendingVideoCard"

const TrendingVideoGrid = () => {
    const videos = useUserWatchStore((state) => state.videos)

    return (
        <section className="flex min-w-0 flex-1 flex-col gap-4">
            <h2 className="text-2xl text-whitetext sm:text-[32px]">Trending Now</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {videos.map((video) => (
                    <TrendingVideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    )
}

export default TrendingVideoGrid
