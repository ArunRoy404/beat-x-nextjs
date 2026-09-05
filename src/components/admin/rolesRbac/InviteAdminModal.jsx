"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useAdminRolesRbacStore } from "@/zustandStore/admin/adminStore/adminRolesRbacStore";

const InviteAdminModal = () => {
  const isInviteModalOpen = useAdminRolesRbacStore((state) => state.isInviteModalOpen);
  const closeInviteModal = useAdminRolesRbacStore((state) => state.closeInviteModal);
  const roles = useAdminRolesRbacStore((state) => state.roles);

  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");

  if (!isInviteModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !selectedRole) return;

    // Simulate sending invitation
    alert(`Invitation sent to ${email} with role "${selectedRole}"`);
    setEmail("");
    setSelectedRole("");
    setMessage("");
    closeInviteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-border/60 rounded-[16px] w-full max-w-md overflow-hidden shadow-2xl flex flex-col p-6 gap-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-whitetext tracking-tight">
            Invite Admin User
          </h2>
          <button
            type="button"
            onClick={closeInviteModal}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-light-gray hover:text-whitetext hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Field 1: Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs md:text-sm font-medium text-[#CC97FF]">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="artist@example.com"
              className="w-full px-4 py-3 bg-[#0E0E0E] border border-border/50 rounded-[10px] text-sm text-whitetext placeholder:text-light-gray/40 focus:outline-none focus:border-[#3ADFFA] transition-colors"
            />
          </div>

          {/* Field 2: Assign Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs md:text-sm font-medium text-[#CC97FF]">
              Assign Role
            </label>
            <div className="relative">
              <select
                required
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 bg-[#0E0E0E] border border-border/50 rounded-[10px] text-sm text-whitetext appearance-none focus:outline-none focus:border-[#3ADFFA] transition-colors cursor-pointer"
              >
                <option value="" disabled className="bg-[#141414] text-light-gray">
                  Select Role
                </option>
                {roles.map((r) => (
                  <option key={r.id} value={r.title} className="bg-[#141414] text-whitetext">
                    {r.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-light-gray absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Field 3: Personal Message (optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs md:text-sm font-medium text-[#CC97FF]">
              Personal Message (optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
              className="w-full px-4 py-3 bg-[#0E0E0E] border border-border/50 rounded-[10px] text-sm text-whitetext placeholder:text-light-gray/40 focus:outline-none focus:border-[#3ADFFA] transition-colors resize-none"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 mt-2">
            <button
              type="button"
              onClick={closeInviteModal}
              className="flex-1 py-3 border border-border/60 text-whitetext font-semibold rounded-full hover:bg-white/5 transition-colors text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-[#B1FE4D] to-[#3ADFFA] text-[#004B56] font-bold rounded-full hover:opacity-90 transition-opacity text-sm cursor-pointer shadow-lg text-center"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteAdminModal;
