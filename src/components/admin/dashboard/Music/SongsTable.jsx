import React from "react"
import { Search } from "lucide-react"
import DataTable from "@/components/ui/DataTable"
import { getSongsColumns } from "@/components/DataTableColumns/SongsColumns"

const SongsTable = ({ songs = [] }) => {
  const tabs = ["All", "Published", "Under Review", "Scheduled", "Rejected", "My Songs"]
  const activeTab = "All"

  // Action handlers for song row interactions
  const columns = getSongsColumns({
    onViewDetails: (song) => console.log("View details:", song),
    onEdit: (song) => console.log("Edit song:", song),
    onDelete: (song) => console.log("Delete song:", song),
  })

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full z-10 relative">
        {/* Tab pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <span
                key={tab}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 select-none whitespace-nowrap ${isActive
                  ? "bg-nav-icon-bg border border-secondary text-secondary"
                  : "bg-white/[0.03] text-light-gray border border-transparent"
                  }`}
              >
                {tab}
              </span>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray" />
          <input
            type="text"
            placeholder="Search ....."
            readOnly
            className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border border-border rounded-full text-whitetext placeholder-dark-gray focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Reusable DataTable */}
      <DataTable
        columns={columns}
        data={songs}
      />
    </div>
  )
}

export default SongsTable
