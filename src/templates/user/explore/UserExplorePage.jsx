"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import GenreFilterBar from "@/components/user/explore/GenreFilterBar"
import GenreHeroBanner from "@/components/user/explore/GenreHeroBanner"
import GenreCard from "@/components/user/explore/GenreCard"
import ArtistsSection from "@/components/user/explore/ArtistsSection"
// Preserved per Rule 35 & user instruction: components kept in codebase for when backend endpoints are ready
// import RecentSearchesPanel from "@/components/user/explore/RecentSearchesPanel"
// import LiveSessionsPanel from "@/components/user/explore/LiveSessionsPanel"
import { useUserGenres } from "@/hooks/api/user/genre/useUserGenres"

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
    const { data: genresData } = useUserGenres()
    const [activeFilter, setActiveFilter] = useState("All")

    const liveGenres =
        genresData?.genre ??
        genresData?.genres ??
        genresData?.data ??
        (Array.isArray(genresData) ? genresData : [])

    const allGenres = Array.isArray(liveGenres) ? liveGenres : []

    const displayedGenres = activeFilter === "All"
        ? allGenres
        : allGenres.filter(
            (genre) =>
                (genre?.name || genre?.title)?.toLowerCase() === activeFilter.toLowerCase()
        )

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <GenreFilterBar
                    genres={allGenres}
                    activeFilter={activeFilter}
                    onSelectFilter={setActiveFilter}
                />
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
                    {displayedGenres.length > 0 ? (
                        <motion.div 
                            variants={gridContainerVariants}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {displayedGenres.map((genre, index) => (
                                <motion.div key={genre?._id || genre?.id || index} variants={gridItemVariants}>
                                    <GenreCard genre={genre} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="flex w-full flex-col items-center justify-center rounded-[16px] border border-dashed border-white/10 py-12 text-center">
                            <p className="text-base text-light-gray">No genres found</p>
                        </div>
                    )}
                </motion.section>

                {/* Preserving UI design blocks per Rule 35 & user instructions:
                    RecentSearchesPanel and LiveSessionsPanel do not have backend endpoints yet.
                    Kept intact and commented out.
                <div className="flex w-full flex-col gap-6 lg:w-88 lg:shrink-0">
                    <motion.div variants={itemVariants}>
                        <RecentSearchesPanel />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <LiveSessionsPanel />
                    </motion.div>
                </div>
                */}
            </div>

            <motion.div variants={itemVariants}>
                <ArtistsSection />
            </motion.div>
        </motion.div>
    )
}

export default UserExplorePage

