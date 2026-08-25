"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useUserShopStore } from "@/zustandStore/user/userStore/userShopStore"
import ProductCard from "./ProductCard"

const ProductGrid = () => {
    const products = useUserShopStore((state) => state.products)
    const [activePage, setActivePage] = useState(1)

    return (
        <section className="flex w-full flex-col items-center gap-6">
            <div className="grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    aria-label="Previous page"
                    className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-(--glass-panel-bg) backdrop-blur-md"
                >
                    <ChevronLeft className="size-4 text-whitetext" />
                </button>
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setActivePage(page)}
                            className={cn(
                                "flex size-12 cursor-pointer items-center justify-center rounded-full text-base font-bold",
                                activePage === page
                                    ? "bg-primary text-button-text"
                                    : "border border-white/10 bg-(--glass-panel-bg) text-whitetext backdrop-blur-md"
                            )}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    aria-label="Next page"
                    className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-(--glass-panel-bg) backdrop-blur-md"
                >
                    <ChevronRight className="size-4 text-whitetext" />
                </button>
            </div>
        </section>
    )
}

export default ProductGrid
