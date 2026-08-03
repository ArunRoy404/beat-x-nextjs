import React from "react"
import Image from "next/image"

const ProductCard = ({ product }) => {
  const isLowStock = product.stock > 0 && product.stock <= 5

  return (
    <div
      className="flex p-1 flex-col items-center gap-2 rounded-[8px] border border-[#20201F] bg-[#20201F]/30 backdrop-blur-[5px] w-full select-none"
    >
      {/* Image container */}
      <div className="relative flex h-[221px] p-1 flex-col items-end justify-between self-stretch rounded-[8px] border border-[#484847]/15 overflow-hidden w-full">
        {/* Next.js Image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-[8px]"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none w-[calc(100%-1rem)]">
          {/* Low Stock / Tag (left overlay) */}
          {product.tag === "LOW STOCK" || isLowStock ? (
            <span className="bg-red-error text-white font-bold text-[9px] uppercase px-1.5 py-0.5 rounded-[4px] shadow-md select-none">
              Low Stock
            </span>
          ) : (
            <div />
          )}

          {/* Coin Badge (right overlay) */}
          {product.coinBadge && (
            <div className="flex items-center gap-1 bg-[#FFAE00]/10 border border-[#FFAE00]/30 text-[#FFAE00] px-1.5 py-0.5 rounded-[4px] text-[10px] font-semibold font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAE00]" />
              {product.coinBadge}
            </div>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="flex p-1 px-1.5 flex-col gap-2 self-stretch w-full">
        {/* Title and Status Badge Row */}
        <div className="flex items-center justify-between gap-2 w-full">
          <h3 className="text-white font-semibold font-sans text-[16px] truncate max-w-[70%]">
            {product.title}
          </h3>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border select-none ${
              product.status === "Active"
                ? "bg-green-success/15 text-green-success border-green-success/20"
                : product.status === "Rejected"
                ? "bg-red-error/15 text-red-error border-red-error/20"
                : product.status === "Draft"
                ? "bg-white/5 text-light-gray/60 border-white/10"
                : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20" // Under review
            }`}
          >
            {product.status}
          </span>
        </div>

        {/* Category / Sub-details */}
        <p className="text-[#ADAAAA] text-[12px] font-normal font-sans truncate w-full">
          {product.category}
        </p>

        {/* Price and Stock / Sold Stats Row */}
        <div className="flex items-center justify-between gap-2 w-full mt-1">
          {/* Price */}
          <span className="text-[#3ADFFA] text-[16px] font-semibold font-sans">
            {product.currency === "$" ? "$" : "৳"}{product.price.toFixed(2)}
          </span>

          {/* Stock and Sold */}
          <div className="flex items-center gap-3 text-[12px] font-normal font-sans">
            <span className="text-[#ADAAAA]">
              Stock: <strong className="font-semibold text-white/80">{product.stock}</strong>
            </span>
            <span className="text-[#34C759]">
              Sold: <strong className="font-semibold text-[#34C759]">{product.sold}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
