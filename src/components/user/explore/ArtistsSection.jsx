"use client"

import { motion } from "framer-motion"
import ArtistCard from "@/components/user/explore/ArtistCard"
import { useUserExploreArtistsStore } from "@/zustandStore/user/userStore/userExploreArtistsStore"

const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06
        }
    }
}

const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
        }
    }
}

const ArtistsSection = () => {
    const artists = useUserExploreArtistsStore((state) => state.artists)

    return (
        <section className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Artists</h2>
                <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                    View All Artists
                </button>
            </div>
            <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
                {artists.map((artist) => (
                    <motion.div key={artist.id} variants={gridItemVariants}>
                        <ArtistCard artist={artist} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default ArtistsSection
