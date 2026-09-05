"use client";

import React from "react";
import RoleCard from "./RoleCard";
import { useAdminRolesRbacStore } from "@/zustandStore/admin/adminStore/adminRolesRbacStore";

const RoleCardsGrid = () => {
  const roles = useAdminRolesRbacStore((state) => state.roles);

  if (!roles || roles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </div>
  );
};

export default RoleCardsGrid;
