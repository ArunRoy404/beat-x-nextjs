"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ShieldCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import ProductIcon from "./ProductIcon"

const CartIcon = (props) => (
    <svg viewBox="0 0 20.7 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M10 8V5H7V3H10V0H12V3H15V5H12V8H10V8M6 21C5.45 21 4.97917 20.8042 4.5875 20.4125C4.19583 20.0208 4 19.55 4 19C4 18.45 4.19583 17.9792 4.5875 17.5875C4.97917 17.1958 5.45 17 6 17C6.55 17 7.02083 17.1958 7.4125 17.5875C7.80417 17.9792 8 18.45 8 19C8 19.55 7.80417 20.0208 7.4125 20.4125C7.02083 20.8042 6.55 21 6 21V21M16 21C15.45 21 14.9792 20.8042 14.5875 20.4125C14.1958 20.0208 14 19.55 14 19C14 18.45 14.1958 17.9792 14.5875 17.5875C14.9792 17.1958 15.45 17 16 17C16.55 17 17.0208 17.1958 17.4125 17.5875C17.8042 17.9792 18 18.45 18 19C18 19.55 17.8042 20.0208 17.4125 20.4125C17.0208 20.8042 16.55 21 16 21V21M0 3V1H3.275L7.525 10H14.525V10V10L18.425 3H20.7L16.3 10.95C16.1167 11.2833 15.8708 11.5417 15.5625 11.725C15.2542 11.9083 14.9167 12 14.55 12H7.1L6 14V14V14H18V16H6C5.25 16 4.67917 15.675 4.2875 15.025C3.89583 14.375 3.88333 13.7167 4.25 13.05L5.6 10.6L2 3H0V3"
            fill="currentColor"
        />
    </svg>
)

const ProductPurchasePanel = ({ product }) => {
    const router = useRouter()
    const detail = product.detail
    const [activeColor, setActiveColor] = useState(detail.defaultColorIndex ?? 0)
    const [activeSize, setActiveSize] = useState(detail.defaultSize ?? detail.sizes?.[0])

    return (
        <div className="flex w-full flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                    {detail.badge && (
                        <span className="rounded-full border border-trending-badge-bg/20 bg-trending-badge-bg/10 px-3.25 py-1.25 text-xs font-semibold text-trending-badge-bg">
                            {detail.badge.label}
                        </span>
                    )}
                    {detail.model && <span className="text-xs font-semibold text-light-gray">{detail.model}</span>}
                </div>
                <h1 className="text-3xl leading-tight font-black text-whitetext sm:text-4xl lg:text-[40px]">{detail.name}</h1>
                <div className="flex flex-wrap items-baseline gap-4">
                    <span className="text-2xl font-black text-secondary">{detail.price}</span>
                    {detail.originalPrice && (
                        <span className="text-base text-light-gray line-through">{detail.originalPrice}</span>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {detail.colors && (
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-semibold text-light-gray">SELECT SPECTRUM</span>
                        <div className="flex items-center gap-4">
                            {detail.colors.map((color, index) => (
                                <button
                                    key={color.hex}
                                    type="button"
                                    aria-label={color.label}
                                    onClick={() => setActiveColor(index)}
                                    style={{ backgroundColor: color.hex }}
                                    className={cn(
                                        "size-12 cursor-pointer rounded-full",
                                        index === activeColor ? "border-2 border-primary" : "border border-dark-gray"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {detail.sizes && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-light-gray">CHOOSE FIT</span>
                            <button type="button" className="cursor-pointer text-xs font-semibold text-primary">
                                SIZE GUIDE
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            {detail.sizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setActiveSize(size)}
                                    className={cn(
                                        "flex cursor-pointer items-center justify-center rounded-[32px] text-base font-semibold",
                                        size === activeSize
                                            ? "bg-primary px-8 py-3 text-button-text shadow-[0px_0px_10px_rgba(204,151,255,0.3)]"
                                            : "border border-(--glass-panel-border) bg-background px-8.25 py-3.25 text-light-gray"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {detail.techSpec && (
                <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-[16px] border border-(--glass-panel-border) bg-(--glass-panel-bg) p-6.25 backdrop-blur-[20px]">
                    <div className="relative flex items-start gap-4">
                        <ProductIcon name={detail.techSpec.icon || "audioLines"} className="size-6 shrink-0 text-secondary" />
                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-black text-whitetext">{detail.techSpec.title}</span>
                            <span className="text-xs text-light-gray">{detail.techSpec.description}</span>
                        </div>
                    </div>
                    <div aria-hidden className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-secondary/10 blur-[32px]" />
                </div>
            )}

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => router.push("/shop/checkout")}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-lg font-semibold text-background transition-transform active:scale-95"
                >
                    <CartIcon className="size-5" />
                    Add to Cart
                </button>
                <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-(--glass-panel-border) bg-(--glass-panel-bg) backdrop-blur-md"
                >
                    <Heart className="size-6 text-whitetext" />
                </button>
            </div>

            {(detail.fastShipping || detail.authenticityChip) && (
                <div className="flex items-center gap-8 border-t border-(--glass-panel-border) pt-4.25">
                    {detail.fastShipping && (
                        <span className="flex items-center gap-2 text-xs font-semibold text-light-gray">
                            <Zap className="size-5 text-trending-badge-bg" />
                            FAST SYNC SHIPPING
                        </span>
                    )}
                    {detail.authenticityChip && (
                        <span className="flex items-center gap-2 text-xs font-semibold text-light-gray">
                            <ShieldCheck className="size-5 text-primary" />
                            AUTHENTICITY CHIP
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductPurchasePanel
