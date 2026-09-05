"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useAdminSubscriptionsStore } from "@/zustandStore/admin/adminStore/adminSubscriptionsStore";
import { useUrlListParams } from "@/hooks/useUrlListParams";

const SubscriptionHeaderBar = () => {
  const { get, setParams } = useUrlListParams();
  const openAddPlanModal = useAdminSubscriptionsStore((state) => state.openAddPlanModal);

  const tabParam = get("tab", "plans");
  const activeMainTab = tabParam === "subscribers" ? "Subscriber List" : "Subscription Plans";

  const tabs = ["Subscription Plans", "Subscriber List"];

  const handleTabChange = (tab) => {
    if (tab === "Subscriber List") {
      setParams({ tab: "subscribers" });
    } else {
      setParams({ tab: undefined });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-[#0E0E0E] border border-border/40 rounded-[10px] w-full">
      {/* Segmented Tab Switcher */}
      <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-[8px] border border-[#222222] self-start sm:self-auto">
        {tabs.map((tab) => {
          const isActive = activeMainTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 text-xs md:text-sm font-medium rounded-[6px] transition-all cursor-pointer ${
                isActive
                  ? "bg-[#3ADFFA] text-[#004B56] shadow-sm font-semibold"
                  : "text-light-gray hover:text-whitetext hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Add Plan Action Button */}
      <button
        type="button"
        onClick={openAddPlanModal}
        className="px-4 py-2 bg-[#3ADFFA] text-[#004B56] hover:bg-[#3ADFFA]/90 font-medium text-xs md:text-sm rounded-[8px] flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 shadow-md"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Plan</span>
      </button>
    </div>
  );
};

export default SubscriptionHeaderBar;
