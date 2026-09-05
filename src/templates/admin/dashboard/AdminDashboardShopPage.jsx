"use client"

import React, { useMemo } from "react"
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats"
import AddNewProduct from "@/components/admin/shop/AddNewProduct"
import ProductsContainer from "@/components/admin/shop/ProductsContainer"
import { useProductsDashboard } from "@/hooks/api/admin/products/useProductsDashboard"
import { useProducts } from "@/hooks/api/admin/products/useProducts"
import { buildProductsParams } from "@/hooks/api/admin/products/productsParams"
import { useUrlListParams } from "@/hooks/useUrlListParams"

const AdminDashboardShopPage = () => {
  const { get } = useUrlListParams()
  const selectedStatus = get("status", "all")
  const urlSearch = get("q", "")
  const currentPage = Number(get("page", "1")) || 1

  const params = buildProductsParams({
    status: selectedStatus,
    q: urlSearch,
    page: currentPage,
  })

  const { data: statsData } = useProductsDashboard()
  const { data: productsData } = useProducts(params)

  const formatRevenue = (val) => {
    if (!val) return "৳0"
    if (val >= 1000000) return `৳${(val / 1000000).toFixed(1).replace(/\.0$/, "")}M`
    if (val >= 1000) return `৳${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
    return `৳${val.toString()}`
  }

  const statsCards = useMemo(() => {
    const totalCount = statsData?.totalProducts ?? productsData?.total ?? 0
    const activeCount = statsData?.activeCount ?? 0
    const soldCount = statsData?.totalSold ?? 0
    const revenueVal = statsData?.totalRevenue ?? 0

    return [
      {
        id: 1,
        title: "Total Products",
        value: totalCount.toLocaleString(),
        icon: "ShoppingBag",
        iconColor: "#CC97FF",
        iconBg: "rgba(204, 151, 255, 0.15)",
      },
      {
        id: 2,
        title: "Active Products",
        value: activeCount.toLocaleString(),
        icon: "CheckCircle",
        iconColor: "#34C759",
        iconBg: "rgba(52, 199, 89, 0.15)",
      },
      {
        id: 3,
        title: "Total Sold",
        value: soldCount.toLocaleString(),
        icon: "TrendingUp",
        iconColor: "#3ADFFA",
        iconBg: "rgba(58, 223, 250, 0.15)",
      },
      {
        id: 4,
        title: "Total Revenue",
        value: formatRevenue(revenueVal),
        icon: "DollarSign",
        iconColor: "#FFAE00",
        iconBg: "rgba(255, 174, 0, 0.15)",
      },
    ]
  }, [statsData, productsData])

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


