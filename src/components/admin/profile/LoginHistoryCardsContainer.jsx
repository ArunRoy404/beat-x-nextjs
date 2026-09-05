"use client"

import React from "react"
import CommonTableEmptyState from "@/components/shared/CommonTable/CommonTableEmptyState"
import LoginHistoryCardItem from "@/components/admin/profile/LoginHistoryCardItem"

const LoginHistoryCardsContainer = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return (
      <CommonTableEmptyState
        title="No Login Logs Found"
        subtitle="No recorded login history events."
        className="py-12"
      />
    )
  }

  return (
    <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
      {history.map((item, idx) => (
        <LoginHistoryCardItem key={idx} item={item} index={idx} />
      ))}
    </div>
  )
}

export default LoginHistoryCardsContainer
