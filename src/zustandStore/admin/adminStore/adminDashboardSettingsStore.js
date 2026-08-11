import { create } from "zustand"
import {
  settingsSections,
  dangerZoneActions
} from "@/dummyData/admin/adminData/adminDashboardSettingsData"

export const useAdminDashboardSettingsStore = create((set) => ({
  settingsSections: settingsSections,
  dangerZoneActions: dangerZoneActions,
  toggleSetting: (sectionId, settingId) => set((state) => ({
    settingsSections: state.settingsSections.map((section) => {
      if (section.id !== sectionId) return section
      return {
        ...section,
        settings: section.settings.map((setting) =>
          setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting
        )
      }
    })
  }))
}))
