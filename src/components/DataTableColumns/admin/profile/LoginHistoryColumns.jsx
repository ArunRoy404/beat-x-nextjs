import React from "react"
import { format } from "date-fns"
import { Monitor, Terminal, Globe } from "lucide-react"

export const getLoginHistoryColumns = () => {
  return [
    {
      id: "index",
      header: "#",
      cell: ({ row }) => (
        <span className="text-light-gray text-xs font-mono">
          {row.index + 1}
        </span>
      ),
    },
    {
      accessorKey: "ip",
      header: "IP Address",
      cell: ({ row }) => {
        const rawIp = row.original?.ip || "-"
        const displayIp = rawIp.startsWith("::ffff:") ? rawIp.replace("::ffff:", "") : rawIp
        const isLocal = displayIp === "::1"

        return (
          <div className="flex items-center gap-2">
            <span className="text-whitetext text-xs font-mono font-medium bg-[#141414] px-2.5 py-1 rounded border border-border/50">
              {displayIp}
            </span>
            {isLocal && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-mono">
                Localhost
              </span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "device",
      header: "Client Device / User Agent",
      cell: ({ row }) => {
        const deviceStr = row.original?.device || "Unknown Client"
        const lower = deviceStr.toLowerCase()

        let label = "System Service"
        let IconComp = Monitor
        let badgeClass = "bg-dark-gray/20 text-light-gray border-border/40"

        if (lower.includes("postman")) {
          label = "Postman API"
          IconComp = Terminal
          badgeClass = "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/30"
        } else if (lower.includes("axios")) {
          label = "Axios Client"
          IconComp = Terminal
          badgeClass = "bg-secondary/15 text-secondary border-secondary/30"
        } else if (
          lower.includes("chrome") ||
          lower.includes("firefox") ||
          lower.includes("safari") ||
          lower.includes("mozilla")
        ) {
          label = "Web Browser"
          IconComp = Globe
          badgeClass = "bg-green-success/15 text-green-success border-green-success/30"
        }

        return (
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${badgeClass}`}>
              <IconComp className="w-3.5 h-3.5" />
              {label}
            </span>
            <span className="text-light-gray text-xs font-mono max-w-[280px] truncate" title={deviceStr}>
              {deviceStr}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "at",
      header: "Login Timestamp",
      cell: ({ row }) => {
        const isoAt = row.original?.at
        let formattedDate = "-"
        if (isoAt) {
          try {
            formattedDate = format(new Date(isoAt), "MMM d, yyyy • hh:mm:ss a")
          } catch {
            formattedDate = isoAt
          }
        }

        return (
          <span className="text-whitetext text-xs font-medium">
            {formattedDate}
          </span>
        )
      },
    },
  ]
}
