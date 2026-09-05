import { create } from "zustand";
import {
  adminRolesStatsCards,
  adminRoleCardsData,
} from "@/dummyData/admin/adminData/adminRolesRbacData";

export const useAdminRolesRbacStore = create((set) => ({
  statsCards: adminRolesStatsCards,
  roles: adminRoleCardsData,
  
  // Modals
  isInviteModalOpen: false,
  isEditRoleModalOpen: false,
  editingRole: null,

  openInviteModal: () => set({ isInviteModalOpen: true }),
  closeInviteModal: () => set({ isInviteModalOpen: false }),

  openEditRoleModal: (role) => set({ isEditRoleModalOpen: true, editingRole: role }),
  closeEditRoleModal: () => set({ isEditRoleModalOpen: false, editingRole: null }),

  addRole: (newRole) => set((state) => ({ roles: [...state.roles, newRole] })),
  updateRole: (updatedRole) =>
    set((state) => ({
      roles: state.roles.map((r) => (r.id === updatedRole.id ? updatedRole : r)),
    })),
  deleteRole: (roleId) =>
    set((state) => ({
      roles: state.roles.filter((r) => r.id !== roleId),
    })),
}));
