"use client"

import { motion } from "framer-motion"
import AlbumsHeader from "@/components/user/albums/AlbumsHeader"
import RecentlyPlayedSection from "@/components/user/albums/RecentlyPlayedSection"
import FavoriteAlbumsSection from "@/components/user/albums/FavoriteAlbumsSection"
import { useUserAlbumsStore } from "@/zustandStore/user/userStore/userAlbumsStore"

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const UserAlbumsPage = () => {
    const albumsSummary = useUserAlbumsStore((state) => state.albumsSummary)
    const recentlyPlayedAlbums = useUserAlbumsStore((state) => state.recentlyPlayedAlbums)
    const featuredFavoriteAlbum = useUserAlbumsStore((state) => state.featuredFavoriteAlbum)
    const favoriteAlbums = useUserAlbumsStore((state) => state.favoriteAlbums)

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <AlbumsHeader totalCollection={albumsSummary.totalCollection} recentAdditions={albumsSummary.recentAdditions} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <RecentlyPlayedSection albums={recentlyPlayedAlbums} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <FavoriteAlbumsSection featured={featuredFavoriteAlbum} albums={favoriteAlbums} />
            </motion.div>
        </motion.div>
    )
}

export default UserAlbumsPage
