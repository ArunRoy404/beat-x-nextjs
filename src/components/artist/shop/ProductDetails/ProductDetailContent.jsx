"use client"

import React from "react"
import Image from "next/image"
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox"

const FALLBACK_GALLERY = [
  "/product-images/rainbow_shirt.png",
  "/product-images/t-shirt.png",
  "/product-images/hoodie.png",
  "/product-images/bag.png"
]

const ProductDetailContent = ({ product }) => {
  const galleryImages = product?.images?.length
    ? product.images.filter(Boolean)
    : FALLBACK_GALLERY

  return (
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      {/* Product Images Section */}
      <div className="flex flex-col gap-2 w-full shrink-0">
        <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider font-sans">
          Product images
        </span>
        <div className="grid grid-cols-4 gap-3 w-full">
          {galleryImages.map((imgUrl, index) => (
            <div
              key={index}
              className="relative aspect-square sm:h-[120px] rounded-[8px] border border-[#484847]/15 overflow-hidden bg-white/[0.02]"
            >
              <Image
                src={imgUrl}
                alt={`Product thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info Boxes Grid */}
      <div className="grid grid-cols-2 gap-4 shrink-0">
        <CommonInfoBox label="Category" value={product?.category || "vinyl"} />
        <CommonInfoBox label="Price" value={`${product?.currency === "$" ? "$" : "৳"}${product?.price ?? 2800}`} />
        <CommonInfoBox label="In Stock" value={product?.stock ?? 12} />
        <CommonInfoBox label="Units Sold" value={product?.sold ?? 43} />
        <CommonInfoBox label="Coin Reward" value={product?.coinBadge ? `${product.coinBadge}s` : "50 coins"} />
        <CommonInfoBox label="Artist" value={product?.artist || "Various"} />
      </div>

      {/* Color Variants Section */}
      <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-2 w-full shrink-0">
        <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider font-sans">
          Color Variants
        </span>
        <div className="flex items-center gap-2">
          {/* Mock circular color dots */}
          <span className="w-5 h-5 rounded-full border border-white/25 bg-[#2E2E2D]" />
          <span className="w-5 h-5 rounded-full border border-white/10 bg-[#CC97FF]" />
          <span className="w-5 h-5 rounded-full border border-white/10 bg-[#3ADFFA]" />
        </div>
      </div>

      {/* Description Section */}
      <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 px-4 flex flex-col gap-1.5 w-full shrink-0">
        <span className="text-[12px] text-dark-gray font-normal not-italic uppercase tracking-wider font-sans">
          Description
        </span>
        <span className="text-[13px] text-whitetext/90 leading-relaxed font-normal">
          {product?.description ||
            `${product?.title || "BeatX Vinyl Collection Vol.1"} — official merchandise by Various. Premium quality with ${product?.stock ?? 12} units currently in stock.`}
        </span>
      </div>
    </div>
  )
}

export default ProductDetailContent
