"use client"

import GenreFilterBar from "@/components/user/explore/GenreFilterBar"
import GenreHeroBanner from "@/components/user/explore/GenreHeroBanner"
import GenreCard from "@/components/user/explore/GenreCard"
import RecentSearchesPanel from "@/components/user/explore/RecentSearchesPanel"
import LiveSessionsPanel from "@/components/user/explore/LiveSessionsPanel"
import { useUserExploreStore } from "@/zustandStore/user/userStore/userExploreStore"

const UserExplorePage = () => {
    const genres = useUserExploreStore((state) => state.genres)

    return (
        <div className="flex w-full flex-col gap-6 py-6">
            <GenreFilterBar />
            <GenreHeroBanner />
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <section className="flex min-w-0 flex-1 flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl text-whitetext sm:text-[32px]">Browse Genres</h2>
                        <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                            View All Clusters
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {genres.map((genre) => (
                            <GenreCard key={genre.id} genre={genre} />
                        ))}
                    </div>
                </section>
                <div className="flex w-full flex-col gap-6 lg:w-88 lg:shrink-0">
                    <RecentSearchesPanel />
                    <LiveSessionsPanel />
                </div>
            </div>
        </div>
    )
}

export default UserExplorePage
