import React from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import DataTable from "@/components/ui/DataTable"
import { getSongsColumns } from "@/components/DataTableColumns/SongsColumns"

const SongsTable = ({ songs = [] }) => {
  const tabs = ["All", "Published", "Under Review", "Scheduled", "Rejected", "My Songs"]
  const activeTab = "All"

  // Action columns definitions
  const columns = getSongsColumns()

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
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 select-none whitespace-nowrap ${isActive
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

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full px-1 py-2 z-10 relative">
        {/* Counter Info */}
        <div className="text-light-gray text-[14px] select-none font-normal">
          Showing 1 to 5 of 12 results
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1.5">
          {/* Previous Page Button */}
          <button
            disabled
            className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 text-whitetext select-none transition-all opacity-40 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page 1 (Active) */}
          <button
            className="w-8 h-8 rounded-[8px] flex items-center justify-center border text-[14px] font-semibold select-none transition-all bg-secondary border-secondary text-black"
          >
            1
          </button>

          {/* Ellipsis */}
          <span
            className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 text-[14px] text-light-gray select-none"
          >
            ...
          </span>

          {/* Page 50 */}
          <button
            className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 text-[14px] text-whitetext select-none"
          >
            50
          </button>

          {/* Next Page Button */}
          <button
            className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-white/10 text-whitetext select-none transition-all hover:bg-white/[0.05]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SongsTable
