import { create } from "zustand";
import {
  adminSubscriptionsStatsCards,
  adminSubscriptionPlansData,
  adminMrrGrowthData,
  adminPlanDistributionData,
  adminSubscribersListData,
} from "@/dummyData/admin/adminData/adminSubscriptionsData";

export const useAdminSubscriptionsStore = create((set) => ({
  activeMainTab: "Subscription Plans", // "Subscription Plans" | "Subscriber List"
  statsCards: adminSubscriptionsStatsCards,
  plans: adminSubscriptionPlansData,
  mrrGrowth: adminMrrGrowthData,
  planDistribution: adminPlanDistributionData,
  subscribers: adminSubscribersListData,
  selectedPlanFilter: "All",
  searchQuery: "",
  currentPage: 1,
  
  // Modal states
  isAddPlanModalOpen: false,
  editingPlan: null,

  setActiveMainTab: (tab) => set({ activeMainTab: tab }),
  setSelectedPlanFilter: (filter) => set({ selectedPlanFilter: filter, currentPage: 1 }),
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  
  openAddPlanModal: () => set({ isAddPlanModalOpen: true, editingPlan: null }),
  openEditPlanModal: (plan) => set({ isAddPlanModalOpen: true, editingPlan: plan }),
  closeAddPlanModal: () => set({ isAddPlanModalOpen: false, editingPlan: null }),

  addPlan: (newPlan) => set((state) => ({ plans: [...state.plans, newPlan] })),
  updatePlan: (updatedPlan) =>
    set((state) => ({
      plans: state.plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)),
    })),
  deletePlan: (planId) =>
    set((state) => ({
      plans: state.plans.filter((p) => p.id !== planId),
    })),
}));
