import React from "react"
import { Eye, Trash2 } from "lucide-react"
import { format } from "date-fns"
import CommonTableHeader from "@/components/shared/CommonTable/CommonTableHeader"
import CommonTableCell from "@/components/shared/CommonTable/CommonTableCell"
import CommonAvatar from "@/components/shared/CommonAvatar"
import { Button } from "@/components/ui/button"
import UserDetailsDialog from "@/components/dialogs/admin/users/UserDetailsDialog"
import DeleteUserDialog from "@/components/dialogs/admin/users/DeleteUserDialog"

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
    accessorKey: "provider",
    header: () => <CommonTableHeader>Provider</CommonTableHeader>,
    cell: ({ getValue }) => {
      const provider = getValue()
      const label = provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : "-"
      return (
        <div className="flex">
          <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/10 text-light-gray text-[12px] font-normal select-none">
            {label}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "isVerified",
    header: () => <CommonTableHeader>Status</CommonTableHeader>,
    cell: ({ getValue }) => {
      const isVerified = getValue()
      const colorClass = isVerified
        ? "text-[#34C759] border-[#34C759]/20 bg-[#34C759]/10"
        : "text-[#FFCC00] border-[#FFCC00]/20 bg-[#FFCC00]/10"
      return (
        <div className="flex">
          <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[12px] font-normal select-none ${colorClass}`}>
            {isVerified ? "Verified" : "Unverified"}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "coinBalance",
    header: () => <CommonTableHeader>Coin Balance</CommonTableHeader>,
    cell: ({ getValue }) => (
      <CommonTableCell>{(getValue() || 0).toLocaleString()}</CommonTableCell>
    )
  },
  {
    accessorKey: "createdAt",
    header: () => <CommonTableHeader>Joined</CommonTableHeader>,
    cell: ({ getValue }) => {
      const value = getValue()
      return (
        <CommonTableCell>
          {value ? format(new Date(value), "MMM d, yyyy") : "-"}
        </CommonTableCell>
      )
    }
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
