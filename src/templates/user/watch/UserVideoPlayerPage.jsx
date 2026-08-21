"use client"

import { motion } from "framer-motion"
import VideoPlayerHero from "@/components/user/watch/VideoPlayerHero"
import VideoDescriptionBox from "@/components/user/watch/VideoDescriptionBox"
import UpNextColumn from "@/components/user/watch/UpNextColumn"

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

const UserVideoPlayerPage = ({ video }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6 lg:flex-row"
        >
            <motion.div variants={itemVariants} className="flex min-w-0 flex-1 flex-col gap-6">
                <VideoPlayerHero video={video} />
                <VideoDescriptionBox video={video} />
            </motion.div>
            <motion.div variants={itemVariants} className="w-full lg:w-88 lg:shrink-0">
                <UpNextColumn currentVideoId={video.id} />
            </motion.div>
        </motion.div>
    )
}

export default UserVideoPlayerPage
