"use client"

import { motion } from "framer-motion"
import TrendingHeroCarousel from "@/components/user/trending/TrendingHeroCarousel"
import HotAlbumsCarousel from "@/components/user/trending/HotAlbumsCarousel"
import RecentSearchesPanel from "@/components/user/trending/RecentSearchesPanel"
import TrendingVideosCarousel from "@/components/user/trending/TrendingVideosCarousel"
import GlobalTop50Section from "@/components/user/trending/GlobalTop50Section"

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

const UserTrendingPage = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-8 py-6"
        >
            <motion.div variants={itemVariants}>
                <TrendingHeroCarousel />
            </motion.div>

            <motion.div variants={itemVariants} className="flex w-full flex-col items-start gap-6 lg:flex-row">
                <HotAlbumsCarousel />
                <RecentSearchesPanel />
            </motion.div>

            <motion.div variants={itemVariants}>
                <TrendingVideosCarousel />
            </motion.div>

            <motion.div variants={itemVariants}>
                <GlobalTop50Section />
            </motion.div>
        </motion.div>
    )
}

export default UserTrendingPage
