"use client"

import React from "react"
import { useArtistShopStore } from "@/zustandStore/artist/artistStore/artistShopStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AddNewProduct from "@/components/artist/shop/AddNewProduct"
import ProductsContainer from "@/components/artist/shop/ProductsContainer"

const ArtistMerchandisePage = () => {
  const statsCards = useArtistShopStore((state) => state.shopStatsCards)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Upper Stats grid */}
      <DashboardStats statsCards={statsCards} />

      {/* Add New Product Banner */}
      <AddNewProduct />

      {/* Products list and filter container */}
      <ProductsContainer />
    </div>
  )
}

export default ArtistMerchandisePage
