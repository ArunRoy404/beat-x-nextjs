"use client";

import React from "react";
import CommonCard from "@/components/shared/CommonCard/CommonCard";
import { useAdminRolesRbacStore } from "@/zustandStore/admin/adminStore/adminRolesRbacStore";
import { SquarePen } from "lucide-react";
import { ShieldRoleIcon } from "@/components/icons";

const RoleCard = ({ role }) => {
  const openEditRoleModal = useAdminRolesRbacStore((state) => state.openEditRoleModal);

  if (!role) return null;

  return (
    <CommonCard className="flex flex-col justify-between p-5 min-h-[220px] hover:border-white/20 transition-all duration-200">
      <div className="flex flex-col gap-4">
        {/* Card Header: Icon, Title, Member count & Edit Icon */}
        <div className="flex items-start justify-between z-10 relative">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: role.iconBg || "rgba(58, 223, 250, 0.15)" }}
            >
              <ShieldRoleIcon
                width={20}
                height={20}
                color={role.iconColor || "#3ADFFA"}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-whitetext text-lg md:text-xl font-semibold tracking-tight">
                {role.title}
              </h3>
              <span className="text-light-gray text-xs font-normal">
                {role.membersCount}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openEditRoleModal(role)}
            className="p-1.5 rounded-[6px] bg-white/5 border border-white/10 text-light-gray hover:text-whitetext hover:bg-white/10 transition-colors cursor-pointer"
            title="Edit Role & Permissions"
          >
            <SquarePen className="w-4 h-4" />
          </button>
        </div>

        {/* Permission Chips List */}
        <div className="flex flex-wrap gap-2 relative z-10 my-1">
          {role.permissions?.map((permission, idx) => (
            <span
              key={idx}
              className="text-[11px] md:text-xs font-medium px-2.5 py-1 rounded-[6px] border transition-colors"
              style={{
                backgroundColor: role.badgeBg || "rgba(58, 223, 250, 0.12)",
                color: role.badgeColor || "#3ADFFA",
                borderColor: role.badgeBorder || "rgba(58, 223, 250, 0.25)",
              }}
            >
              {permission}
            </span>
          ))}
        </div>

        {/* Members Section */}
        <div className="flex flex-col gap-1.5 relative z-10 mt-auto pt-2 border-t border-white/5">
          <span className="text-light-gray text-xs font-normal">Members</span>
          <div className="flex flex-wrap items-center gap-2">
            {role.members?.map((member, idx) => (
              <span
                key={idx}
                className="bg-[#1A1A19] border border-white/10 px-2.5 py-1 text-xs text-whitetext font-medium rounded-[6px]"
              >
                {member}
              </span>
            ))}
          </div>
        </div>
      </div>
    </CommonCard>
  );
};

export default RoleCard;
