"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useUserShopStore } from "@/zustandStore/user/userStore/userShopStore"

const ShopCategoryChips = () => {
    const shopCategories = useUserShopStore((state) => state.shopCategories)
    const [active, setActive] = useState(shopCategories[0])

    return (
        <div className="flex w-full items-center gap-2 overflow-x-auto">
            {shopCategories.map((category) => (
                <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    className={cn(
                        "shrink-0 cursor-pointer rounded-full px-4 py-2 text-base whitespace-nowrap",
                        active === category ? "bg-secondary text-button-text" : "bg-dark-accent text-light-gray"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default ShopCategoryChips
