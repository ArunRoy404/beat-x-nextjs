"use client"

import { motion } from "framer-motion"
import HeroBanner from "@/components/user/home/HeroBanner"
import YourMixSection from "@/components/user/home/YourMixSection"
import NewReleasesColumn from "@/components/user/home/NewReleasesColumn"
import RecommendedColumn from "@/components/user/home/RecommendedColumn"
import { useSongsHome } from "@/hooks/api/user/songs/useSongsHome"

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
            ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo curve for premium feel
        }
    }
}

const UserHomePage = () => {
    const { data: homeData } = useSongsHome()

    const heroItems = homeData?.featured?.length ? homeData?.featured : (homeData?.trending?.length ? homeData?.trending : [])
    const mixItems = homeData?.recentlyPlayed?.data?.length
        ? homeData?.recentlyPlayed?.data
        : (homeData?.onRepeat?.data?.length ? homeData?.onRepeat?.data : (homeData?.trending || []))
    const releaseItems = homeData?.newReleases || []
    const dailyDiscoveryItems = homeData?.dailyDiscovery || []

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <HeroBanner items={heroItems} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <YourMixSection mixes={mixItems} />
            </motion.div>
            
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <motion.div variants={itemVariants} className="flex min-w-0 flex-1">
                    <NewReleasesColumn releases={releaseItems} />
                </motion.div>
                <motion.div variants={itemVariants} className="w-full lg:w-88 lg:shrink-0">
                    <RecommendedColumn dailyDiscovery={dailyDiscoveryItems} />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default UserHomePage
