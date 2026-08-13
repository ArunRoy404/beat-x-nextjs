import { create } from "zustand"
import {
  payoutBalance,
  payoutMethods,
  payoutHistory
} from "@/dummyData/artist/artistData/artistPayoutData"

const PROVIDER_COLORS = {
  Bkash: "#E2136E",
  Nagad: "#F5A623",
  Rocket: "#8C3494",
  Upay: "#5B2A86",
}

export const useArtistPayoutStore = create((set) => ({
  payoutBalance: payoutBalance,
  payoutMethods: payoutMethods,
  payoutHistory: payoutHistory,

  addPayoutMethod: (method) => set((state) => ({
    payoutMethods: [
      ...state.payoutMethods,
      {
        id: `pm-${Date.now()}`,
        provider: method.provider,
        label: method.provider === "Bkash" ? "bKash" : method.provider,
        number: method.number,
        isPrimary: state.payoutMethods.length === 0,
        color: PROVIDER_COLORS[method.provider] || "#3ADFFA",
      },
    ]
  })),

  deletePayoutHistoryEntry: (id) => set((state) => ({
    payoutHistory: state.payoutHistory.filter((h) => h.id !== id)
  })),

  requestPayout: (data) => set((state) => {
    const amount = Number(data.amount) || 0
    const methodMeta = state.payoutMethods.find((m) => m.provider === data.method)

    return {
      payoutBalance: {
        ...state.payoutBalance,
        available: Math.max(0, state.payoutBalance.available - amount),
      },
      payoutHistory: [
        {
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          method: methodMeta?.label || data.method,
          amount,
          status: "Pending",
        },
        ...state.payoutHistory,
      ]
    }
  }),
}))
