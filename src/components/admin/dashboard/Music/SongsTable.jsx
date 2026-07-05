import React from "react"
import DataTable from "@/components/ui/DataTable"
import { getSongsColumns } from "@/components/DataTableColumns/SongsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"

const SongsTable = ({ songs = [] }) => {
  const tabs = ["All", "Published", "Under Review", "Scheduled", "Rejected", "My Songs"]
  const activeTab = "All"

  // Action columns definitions
  const columns = getSongsColumns()

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Tab pills */}
          <CommonFilter
            tabs={tabs}
            activeTab={activeTab}
          />

          {/* Search Input */}
          <CommonSearch readOnly /></>
      }
    >
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
    </CommonTableContainer>
  )
}

export default SongsTable

