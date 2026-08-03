"use client"

import React from "react"
import { useAdminDashboardShopStore } from "@/zustandStore/admin/adminStore/adminDashboardShopStore"
import ProductCard from "./ProductCard"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import { Plus } from "lucide-react"

const ProductsContainer = () => {
  const productsList = useAdminDashboardShopStore((state) => state.productsList)
  const selectedStatusFilter = useAdminDashboardShopStore((state) => state.selectedStatusFilter)
  const setSelectedStatusFilter = useAdminDashboardShopStore((state) => state.setSelectedStatusFilter)
  const searchQuery = useAdminDashboardShopStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardShopStore((state) => state.setSearchQuery)
  const currentPage = useAdminDashboardShopStore((state) => state.currentPage)
  const setCurrentPage = useAdminDashboardShopStore((state) => state.setCurrentPage)

  // Filter list
  const filteredProducts = productsList.filter((prod) => {
    // Tab Filter
    if (selectedStatusFilter !== "All") {
      if (prod.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) {
        return false
      }
    }
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !prod.title.toLowerCase().includes(q) &&
        !prod.category.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Pagination config (8 per page)
  const pageSize = 8
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const tabs = ["All", "Active", "Out of Stock", "Draft", "Under review", "Rejected"]

  return (
    <div className="flex flex-col gap-6 w-full">
      <CommonTableContainer
        headerChildren={
          <>
            {/* Tab pills */}
            <CommonFilter
              tabs={tabs}
              activeTab={selectedStatusFilter}
              onChange={(tab) => setSelectedStatusFilter(tab)}
            />

            {/* Right Side: Search */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <CommonSearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 md:w-72"
              />
            </div>
          </>
        }
      >
        {/* Grid of Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Add New Product Card placeholder at the end */}
          <div className="flex h-full min-h-[330px] flex-col items-center justify-center gap-2.5 rounded-[8px] border-dashed border-2 border-green-success/15 hover:border-green-success/30 bg-green-success/5 cursor-pointer select-none transition-all group">
            <div className="w-10 h-10 rounded-full bg-green-success/10 flex items-center justify-center text-green-success group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-green-success text-[15px] font-semibold">Add New Product</span>
          </div>
        </div>
      </CommonTableContainer>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default ProductsContainer
