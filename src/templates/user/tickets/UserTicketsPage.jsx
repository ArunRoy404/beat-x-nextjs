"use client"

import { motion } from "framer-motion"
import TicketsHeroSection from "@/components/user/tickets/TicketsHeroSection"
import SonicHubsSection from "@/components/user/tickets/SonicHubsSection"
import VirtualDimensionsBanner from "@/components/user/tickets/VirtualDimensionsBanner"
import TrendingEventsSection from "@/components/user/tickets/TrendingEventsSection"

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

const UserTicketsPage = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <TicketsHeroSection />
            </motion.div>

            <motion.div variants={itemVariants}>
                <SonicHubsSection />
            </motion.div>

            <motion.div variants={itemVariants}>
                <VirtualDimensionsBanner />
            </motion.div>

            <motion.div variants={itemVariants}>
                <TrendingEventsSection />
            </motion.div>
        </motion.div>
    )
}

export default UserTicketsPage
