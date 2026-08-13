import { create } from "zustand"
import {
  accountSettings,
  settingsSections,
  dangerZoneActions
} from "@/dummyData/artist/artistData/artistSettingsData"

export const useArtistSettingsStore = create((set) => ({
  accountSettings: accountSettings,
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
