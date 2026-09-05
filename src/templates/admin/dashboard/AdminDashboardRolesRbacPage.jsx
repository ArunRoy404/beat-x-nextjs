"use client";

import React from "react";
import DashboardStats from "@/components/shared/Dashboard/DashboardStats/DashboardStats";
import RolesHeaderBar from "@/components/admin/rolesRbac/RolesHeaderBar";
import RoleCardsGrid from "@/components/admin/rolesRbac/RoleCardsGrid";
import InviteAdminModal from "@/components/admin/rolesRbac/InviteAdminModal";
import EditRoleModal from "@/components/admin/rolesRbac/EditRoleModal";
import { useAdminRolesRbacStore } from "@/zustandStore/admin/adminStore/adminRolesRbacStore";

const AdminDashboardRolesRbacPage = () => {
  const statsCards = useAdminRolesRbacStore((state) => state.statsCards);

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Top Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-whitetext tracking-tight">
          Roles & RBAC
        </h1>
        <p className="text-light-gray text-xs md:text-sm">
          Role-based access control management
        </p>
      </div>

      {/* Top Stats Cards */}
      <DashboardStats statsCards={statsCards} />

      {/* Action Banner Bar */}
      <RolesHeaderBar />

      {/* Roles Cards Grid */}
      <RoleCardsGrid />

      {/* Modals */}
      <InviteAdminModal />
      <EditRoleModal />
    </div>
  );
};

export default AdminDashboardRolesRbacPage;
