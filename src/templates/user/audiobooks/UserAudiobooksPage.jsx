"use client"

import { motion } from "framer-motion"
import ContinueListeningSection from "@/components/user/audiobooks/ContinueListeningSection"
import BestsellerListPanel from "@/components/user/audiobooks/BestsellerListPanel"
import GenreRefractionsPanel from "@/components/user/audiobooks/GenreRefractionsPanel"
import NewlyNarratedSection from "@/components/user/audiobooks/NewlyNarratedSection"

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

const UserAudiobooksPage = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <ContinueListeningSection />
            </motion.div>

            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <motion.div variants={itemVariants} className="flex min-w-0 flex-1">
                    <BestsellerListPanel />
                </motion.div>
                <motion.div variants={itemVariants} className="flex min-w-0 flex-1">
                    <GenreRefractionsPanel />
                </motion.div>
            </div>

            <motion.div variants={itemVariants}>
                <NewlyNarratedSection />
            </motion.div>
        </motion.div>
    )
}

export default UserAudiobooksPage
