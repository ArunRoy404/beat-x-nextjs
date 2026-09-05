"use client"

import React from "react"
import LoginHistoryTableRow from "@/components/admin/profile/LoginHistoryTableRow"

const LoginHistoryTable = ({ history = [] }) => {
  return (
    <div className="hidden md:flex flex-col w-full rounded-none border border-border/50 bg-black/20 overflow-hidden">
      {/* Stationary Header (Outside scroll container) */}
      <div className="w-full bg-[#121212] border-b border-border/60">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="text-[14px] font-medium text-light-gray">
              <th className="p-4 w-[60px]">#</th>
              <th className="p-4 w-[220px]">IP Address</th>
              <th className="p-4">Client Device / User Agent</th>
              <th className="p-4 w-[260px] text-right">Login Timestamp</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Scrollable Body Rows */}
      <div className="max-h-[420px] overflow-y-auto w-full">
        <table className="w-full text-left border-collapse table-fixed">
          <tbody className="divide-y divide-border/20">
            {history.map((item, idx) => (
              <LoginHistoryTableRow key={idx} item={item} index={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoginHistoryTable
