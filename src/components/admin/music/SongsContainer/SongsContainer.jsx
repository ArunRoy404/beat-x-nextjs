import React from "react"
import DataTable from "@/components/ui/DataTable"
import { getSongsColumns } from "@/components/DataTableColumns/admin/SongsColumns"
import CommonFilter from "@/components/shared/commonFilter/commonFilter"
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch"
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination"
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer"
import SongsCardsContainer from "./SongsCardsContainer"

const SongsContainer = ({ songs = [] }) => {
  const tabs = ["All", "Published", "Under Review", "Scheduled", "Rejected", "My Songs"]
  const activeTab = "All"
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
          <CommonSearch />
        </>
      }
    >
      {/* Desktop view */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={songs}
        />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <SongsCardsContainer songs={songs} />
      </div>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={1}
        totalItems={songs.length || 12}
        pageSize={5}
        totalPages={Math.ceil((songs.length || 12) / 5)}
      />
    </CommonTableContainer>
  )
}

export default SongsContainer