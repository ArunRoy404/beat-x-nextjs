import { cn } from "@/lib/utils"
import ProductIcon from "./ProductIcon"

const ProductImagePlaceholder = ({ icon = "audioLines", className, iconClassName }) => (
    <div className={cn("flex items-center justify-center bg-gradient-to-br from-dark-accent via-background to-dark-accent", className)}>
        <ProductIcon name={icon} className={cn("size-16 text-secondary/25", iconClassName)} />
    </div>
)

export default ProductImagePlaceholder
