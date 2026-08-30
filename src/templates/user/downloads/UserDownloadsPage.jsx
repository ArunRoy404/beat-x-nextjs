"use client"

import { motion } from "framer-motion"
import StorageUsageCard from "@/components/user/downloads/StorageUsageCard"
import RecommendedDownloadBanner from "@/components/user/downloads/RecommendedDownloadBanner"
import FilterPills from "@/components/shared/FilterPills"
import DownloadsTable from "@/components/user/downloads/DownloadsTable"
import RecommendedDownloadHero from "@/components/user/downloads/RecommendedDownloadHero"
import SmartDownloadsCard from "@/components/user/downloads/SmartDownloadsCard"
import { useUserDownloadsStore } from "@/zustandStore/user/userStore/userDownloadsStore"

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

const UserDownloadsPage = () => {
    const storageUsage = useUserDownloadsStore((state) => state.storageUsage)
    const recommendedDownload = useUserDownloadsStore((state) => state.recommendedDownload)
    const downloadsFilters = useUserDownloadsStore((state) => state.downloadsFilters)
    const activeFilter = useUserDownloadsStore((state) => state.activeFilter)
    const setActiveFilter = useUserDownloadsStore((state) => state.setActiveFilter)
    const smartDownloads = useUserDownloadsStore((state) => state.smartDownloads)
    const filteredItems = useUserDownloadsStore((state) => state.getFilteredItems())

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants} className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h1 className="text-2xl text-whitetext sm:text-[32px]">Downloads</h1>
                    <p className="text-base font-semibold text-light-gray">Manage your high-fidelity offline collection across all devices.</p>
                </div>
                <StorageUsageCard storageUsage={storageUsage} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <RecommendedDownloadBanner recommendedDownload={recommendedDownload} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <FilterPills filters={downloadsFilters} activeFilter={activeFilter} onChange={setActiveFilter} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <DownloadsTable items={filteredItems} />
            </motion.div>

            <motion.div variants={itemVariants} className="flex w-full flex-col gap-6 lg:flex-row">
                <RecommendedDownloadHero recommendedDownload={recommendedDownload} />
                <SmartDownloadsCard smartDownloads={smartDownloads} />
            </motion.div>
        </motion.div>
    )
}

export default UserDownloadsPage
