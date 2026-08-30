"use client"

import { motion } from "framer-motion"
import ArtistHeroBanner from "@/components/user/artist/ArtistHeroBanner"
import ArtistTabs from "@/components/user/artist/ArtistTabs"
import SongsTab from "@/components/user/artist/songs/SongsTab"
import ProductsTab from "@/components/user/artist/products/ProductsTab"
import PodcastTab from "@/components/user/artist/podcast/PodcastTab"
import { useUserArtistProfileStore } from "@/zustandStore/user/userStore/userArtistProfileStore"

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

const ArtistProfilePage = ({ slug }) => {
    const activeTab = useUserArtistProfileStore((state) => state.activeTab)
    const setActiveTab = useUserArtistProfileStore((state) => state.setActiveTab)
    const artist = useUserArtistProfileStore((state) => state.getArtistBySlug(slug))

    if (!artist) {
        return (
            <div className="flex w-full flex-col items-center justify-center gap-2 py-24 text-center">
                <h1 className="text-2xl text-whitetext">Artist not found</h1>
                <p className="text-sm text-light-gray">This artist profile is not available yet.</p>
            </div>
        )
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <ArtistHeroBanner artist={artist} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <ArtistTabs activeTab={activeTab} onChange={setActiveTab} />
            </motion.div>

            <motion.div variants={itemVariants}>
                {activeTab === "Songs" && <SongsTab artist={artist} />}
                {activeTab === "Products" && <ProductsTab artist={artist} />}
                {activeTab === "Podcast" && <PodcastTab artist={artist} />}
            </motion.div>
        </motion.div>
    )
}

export default ArtistProfilePage
