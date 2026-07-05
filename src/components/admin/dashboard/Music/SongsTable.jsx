import React from "react"
import DataTable from "@/components/ui/DataTable"
import { getSongsColumns } from "@/components/DataTableColumns/SongsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"

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
        <CommonFilter
          tabs={tabs}
          activeTab={activeTab}
        />

        {/* Search Input */}
        <CommonSearch readOnly />
      </div>

      {/* Reusable DataTable */}
      <DataTable
        columns={columns}
        data={songs}
      />

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={1}
        totalItems={12}
        pageSize={5}
        totalPages={50}
      />
    </div>
  )
}

export default SongsTable

