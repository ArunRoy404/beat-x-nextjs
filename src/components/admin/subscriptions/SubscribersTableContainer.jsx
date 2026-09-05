"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/ui/DataTable";
import CommonFilter from "@/components/shared/commonFilter/commonFilter";
import CommonSearch from "@/components/shared/CommonSearch/CommonSearch";
import CommonPagination from "@/components/shared/CommonPagination/CommonPagination";
import CommonTableContainer from "@/components/shared/CommonTable/CommonTableContainer";
import SubscribersCardsContainer from "./SubscribersCardsContainer";
import { getSubscribersColumns } from "@/components/DataTableColumns/admin/subscriptions/SubscribersColumns";
import { useAdminSubscriptionsStore } from "@/zustandStore/admin/adminStore/adminSubscriptionsStore";
import { useUrlListParams } from "@/hooks/useUrlListParams";

const SEARCH_DEBOUNCE_MS = 300;
const TABS = ["All", "Free", "Premium", "Family", "Student"];

const SubscribersTableContainer = () => {
  const { get, setParams } = useUrlListParams();
  const subscribers = useAdminSubscriptionsStore((state) => state.subscribers);

  const selectedPlanFilter = get("filter", "all");
  const urlSearch = get("q", "");
  const currentPage = Number(get("page", "1")) || 1;

  const [searchInput, setSearchInput] = useState(urlSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim() !== urlSearch) {
        setParams({ q: searchInput.trim() });
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [searchInput, urlSearch, setParams]);

  const pageSize = 5;
  const columns = getSubscribersColumns();

  // Filter list
  const filteredSubscribers = (subscribers || []).filter((sub) => {
    // Filter by Plan
    if (selectedPlanFilter !== "all") {
      if (sub.plan?.toLowerCase() !== selectedPlanFilter?.toLowerCase()) {
        return false;
      }
    }

    // Search Query
    if (urlSearch.trim() !== "") {
      const q = urlSearch.toLowerCase();
      const matchName = (sub.name || "").toLowerCase().includes(q);
      const matchPlan = (sub.plan || "").toLowerCase().includes(q);
      const matchStatus = (sub.status || "").toLowerCase().includes(q);
      if (!matchName && !matchPlan && !matchStatus) return false;
    }

    return true;
  });

  // Pagination calculations
  const totalItems = filteredSubscribers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedSubscribers = filteredSubscribers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeFilterTab =
    TABS.find((t) => t.toLowerCase() === selectedPlanFilter.toLowerCase()) || "All";

  return (
    <CommonTableContainer
      headerChildren={
        <>
          {/* Plan Filter Tabs */}
          <CommonFilter
            tabs={TABS}
            activeTab={activeFilterTab}
            onChange={(tab) => {
              setParams({
                filter: tab.toLowerCase() === "all" ? undefined : tab.toLowerCase(),
              });
            }}
          />

          {/* Search Input */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <CommonSearch
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search ....."
              className="flex-1 md:w-72"
            />
          </div>
        </>
      }
    >
      {/* Desktop View */}
      <div className="hidden md:block">
        <DataTable columns={columns} data={paginatedSubscribers} />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <SubscribersCardsContainer subscribers={paginatedSubscribers} />
      </div>

      {/* Pagination Bar */}
      <CommonPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={(page) => setParams({ page }, { resetPage: false })}
      />
    </CommonTableContainer>
  );
};

export default SubscribersTableContainer;
