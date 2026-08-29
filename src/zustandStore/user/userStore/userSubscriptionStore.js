import { create } from "zustand"
import {
  subscriptionHero,
  subscriptionPlans,
  featureBreakdownTable,
  subscriptionBenefits,
  subscriptionFaqs,
  subscriptionBrandFooter,
} from "@/dummyData/user/userSubscriptionData"

export const useUserSubscriptionStore = create(() => ({
  subscriptionHero,
  subscriptionPlans,
  featureBreakdownTable,
  subscriptionBenefits,
  subscriptionFaqs,
  subscriptionBrandFooter,
}))
