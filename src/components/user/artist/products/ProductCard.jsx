import { Coins } from "lucide-react"
import { cn } from "@/lib/utils"

const ProductCard = ({ product }) => {
    return (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dark-accent bg-dark-accent/30 p-2 backdrop-blur-sm">
            <div
                className={cn(
                    "relative flex h-75 w-full flex-col items-end justify-between overflow-hidden rounded-lg border border-whitetext/10 p-4.25"
                )}
                style={{ backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                {product.badge && (
                    <span className="rounded-full bg-red-error/30 px-2 py-1 text-[10px] text-red-error">
                        {product.badge}
                    </span>
                )}
                <span className="ml-auto flex items-center gap-1 rounded-lg border border-yellow-warning bg-whitetext/20 px-2 py-1">
                    <Coins className="size-4 text-yellow-warning" />
                    <span className="text-[10px] text-yellow-warning">{product.coinPrice}</span>
                </span>
            </div>
            <div className="flex w-full flex-col gap-2 p-1">
                <span className="truncate text-xl font-medium text-whitetext sm:text-2xl">{product.title}</span>
                <span className="truncate text-sm text-light-gray sm:text-base">{product.subtitle}</span>
                <span className="text-lg font-semibold text-secondary sm:text-2xl">{product.price}</span>
            </div>
        </div>
    )
}

export default ProductCard
