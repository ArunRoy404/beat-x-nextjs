import React from "react"
import { Eye, Trash2 } from "lucide-react"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { Button } from "@/components/ui/button"
import UserDetailsDialog from "@/components/dialogs/admin/UserDetailsDialog"
import DeleteUserDialog from "@/components/dialogs/admin/DeleteUserDialog"

export const getUsersColumns = () => [
  {
    accessorKey: "name",
    header: () => <CommonTableHeader>User</CommonTableHeader>,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <CommonAvatar
            src={user.avatar || ""}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-white/5 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-whitetext font-semibold text-sm truncate">{user.name}</span>
            <span className="text-light-gray/60 text-xs truncate">{user.email}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: () => <CommonTableHeader>Role</CommonTableHeader>,
    cell: ({ getValue }) => {
      const role = getValue()
      return (
        <div className="flex">
          <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/10 text-light-gray text-[12px] font-normal select-none">
            {role}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "plan",
    header: () => <CommonTableHeader>Plan</CommonTableHeader>,
    cell: ({ getValue }) => {
      const plan = getValue()
      const planColors = {
        Premium: "text-[#3ADFFA] border-[#3ADFFA]/20 bg-[#3ADFFA]/10",
        Family: "text-[#CC97FF] border-[#CC97FF]/20 bg-[#CC97FF]/10",
        Student: "text-[#E5F97D] border-[#E5F97D]/20 bg-[#E5F97D]/10",
        Free: "text-white/40 border-white/10 bg-white/5"
      }
      const colorClass = planColors[plan] || planColors.Free
      return (
        <div className="flex">
          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[12px] font-normal select-none ${colorClass}`}>
            {plan}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "streams",
    header: () => <CommonTableHeader>Streams</CommonTableHeader>,
    cell: ({ getValue }) => {
      const val = getValue() || 0
      let displayVal = "0"
      if (val >= 1000) {
        displayVal = `${(val / 1000).toFixed(1).replace(/\.0$/, "")}K`
      } else {
        displayVal = val.toString()
      }
      return <CommonTableCell>{displayVal}</CommonTableCell>
    }
  },
  {
    accessorKey: "status",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ getValue }) => {
      const status = getValue()
      const statusColors = {
        Active: "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10",
        Rejected: "text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/10",
        Pending: "text-[#FFCC00] border-[#FFCC00]/20 bg-[#FFCC00]/10"
      }
      const colorClass = statusColors[status] || statusColors.Pending
      return (
        <div className="flex">
          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[12px] font-normal select-none ${colorClass}`}>
            {status}
          </span>
        </div> 
      )
    }
  },
  {
    accessorKey: "joined",
    header: () => <CommonTableHeader>Joined</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>
        {getValue() || "-"}
      </CommonTableCell>
    )
  },
  {
    id: "actions",
    header: () => <CommonTableHeader className="text-right block pr-6">Action</CommonTableHeader>,
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex items-center justify-end gap-2.5 pr-4">
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
      )
    }
  }
]
