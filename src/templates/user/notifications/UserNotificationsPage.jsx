"use client"

import { motion } from "framer-motion"
import FilterPills from "@/components/shared/FilterPills"
import NotificationsList from "@/components/user/notifications/NotificationsList"
import { useUserNotificationsStore } from "@/zustandStore/user/userStore/userNotificationsStore"

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

const UserNotificationsPage = () => {
    const notificationsFilters = useUserNotificationsStore((state) => state.notificationsFilters)
    const activeFilter = useUserNotificationsStore((state) => state.activeFilter)
    const setActiveFilter = useUserNotificationsStore((state) => state.setActiveFilter)
    const markAllAsRead = useUserNotificationsStore((state) => state.markAllAsRead)
    const filteredNotifications = useUserNotificationsStore((state) => state.getFilteredNotifications())

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants} className="flex w-full items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                    <h1 className="text-2xl text-whitetext sm:text-[32px]">Notifications</h1>
                    <p className="text-base font-semibold text-light-gray">Stay updated with your sonic universe.</p>
                </div>
                <button
                    type="button"
                    onClick={markAllAsRead}
                    className="shrink-0 cursor-pointer text-sm font-semibold text-secondary hover:underline sm:text-base"
                >
                    Mark all as read
                </button>
            </motion.div>

            <motion.div variants={itemVariants}>
                <FilterPills filters={notificationsFilters} activeFilter={activeFilter} onChange={setActiveFilter} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <NotificationsList notifications={filteredNotifications} />
            </motion.div>
        </motion.div>
    )
}

export default UserNotificationsPage
