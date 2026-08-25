import { ShoppingBag } from "lucide-react"
import { useUserShopStore } from "@/zustandStore/user/userStore/userShopStore"
import ProductImagePlaceholder from "./ProductImagePlaceholder"

const ShopHeroBanner = () => {
    const shopHero = useUserShopStore((state) => state.shopHero)

    return (
        <div className="relative h-[420px] w-full shrink-0 overflow-hidden rounded-[16px] sm:h-[420px] lg:h-[450px]">
            {shopHero.artwork ? (
                <img alt="" className="absolute inset-0 h-full w-full object-cover" src={shopHero.artwork} />
            ) : (
                <ProductImagePlaceholder
                    icon={shopHero.placeholderIcon}
                    className="absolute inset-0 justify-end pr-16"
                    iconClassName="size-40 text-primary/15"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-transparent" />

            <div className="absolute inset-y-0 left-0 z-10 flex max-w-xl flex-col justify-center gap-3 px-6 py-8 sm:gap-4 sm:px-12">
                <span className="w-fit rounded-full bg-trending-badge-bg/10 px-3 py-1 text-xs text-trending-badge-bg">
                    {shopHero.badge}
                </span>
                <h1 className="text-4xl leading-tight font-semibold text-whitetext sm:text-6xl lg:text-[72px]">
                    <span className="block">{shopHero.titleLine1}</span>
                    <span className="block text-primary">{shopHero.titleLine2}</span>
                </h1>
                <p className="max-w-md text-sm text-light-gray sm:text-lg">{shopHero.description}</p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        className="flex cursor-pointer items-center gap-2 rounded-[32px] bg-secondary px-5 py-3 text-sm font-semibold text-button-text transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                    >
                        <ShoppingBag className="size-5" />
                        Shop Collection
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer rounded-full border border-white/10 bg-(--glass-panel-bg) px-5 py-3 text-sm font-semibold text-whitetext backdrop-blur-md transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                    >
                        Explore Lookbook
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShopHeroBanner
