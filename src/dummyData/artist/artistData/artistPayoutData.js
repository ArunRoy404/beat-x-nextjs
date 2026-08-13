export const payoutBalance = {
  available: 24500,
  minWithdrawal: 500,
}

export const payoutMethods = [
  {
    id: "pm-1",
    provider: "Bkash",
    label: "bKash",
    number: "01711-123456",
    isPrimary: true,
    color: "#E2136E",
  },
  {
    id: "pm-2",
    provider: "Nagad",
    label: "Nagad",
    number: "01811-654321",
    isPrimary: false,
    color: "#F5A623",
  },
]

export const payoutHistory = [
  { id: 1, date: "2026-05-12", method: "bKash", amount: 18500, status: "Completed" },
  { id: 2, date: "2026-05-12", method: "Nagad", amount: 15200, status: "Completed" },
  { id: 3, date: "2026-01-24", method: "bKash", amount: 12800, status: "Completed" },
  { id: 4, date: "2026-01-24", method: "Nagad", amount: 9400, status: "Completed" },
  { id: 5, date: "2025-12-18", method: "bKash", amount: 21000, status: "Completed" },
  { id: 6, date: "2025-12-02", method: "Nagad", amount: 8700, status: "Completed" },
  { id: 7, date: "2025-11-14", method: "bKash", amount: 16300, status: "Completed" },
  { id: 8, date: "2025-10-29", method: "Nagad", amount: 11200, status: "Completed" },
  { id: 9, date: "2025-10-05", method: "bKash", amount: 19800, status: "Completed" },
  { id: 10, date: "2025-09-19", method: "Nagad", amount: 7600, status: "Completed" },
  { id: 11, date: "2025-09-02", method: "bKash", amount: 14500, status: "Completed" },
  { id: 12, date: "2025-08-21", method: "Nagad", amount: 10300, status: "Completed" },
]
