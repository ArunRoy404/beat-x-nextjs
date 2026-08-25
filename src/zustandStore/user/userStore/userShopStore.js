import { create } from "zustand"
import { shopHero, shopCategories, products } from "@/dummyData/user/userShopData"

export const useUserShopStore = create(() => ({
  shopHero,
  shopCategories,
  products,
}))
