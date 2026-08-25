import Link from "next/link"
import { Heart, Leaf, Plus, Star, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import ProductImagePlaceholder from "./ProductImagePlaceholder"

const badgeToneClasses = {
    red: "bg-red-error/20 text-red-error",
    lime: "bg-trending-badge-bg text-button-text",
}

const ProductMeta = ({ meta }) => {
    switch (meta?.type) {
        case "quickAdd":
            return (
                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-xs text-background"
                >
                    <Plus className="size-4" />
                    Quick Add
                </button>
            )
        case "authentic":
            return (
                <span className="flex items-center gap-1 rounded-2xl border border-trending-badge-bg/20 bg-trending-badge-bg/10 px-2.25 py-0.75 text-xs text-trending-badge-bg">
                    <Leaf className="size-3" />
                    ARTIST AUTHENTIC
                </span>
            )
        case "limitedPairs":
        case "collector":
            return <span className="text-xs font-semibold text-light-gray">{meta.label}</span>
        case "rating":
            return (
                <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-3 fill-light-gray text-light-gray" />
                    ))}
                    <span className="text-xs text-light-gray">({meta.count})</span>
                </span>
            )
        case "freeShipping":
            return (
                <span className="flex items-center gap-1 text-xs font-semibold text-light-gray">
                    <Truck className="size-3.5" />
                    FREE SHIPPING
                </span>
            )
        case "onlyLeft":
            return (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-trending-badge-bg">
                    <span className="size-2 rounded-full bg-trending-badge-bg" />
                    {meta.label}
                </span>
            )
        default:
            return null
    }
}

const ProductCard = ({ product }) => {
    return (
        <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-[16px] border border-white/10 bg-dark-accent">
            <Link href={`/shop/${product.id}`} aria-label={product.name} className="absolute inset-0 z-10" />

            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-background p-4">
                {product.thumbnail ? (
                    <img alt={product.name} src={product.thumbnail} className="h-full w-full object-contain" />
                ) : (
                    <ProductImagePlaceholder icon={product.placeholderIcon} className="h-full w-full" />
                )}
                {product.badge && (
                    <span
                        className={cn(
                            "absolute top-3 left-3 rounded-2xl px-2 py-1 text-xs font-semibold",
                            badgeToneClasses[product.badge.tone]
                        )}
                    >
                        {product.badge.label}
                    </span>
                )}
                <button
                    type="button"
                    aria-label={`Wishlist ${product.name}`}
                    className="absolute top-3 right-3 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-(--glass-panel-bg) backdrop-blur-md"
                >
                    <Heart className="size-5 text-whitetext" />
                </button>
            </div>
            <div className="flex flex-col gap-2 px-3 pb-3">
                <span className="truncate text-2xl font-semibold text-whitetext">{product.name}</span>
                <p className="truncate text-sm text-light-gray">{product.tagline}</p>

                {product.colors && (
                    <div className="flex items-center gap-2">
                        {product.colors.map((hex) => (
                            <span
                                key={hex}
                                style={{ backgroundColor: hex }}
                                className="size-4 rounded-full border border-dark-gray"
                            />
                        ))}
                    </div>
                )}
                {product.sizes && (
                    <div className="flex items-center gap-2">
                        {product.sizes.map((size) => (
                            <span
                                key={size}
                                className="rounded-2xl border border-dark-gray px-3 py-1 text-xs font-semibold text-light-gray"
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-secondary">{product.price}</span>
                    <span className="relative z-20">
                        <ProductMeta meta={product.meta} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
