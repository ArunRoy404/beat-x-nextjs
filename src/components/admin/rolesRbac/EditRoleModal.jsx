"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useAdminRolesRbacStore } from "@/zustandStore/admin/adminStore/adminRolesRbacStore";

const EditRoleModal = () => {
  const isEditRoleModalOpen = useAdminRolesRbacStore((state) => state.isEditRoleModalOpen);
  const editingRole = useAdminRolesRbacStore((state) => state.editingRole);
  const closeEditRoleModal = useAdminRolesRbacStore((state) => state.closeEditRoleModal);
  const updateRole = useAdminRolesRbacStore((state) => state.updateRole);
  const addRole = useAdminRolesRbacStore((state) => state.addRole);

  const [title, setTitle] = useState("");
  const [membersCount, setMembersCount] = useState("1 member");
  const [permissions, setPermissions] = useState([""]);

  useEffect(() => {
    if (editingRole) {
      setTitle(editingRole.title || "");
      setMembersCount(editingRole.membersCount || "1 member");
      setPermissions(editingRole.permissions ? [...editingRole.permissions] : [""]);
    } else {
      setTitle("");
      setMembersCount("1 member");
      setPermissions(["Management Access"]);
    }
  }, [editingRole, isEditRoleModalOpen]);

  if (!isEditRoleModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const filteredPermissions = permissions.filter((p) => p.trim() !== "");

    if (editingRole) {
      updateRole({
        ...editingRole,
        title,
        membersCount,
        permissions: filteredPermissions,
      });
    } else {
      addRole({
        id: title.toLowerCase().replace(/\s+/g, "-"),
        title,
        membersCount,
        badgeBg: "rgba(58, 223, 250, 0.12)",
        badgeColor: "#3ADFFA",
        badgeBorder: "rgba(58, 223, 250, 0.25)",
        iconBg: "rgba(58, 223, 250, 0.15)",
        iconColor: "#3ADFFA",
        permissions: filteredPermissions,
        members: ["Admin User"],
      });
    }
    closeEditRoleModal();
  };

  const handlePermissionChange = (index, value) => {
    const updated = [...permissions];
    updated[index] = value;
    setPermissions(updated);
  };

  const addPermission = () => {
    setPermissions([...permissions, ""]);
  };

  const removePermission = (index) => {
    setPermissions(permissions.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-border/60 rounded-[16px] w-full max-w-md overflow-hidden shadow-2xl flex flex-col p-6 gap-5 max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-whitetext tracking-tight">
            {editingRole ? `Edit Role: ${editingRole.title}` : "Add New Role"}
          </h2>
          <button
            type="button"
            onClick={closeEditRoleModal}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-light-gray hover:text-whitetext hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#CC97FF]">Role Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sales Manager"
              className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-border/50 rounded-[8px] text-sm text-whitetext focus:outline-none focus:border-[#3ADFFA]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#CC97FF]">Permissions</label>
              <button
                type="button"
                onClick={addPermission}
                className="text-xs text-[#3ADFFA] hover:underline flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Add Permission
              </button>
            </div>
            <div className="space-y-2">
              {permissions.map((perm, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={perm}
                    onChange={(e) => handlePermissionChange(index, e.target.value)}
                    placeholder="Permission label"
                    className="flex-1 px-3 py-2 bg-[#0E0E0E] border border-border/50 rounded-[8px] text-xs text-whitetext focus:outline-none focus:border-[#3ADFFA]"
                  />
                  {permissions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePermission(index)}
                      className="p-1.5 text-red-error hover:bg-white/5 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-2">
            <button
              type="button"
              onClick={closeEditRoleModal}
              className="px-4 py-2 text-xs md:text-sm text-light-gray hover:text-whitetext border border-border/50 rounded-[6px] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs md:text-sm bg-[#3ADFFA] text-[#004B56] font-semibold rounded-[6px] hover:bg-[#3ADFFA]/90 transition-colors"
            >
              Save Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
