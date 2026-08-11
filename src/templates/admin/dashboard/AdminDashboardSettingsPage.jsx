"use client"

import React from "react"
import { useAdminDashboardSettingsStore } from "@/zustandStore/admin/adminStore/adminDashboardSettingsStore"
import SettingsSection from "@/components/admin/settings/SettingsSection"
import SettingToggleRow from "@/components/admin/settings/SettingToggleRow"
import DangerZoneSection from "@/components/admin/settings/DangerZoneSection"

const AdminDashboardSettingsPage = () => {
  const settingsSections = useAdminDashboardSettingsStore((state) => state.settingsSections)
  const dangerZoneActions = useAdminDashboardSettingsStore((state) => state.dangerZoneActions)
  const toggleSetting = useAdminDashboardSettingsStore((state) => state.toggleSetting)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {settingsSections.map((section) => (
        <SettingsSection
          key={section.id}
          icon={section.icon}
          iconColor={section.iconColor}
          iconBg={section.iconBg}
          title={section.title}
        >
          {section.settings.map((setting) => (
            <SettingToggleRow
              key={setting.id}
              title={setting.title}
              description={setting.description}
              checked={setting.enabled}
              onCheckedChange={() => toggleSetting(section.id, setting.id)}
            />
          ))}
        </SettingsSection>
      ))}

      <DangerZoneSection actions={dangerZoneActions} />
    </div>
  )
}

export default AdminDashboardSettingsPage
