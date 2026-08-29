import { create } from "zustand"
import {
  checkoutShippingDefaults,
  checkoutPaymentMethods,
  checkoutCardDefaults,
  orderSummaryItems,
  orderSummaryTotals,
} from "@/dummyData/user/userCheckoutData"

export const useUserCheckoutStore = create(() => ({
  checkoutShippingDefaults,
  checkoutPaymentMethods,
  checkoutCardDefaults,
  orderSummaryItems,
  orderSummaryTotals,
}))
