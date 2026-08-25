"use client"

import { motion } from "framer-motion"
import ShopHeroBanner from "@/components/user/shop/ShopHeroBanner"
import ShopCategoryChips from "@/components/user/shop/ShopCategoryChips"
import ProductGrid from "@/components/user/shop/ProductGrid"

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

const UserShopPage = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <motion.div variants={itemVariants}>
                <ShopHeroBanner />
            </motion.div>

            <motion.div variants={itemVariants}>
                <ShopCategoryChips />
            </motion.div>

            <motion.div variants={itemVariants}>
                <ProductGrid />
            </motion.div>
        </motion.div>
    )
}

export default UserShopPage
