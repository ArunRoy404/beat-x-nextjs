"use client"

import { motion } from "framer-motion"
import AlbumsHeader from "@/components/user/albums/AlbumsHeader"
// Preserving UI design block per Rule 35 & user instruction:
// RecentlyPlayedSection does not have a dedicated backend endpoint (/albums/recently-played) yet.
// Kept intact in codebase and commented out until backend releases user album playback history.
// import RecentlyPlayedSection from "@/components/user/albums/RecentlyPlayedSection"
import FavoriteAlbumsSection from "@/components/user/albums/FavoriteAlbumsSection"
import { useBrowseAlbums } from "@/hooks/api/user/albums/useBrowseAlbums"
import { useFeaturedAlbums } from "@/hooks/api/user/albums/useFeaturedAlbums"
import { useNewReleaseAlbums } from "@/hooks/api/user/albums/useNewReleaseAlbums"
import { useMyFavorites } from "@/hooks/api/user/profile/useMyFavorites"

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
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const UserAlbumsPage = () => {
    const { data: browseData } = useBrowseAlbums({ page: 1, limit: 20 })
    const { data: featuredData } = useFeaturedAlbums()
    const { data: newReleasesData } = useNewReleaseAlbums({ page: 1, limit: 20 })
    const { data: favoritesData } = useMyFavorites()

    const browseAlbums =
        browseData?.albums ??
        browseData?.data ??
        (Array.isArray(browseData) ? browseData : [])

    const newReleases =
        newReleasesData?.albums ??
        newReleasesData?.data ??
        (Array.isArray(newReleasesData) ? newReleasesData : [])

    const featuredList =
        featuredData?.albums ??
        featuredData?.data ??
        (Array.isArray(featuredData) ? featuredData : [])

    const favAlbums =
        favoritesData?.favorites?.albums ??
        favoritesData?.albums ??
        favoritesData?.data?.albums ??
        (Array.isArray(favoritesData?.data) ? favoritesData.data : [])

    const totalCollection = browseData?.total ?? browseAlbums.length
    const recentAdditions = newReleasesData?.total ?? newReleases.length

    const rawFeatured = featuredList[0] || favAlbums[0] || browseAlbums[0]
    const featured = rawFeatured
        ? {
            id: rawFeatured?._id || rawFeatured?.id,
            title: rawFeatured?.title || "Featured Album",
            subtitle: rawFeatured?.artist?.name || rawFeatured?.artist || "Beat-X Artist",
            meta: rawFeatured?.year ? `${rawFeatured.year}` : (rawFeatured?.songs?.length ? `${rawFeatured.songs.length} Tracks` : "Album"),
            art: rawFeatured?.coverUrl || rawFeatured?.art || "/watch/images/hero-deadline-studio.jpg",
            badge: "SPOTLIGHT",
            album: rawFeatured,
        }
        : null

    const otherAlbumsList = favAlbums.length > 0
        ? favAlbums
        : (featuredList.length > 1 ? featuredList.slice(1, 5) : browseAlbums.slice(0, 4))

    const albums = otherAlbumsList.map((album, idx) => ({
        id: album?._id || album?.id || idx,
        title: album?.title || "Album",
        subtitle: album?.artist?.name || album?.artist || (album?.year ? `${album.year}` : ""),
        art: album?.coverUrl || album?.art || "/watch/images/hero-deadline-studio.jpg",
        album,
    }))

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <AlbumsHeader totalCollection={totalCollection} recentAdditions={recentAdditions} />
            </motion.div>

            {/* Preserving UI design block per Rule 35 & user instruction:
                RecentlyPlayedSection does not have a dedicated backend endpoint (/albums/recently-played) yet.
                Kept intact in codebase and commented out until backend releases user album playback history.
            <motion.div variants={itemVariants}>
                <RecentlyPlayedSection albums={[]} />
            </motion.div>
            */}

            <motion.div variants={itemVariants}>
                <FavoriteAlbumsSection featured={featured} albums={albums} />
            </motion.div>
        </motion.div>
    )
}

export default UserAlbumsPage
