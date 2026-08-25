"use client"

import { motion } from "framer-motion"
import ProductGallery from "@/components/user/shop/ProductGallery"
import ProductPurchasePanel from "@/components/user/shop/ProductPurchasePanel"
import ProductBentoSection from "@/components/user/shop/ProductBentoSection"

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

const UserProductDetailsPage = ({ product }) => {
    const detail = product.detail

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col gap-6 py-6"
        >
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                <motion.div variants={itemVariants} className="flex w-full flex-1">
                    <ProductGallery images={detail.images} name={detail.name} placeholderIcon={product.placeholderIcon} />
                </motion.div>
                <motion.div variants={itemVariants} className="flex w-full flex-1">
                    <ProductPurchasePanel product={product} />
                </motion.div>
            </div>

            {detail.description && detail.features && (
                <motion.div variants={itemVariants}>
                    <ProductBentoSection description={detail.description} features={detail.features} />
                </motion.div>
            )}
        </motion.div>
    )
}

export default UserProductDetailsPage
