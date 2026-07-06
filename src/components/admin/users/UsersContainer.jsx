"use client"

import React from "react"
import DataTable from "@/components/ui/DataTable"
import { getUsersColumns } from "@/components/DataTableColumns/admin/UsersColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import InviteUserDialog from "@/components/dialogs/admin/InviteUserDialog"
import UserDetailsDialog from "@/components/dialogs/admin/UserDetailsDialog"
import DeleteUserDialog from "@/components/dialogs/admin/DeleteUserDialog"
import { useAdminDashboardUsersStore } from "@/zustandStore/admin/adminStore/adminDashboardUsersStore"
import { Shield, Sparkles, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommonAvatar from "@/components/shared/CommonAvatar"

const UsersContainer = () => {
  const usersList = useAdminDashboardUsersStore((state) => state.usersList)
  const selectedStatusFilter = useAdminDashboardUsersStore((state) => state.selectedStatusFilter)
  const setSelectedStatusFilter = useAdminDashboardUsersStore((state) => state.setSelectedStatusFilter)
  const searchQuery = useAdminDashboardUsersStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardUsersStore((state) => state.setSearchQuery)

  const columns = getUsersColumns()

  // Filter list
  const filteredUsers = usersList.filter((user) => {
    // Tab Filter
    if (selectedStatusFilter !== "All") {
      const filterLower = selectedStatusFilter.toLowerCase()
      if (filterLower === "premium") {
        if (user.plan.toLowerCase() !== "premium") return false
      } else {
        if (user.status.toLowerCase() !== filterLower) return false
      }
    }
    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase()
      if (
        !user.name.toLowerCase().includes(q) &&
        !user.email.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Format streams helper
  const formatStreams = (val) => {
    const num = val || 0
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`
    }
    return num.toString()
  }

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={["All", "Active", "Premium", "Suspended", "Banned"]}
            activeTab={selectedStatusFilter}
            onChange={(tab) => setSelectedStatusFilter(tab)}
          />

          {/* Right Side: Search + Invite User */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <CommonSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="flex-1 md:w-72"
            />
            <InviteUserDialog />
          </div>
        </>
      }
    >
      {/* Desktop view */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={filteredUsers}
        />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="border border-white/10 bg-[#0E0E0E] rounded-[12px] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CommonAvatar src={user.avatar || ""} alt={user.name} className="w-10 h-10 rounded-full border border-white/5" />
                  <div className="flex flex-col">
                    <span className="text-whitetext font-semibold text-sm">{user.name}</span>
                    <span className="text-light-gray/60 text-xs">{user.email}</span>
                  </div>
                </div>
                <span className={`text-[12px] font-semibold select-none ${
                  user.status === "Active" 
                    ? "text-[#34C759]" 
                    : user.status === "Rejected" 
                    ? "text-[#FF453A]" 
                    : "text-[#FFCC00]"
                }`}>
                  {user.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full border border-white/10 text-light-gray">
                  {user.role}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-[#3ADFFA]/20 bg-[#3ADFFA]/10 text-[#3ADFFA]">
                  {user.plan}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-light-gray">
                  {formatStreams(user.streams)} streams
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-white/40 text-[10px] uppercase font-semibold">
                  Joined {user.joined}
                </span>
                <div className="flex items-center gap-2">
                  <UserDetailsDialog user={user}>
                    <Button
                      title="View Details"
                      size="icon"
                      variant="outline"
                      className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 shrink-0" />
                    </Button>
                  </UserDetailsDialog>
                  <DeleteUserDialog user={user}>
                    <Button
                      title="Delete User"
                      size="icon"
                      variant="outline"
                      className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 shrink-0" />
                    </Button>
                  </DeleteUserDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={1}
        totalItems={filteredUsers.length}
        pageSize={5}
        totalPages={Math.ceil(filteredUsers.length / 5) || 1}
      />
    </CommonTableContainer>
  )
}

export default UsersContainer
