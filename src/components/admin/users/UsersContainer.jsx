"use client"

import React from "react"
import { format } from "date-fns"
import DataTable from "@/components/ui/DataTable"
import { getUsersColumns } from "@/components/DataTableColumns/admin/users/UsersColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import InviteUserDialog from "@/components/dialogs/admin/users/InviteUserDialog"
import UserDetailsDialog from "@/components/dialogs/admin/users/UserDetailsDialog"
import DeleteUserDialog from "@/components/dialogs/admin/users/DeleteUserDialog"
import { useAdminDashboardUsersStore } from "@/zustandStore/admin/adminStore/adminDashboardUsersStore"
import { useUsers } from "@/hooks/api/admin/users/useUsers"
import { Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import CommonAvatar from "@/components/shared/CommonAvatar"

const UsersContainer = () => {
  const { data: usersList = [], isLoading, isError, error, refetch } = useUsers()
  const selectedStatusFilter = useAdminDashboardUsersStore((state) => state.selectedStatusFilter)
  const setSelectedStatusFilter = useAdminDashboardUsersStore((state) => state.setSelectedStatusFilter)
  const searchQuery = useAdminDashboardUsersStore((state) => state.searchQuery)
  const setSearchQuery = useAdminDashboardUsersStore((state) => state.setSearchQuery)

  const columns = getUsersColumns()

  // Filter/search tabs are UI-only for now — GET /users takes no query
  // params yet, so wire them to real params once the API supports it.
  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={["All", "Verified", "Unverified"]}
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
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="size-6 text-secondary" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <span className="text-red-error text-sm">{error?.message || "Failed to load users."}</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop view */}
          <div className="hidden md:block">
            <DataTable
              columns={columns}
              data={usersList}
            />
          </div>

          {/* Mobile view */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-3">
              {usersList.map((user) => (
                <div key={user._id} className="border border-white/10 bg-[#0E0E0E] rounded-[12px] p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CommonAvatar src={user.avatar || ""} alt={user.name} className="w-10 h-10 rounded-full border border-white/5" />
                      <div className="flex flex-col">
                        <span className="text-whitetext font-semibold text-sm">{user.name}</span>
                        <span className="text-light-gray/60 text-xs">{user.email}</span>
                      </div>
                    </div>
                    <span className={`text-[12px] font-semibold select-none ${
                      user.isVerified ? "text-[#34C759]" : "text-[#FFCC00]"
                    }`}>
                      {user.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full border border-white/10 text-light-gray">
                      {user.provider ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1) : "-"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-light-gray">
                      {(user.coinBalance || 0).toLocaleString()} coins
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="text-white/40 text-[10px] uppercase font-semibold">
                      Joined {user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "-"}
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
            totalItems={usersList.length}
            pageSize={5}
            totalPages={Math.ceil(usersList.length / 5) || 1}
          />
        </>
      )}
    </CommonTableContainer>
  )
}

export default UsersContainer
