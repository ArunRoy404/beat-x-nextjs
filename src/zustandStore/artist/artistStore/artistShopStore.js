import { create } from "zustand"
import {
  shopStatsCards,
  initialProductsList
} from "@/dummyData/artist/artistData/artistShopData"

export const useArtistShopStore = create((set) => ({
  shopStatsCards: shopStatsCards,
  productsList: initialProductsList,
  selectedStatusFilter: "All",
  searchQuery: "",
  currentPage: 1,

  setShopStatsCards: (cards) => set({ shopStatsCards: cards }),
  setProductsList: (list) => set({ productsList: list }),
  setSelectedStatusFilter: (filter) => set({ selectedStatusFilter: filter, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  addProduct: (product) => set((state) => ({
    productsList: [
      {
        id: `prod-${Date.now()}`,
        currency: "৳",
        stock: 42,
        sold: 0,
        status: "Active",
        coinBadge: "50 coin",
        ...product
      },
      ...state.productsList,
    ]
  })),

  deleteProduct: (id) => set((state) => ({
    productsList: state.productsList.filter((p) => p.id !== id)
  })),

  updateProduct: (updatedProduct) => set((state) => ({
    productsList: state.productsList.map((p) => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p)
  }))
}))
