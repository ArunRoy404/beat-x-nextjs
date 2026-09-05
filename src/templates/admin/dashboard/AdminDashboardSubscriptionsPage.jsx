"use client";

import React from "react";
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats";
import SubscriptionHeaderBar from "@/components/admin/subscriptions/SubscriptionHeaderBar";
import SubscriptionPlanCards from "@/components/admin/subscriptions/SubscriptionPlanCards";
import SubscriptionCharts from "@/components/admin/subscriptions/SubscriptionCharts";
import SubscribersTableContainer from "@/components/admin/subscriptions/SubscribersTableContainer";
import AddEditPlanModal from "@/components/admin/subscriptions/AddEditPlanModal";
import { useAdminSubscriptionsStore } from "@/zustandStore/admin/adminStore/adminSubscriptionsStore";
import { useUrlListParams } from "@/hooks/useUrlListParams";

const AdminDashboardSubscriptionsPage = () => {
  const { get } = useUrlListParams();
  const statsCards = useAdminSubscriptionsStore((state) => state.statsCards);

  const tabParam = get("tab", "plans");
  const activeMainTab = tabParam === "subscribers" ? "Subscriber List" : "Subscription Plans";

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Top Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-whitetext tracking-tight">
          Subscriptions
        </h1>
        <p className="text-light-gray text-xs md:text-sm">
          Plan management & billing overview
        </p>
      </div>

      {/* Top Stats Cards */}
      <DashboardStats statsCards={statsCards} />

      {/* Header Bar: Tab Toggle & Add Plan Action */}
      <SubscriptionHeaderBar />

      {/* Tab 1 View: Subscription Plans */}
      {activeMainTab === "Subscription Plans" && (
        <div className="flex flex-col gap-6 w-full">
          <SubscriptionPlanCards />
          <SubscriptionCharts />
        </div>
      )}

      {/* Tab 2 View: Subscriber List */}
      {activeMainTab === "Subscriber List" && (
        <div className="flex flex-col gap-6 w-full">
          <SubscriptionCharts />
          <SubscribersTableContainer />
        </div>
      )}

      {/* Modals */}
      <AddEditPlanModal />
    </div>
  );
};

export default AdminDashboardSubscriptionsPage;
