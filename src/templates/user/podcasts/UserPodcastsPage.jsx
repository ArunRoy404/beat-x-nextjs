"use client"

import { motion } from "framer-motion"
import PodcastHeroBanner from "@/components/user/podcasts/PodcastHeroBanner"
import BrowseByVibeSection from "@/components/user/podcasts/BrowseByVibeSection"
import TrendingRefractionsSection from "@/components/user/podcasts/TrendingRefractionsSection"

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

const UserPodcastsPage = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <PodcastHeroBanner />
            </motion.div>

            <motion.div variants={itemVariants}>
                <BrowseByVibeSection />
            </motion.div>

            <motion.div variants={itemVariants}>
                <TrendingRefractionsSection />
            </motion.div>
        </motion.div>
    )
}

export default UserPodcastsPage
