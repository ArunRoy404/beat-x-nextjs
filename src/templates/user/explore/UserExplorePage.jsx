"use client"

import { motion } from "framer-motion"
import GenreFilterBar from "@/components/user/explore/GenreFilterBar"
import GenreHeroBanner from "@/components/user/explore/GenreHeroBanner"
import GenreCard from "@/components/user/explore/GenreCard"
import ArtistsSection from "@/components/user/explore/ArtistsSection"
import RecentSearchesPanel from "@/components/user/explore/RecentSearchesPanel"
import LiveSessionsPanel from "@/components/user/explore/LiveSessionsPanel"
import { useUserExploreStore } from "@/zustandStore/user/userStore/userExploreStore"

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

// Staggered grid container for genres
const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06
        }
    }
}

const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
        }
    }
}

const UserExplorePage = () => {
    const genres = useUserExploreStore((state) => state.genres)

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <GenreFilterBar />
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <GenreHeroBanner />
            </motion.div>
            
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <motion.section 
                    variants={itemVariants}
                    className="flex min-w-0 flex-1 flex-col gap-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl text-whitetext sm:text-[32px]">Browse Genres</h2>
                        <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                            View All Clusters
                        </button>
                    </div>
                    <motion.div 
                        variants={gridContainerVariants}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {genres.map((genre) => (
                            <motion.div key={genre.id} variants={gridItemVariants}>
                                <GenreCard genre={genre} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                <div className="flex w-full flex-col gap-6 lg:w-88 lg:shrink-0">
                    <motion.div variants={itemVariants}>
                        <RecentSearchesPanel />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <LiveSessionsPanel />
                    </motion.div>
                </div>
            </div>

            <motion.div variants={itemVariants}>
                <ArtistsSection />
            </motion.div>
        </motion.div>
    )
}

export default UserExplorePage
