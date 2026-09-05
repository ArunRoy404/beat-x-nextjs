"use client";

import React from "react";
import { UserPlus } from "lucide-react";
import { useAdminRolesRbacStore } from "@/zustandStore/admin/adminStore/adminRolesRbacStore";

const RolesHeaderBar = () => {
  const openInviteModal = useAdminRolesRbacStore((state) => state.openInviteModal);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#0E0E0E] border border-border/40 rounded-[10px] w-full">
      {/* Left Info: Icon + Label */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#3ADFFA]/10 border border-[#3ADFFA]/20 flex items-center justify-center text-[#3ADFFA] shrink-0">
          <UserPlus className="w-5 h-5" />
        </div>
        <span className="text-whitetext text-base font-semibold tracking-tight">
          Invite Admin User
        </span>
      </div>

      {/* Right Action Button */}
      <button
        type="button"
        onClick={openInviteModal}
        className="px-5 py-2 bg-[#3ADFFA] text-[#004B56] hover:bg-[#3ADFFA]/90 font-semibold text-sm rounded-[8px] flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 shadow-md"
      >
        <UserPlus className="w-4 h-4 stroke-[2.5]" />
        <span>Invite Admin User</span>
      </button>
    </div>
  );
};

export default RolesHeaderBar;
