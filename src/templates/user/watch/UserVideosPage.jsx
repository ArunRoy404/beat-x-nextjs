"use client"

import { motion } from "framer-motion"
import VideoCategoryChips from "@/components/user/watch/VideoCategoryChips"
import WatchHeroBanner from "@/components/user/watch/WatchHeroBanner"
import LiveNowSection from "@/components/user/watch/LiveNowSection"
import TrendingVideoGrid from "@/components/user/watch/TrendingVideoGrid"
import WatchUpcomingColumn from "@/components/user/watch/WatchUpcomingColumn"

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

const UserVideosPage = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <WatchHeroBanner />
            </motion.div>

            <motion.div variants={itemVariants}>
                <VideoCategoryChips />
            </motion.div>

            <motion.div variants={itemVariants}>
                <LiveNowSection />
            </motion.div>

            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <motion.div variants={itemVariants} className="flex min-w-0 flex-1">
                    <TrendingVideoGrid />
                </motion.div>
                <motion.div variants={itemVariants} className="w-full lg:w-88 lg:shrink-0">
                    <WatchUpcomingColumn />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default UserVideosPage
