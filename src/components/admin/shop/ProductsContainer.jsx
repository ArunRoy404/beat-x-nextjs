"use client"

import React, { useEffect, useState, useMemo } from "react"
import ProductCard from "./ProductCard"
import ProductDetailsDialog from "@/components/dialogs/admin/shop/ProductDetailsDialog"
import AddProductDialog from "@/components/dialogs/admin/shop/AddProductDialog"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import { useUrlListParams } from "@/hooks/useUrlListParams"
import { useProducts } from "@/hooks/api/admin/products/useProducts"
import { buildProductsParams } from "@/hooks/api/admin/products/productsParams"
import { Plus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

const STATUS_TABS = ["All", "Active", "Out of Stock", "Draft", "Under review", "Rejected"]
const SEARCH_DEBOUNCE_MS = 300

const ProductsContainer = () => {
  const { get, setParams } = useUrlListParams()

  const selectedStatus = get("status", "all")
  const urlSearch = get("q", "")
  const currentPage = Number(get("page", "1")) || 1
  const limit = Number(get("limit", "20")) || 20

  const [searchInput, setSearchInput] = useState(urlSearch)

  useEffect(() => {
    setSearchInput(urlSearch)
  }, [urlSearch])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim() !== urlSearch) {
        setParams({ q: searchInput.trim() })
      }
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  const params = useMemo(() => {
    return buildProductsParams({
      status: selectedStatus,
      q: urlSearch,
      page: currentPage,
      limit,
    })
  }, [selectedStatus, urlSearch, currentPage, limit])

  const { data, isLoading, isError, error, refetch } = useProducts(params)

  const rawProducts = data?.products ?? (Array.isArray(data) ? data : [])
  const productsList = Array.isArray(rawProducts) ? rawProducts : []
  const total = data?.total ?? productsList.length
  const totalPages = (data?.totalPages ?? Math.ceil(total / limit)) || 1

  const activeTabName = useMemo(() => {
    const s = (selectedStatus || "").toLowerCase().replace(/_/g, " ")
    const matched = STATUS_TABS.find((t) => t.toLowerCase() === s)
    return matched || "All"
  }, [selectedStatus])

  const handleTabChange = (tabName) => {
    if (tabName.toLowerCase() === "all") {
      setParams({ status: undefined })
    } else {
      setParams({ status: tabName.toLowerCase().replace(/\s+/g, "_") })
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <CommonTableContainer
        headerChildren={
          <>
            {/* Tab pills */}
            <CommonFilter
              tabs={STATUS_TABS}
              activeTab={activeTabName}
              onChange={handleTabChange}
            />

            {/* Right Side: Search */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <CommonSearch
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="flex-1 md:w-72"
              />
            </div>
          </>
        }
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner className="size-6 text-secondary" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <span className="text-red-error text-sm">{error?.message || "Failed to load products."}</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : (
          /* Grid of Product Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
            {productsList.map((product) => (
              <ProductDetailsDialog key={product._id || product.id} product={product}>
                <div className="cursor-pointer transition-transform duration-100 active:scale-95 w-full h-full">
                  <ProductCard product={product} />
                </div>
              </ProductDetailsDialog>
            ))}

            {/* Add New Product Card placeholder at the end */}
            <AddProductDialog>
              <div className="flex flex-col items-center justify-center gap-3 rounded-[8px] border border-dashed border-[#1E5C3E] bg-[#0B1A14]/40 hover:bg-[#0B1A14]/70 hover:border-[#34C759]/60 cursor-pointer select-none transition-all p-6 min-h-[310px] h-full w-full group">
                <div className="w-12 h-12 rounded-full bg-[#133D29] border border-[#1E5C3E] group-hover:border-[#34C759]/50 flex items-center justify-center text-[#34C759] group-hover:scale-110 transition-transform shrink-0">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[#34C759] text-[15px] font-semibold font-sans">Add New Product</span>
              </div>
            </AddProductDialog>
          </div>
        )}
      </CommonTableContainer>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={currentPage}
        totalItems={total}
        pageSize={limit}
        totalPages={totalPages}
        onPageChange={(p) => setParams({ page: p }, { resetPage: false })}
      />
    </div>
  )
}

export default ProductsContainer


