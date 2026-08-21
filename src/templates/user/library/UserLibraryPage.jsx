"use client"

import { useState } from "react"
import { LayoutGrid, List } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import CommonMediaCard from "@/components/shared/CommonMediaCard"
import LikedSongsHero from "@/components/user/library/LikedSongsHero"
import SonicReplayCard from "@/components/user/library/SonicReplayCard"
import DiscoveryPrismCard from "@/components/user/library/DiscoveryPrismCard"
import TopArtistItem from "@/components/user/library/TopArtistItem"
import RecentAlbumRow from "@/components/user/library/RecentAlbumRow"
import { useUserLibraryStore } from "@/zustandStore/user/userStore/userLibraryStore"

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1]
        }
    }
}

const listContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
}

const listItemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1]
        }
    }
}

const UserLibraryPage = () => {
    const playlists = useUserLibraryStore((state) => state.playlists)
    const topArtists = useUserLibraryStore((state) => state.topArtists)
    const recentAlbums = useUserLibraryStore((state) => state.recentAlbums)
    const [albumView, setAlbumView] = useState("list")

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <motion.div variants={itemVariants} className="flex min-w-0 flex-1">
                    <LikedSongsHero />
                </motion.div>
                <div className="flex w-full flex-col gap-6 lg:w-88 lg:shrink-0">
                    <motion.div variants={itemVariants}>
                        <SonicReplayCard />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <DiscoveryPrismCard />
                    </motion.div>
                </div>
            </div>

            <motion.section variants={itemVariants} className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl text-whitetext sm:text-[32px]">Playlists</h2>
                        <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                            View All Curations
                        </button>
                    </div>
                    <p className="text-base text-light-gray">Curations for every atmosphere</p>
                </div>
                <motion.div 
                    variants={listContainerVariants}
                    className="flex w-full flex-wrap gap-6"
                >
                    {playlists.map((playlist) => (
                        <motion.div 
                            key={playlist.id} 
                            variants={listItemVariants}
                            className="w-40 flex-1 basis-40 flex"
                        >
                            <CommonMediaCard
                                art={playlist.art}
                                title={playlist.title}
                                subtitle={playlist.subtitle}
                                className="w-full"
                                imgClassName="h-40"
                                shadow
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            <div className="flex w-full flex-col gap-12 xl:flex-row">
                <motion.section variants={itemVariants} className="flex w-full flex-col gap-4 xl:w-87 xl:shrink-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-whitetext">Top Artists</h2>
                        <button type="button" className="cursor-pointer text-base text-secondary">
                            See More
                        </button>
                    </div>
                    <motion.div 
                        variants={listContainerVariants}
                        className="flex flex-col gap-4"
                    >
                        {topArtists.map((artist) => (
                            <motion.div key={artist.id} variants={listItemVariants}>
                                <TopArtistItem artist={artist} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section variants={itemVariants} className="flex min-w-0 flex-1 flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-whitetext">Recent Albums</h2>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setAlbumView("grid")}
                                className={cn(
                                    "flex size-10 cursor-pointer items-center justify-center rounded-full border",
                                    albumView === "grid" ? "border-transparent bg-secondary/10" : "border-light-gray"
                                )}
                            >
                                <LayoutGrid className={cn("size-5", albumView === "grid" ? "text-secondary" : "text-light-gray")} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setAlbumView("list")}
                                className={cn(
                                    "flex size-10 cursor-pointer items-center justify-center rounded-full border",
                                    albumView === "list" ? "border-transparent bg-secondary/10" : "border-light-gray"
                                )}
                            >
                                <List className={cn("size-5", albumView === "list" ? "text-secondary" : "text-light-gray")} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-light-gray px-4 pt-2 pb-2.25 text-xs font-semibold text-light-gray">
                        <span className="flex-1">ALBUM / ARTIST</span>
                        <span className="flex-1 text-center">RELEASED</span>
                        <span className="flex-1 text-center">TRACKS</span>
                    </div>
                    <motion.div 
                        variants={listContainerVariants}
                        className="flex flex-col gap-4"
                    >
                        {recentAlbums.map((album) => (
                            <motion.div key={album.id} variants={listItemVariants}>
                                <RecentAlbumRow album={album} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>
            </div>
        </motion.div>
    )
}

export default UserLibraryPage
