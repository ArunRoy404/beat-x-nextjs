"use client"

import React from "react"
import { useAdminDashboardShopStore } from "@/zustandStore/admin/adminStore/adminDashboardShopStore"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AddNewProduct from "@/components/admin/shop/AddNewProduct"
import ProductsContainer from "@/components/admin/shop/ProductsContainer"

const AdminDashboardShopPage = () => {
  const statsCards = useAdminDashboardShopStore((state) => state.shopStatsCards)

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

export default AdminDashboardShopPage
