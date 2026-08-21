"use client"

import { motion } from "framer-motion"
import HeroBanner from "@/components/user/home/HeroBanner"
import YourMixSection from "@/components/user/home/YourMixSection"
import NewReleasesColumn from "@/components/user/home/NewReleasesColumn"
import RecommendedColumn from "@/components/user/home/RecommendedColumn"

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
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <HeroBanner />
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <YourMixSection />
            </motion.div>
            
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <motion.div variants={itemVariants} className="flex min-w-0 flex-1">
                    <NewReleasesColumn />
                </motion.div>
                <motion.div variants={itemVariants} className="w-full lg:w-88 lg:shrink-0">
                    <RecommendedColumn />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default UserHomePage
