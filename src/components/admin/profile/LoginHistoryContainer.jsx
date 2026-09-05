"use client"

import React, { useMemo } from "react"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import CommonTableLoadingState from "@/components/shared/CommonTable/CommonTableLoadingState"
import CommonTableEmptyState from "@/components/shared/CommonTable/CommonTableEmptyState"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import LoginHistoryTable from "@/components/admin/profile/LoginHistoryTable"
import LoginHistoryCardsContainer from "@/components/admin/profile/LoginHistoryCardsContainer"

const LoginHistoryContainer = ({ history = [], isLoading = false }) => {
  const historyList = useMemo(() => {
    return Array.isArray(history) ? history : []
  }, [history])

  return (
    <CommonCard
      title="Login Audit History"
      subtitle={`Recent authentication events and login history logs (${historyList.length} recorded)`}
    >
      <div className="relative z-10 pt-2">
        <CommonTableContainer>
          {isLoading ? (
            <CommonTableLoadingState />
          ) : historyList.length === 0 ? (
            <CommonTableEmptyState
              title="No Login Logs Found"
              subtitle="No recorded login history events."
            />
          ) : (
            <>
              {/* Desktop View */}
              <LoginHistoryTable history={historyList} />

              {/* Mobile View */}
              <div className="block md:hidden">
                <LoginHistoryCardsContainer history={historyList} />
              </div>
            </>
          )}
        </CommonTableContainer>
      </div>
    </CommonCard>
  )
}

export default LoginHistoryContainer
