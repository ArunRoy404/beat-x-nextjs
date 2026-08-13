"use client"

import React from "react"
import { useArtistSettingsStore } from "@/zustandStore/artist/artistStore/artistSettingsStore"
import SettingsSection from "@/components/shared/Settings/SettingsSection"
import SettingToggleRow from "@/components/shared/Settings/SettingToggleRow"
import SettingActionRow from "@/components/artist/settings/SettingActionRow"
import ArtistDangerZoneSection from "@/components/artist/settings/ArtistDangerZoneSection"

const ArtistSettingsPage = () => {
  const accountSettings = useArtistSettingsStore((state) => state.accountSettings)
  const settingsSections = useArtistSettingsStore((state) => state.settingsSections)
  const dangerZoneActions = useArtistSettingsStore((state) => state.dangerZoneActions)
  const toggleSetting = useArtistSettingsStore((state) => state.toggleSetting)

  return (
    <div className="flex flex-col gap-6 w-full pb-8">
      {/* Account section (non-toggle, Update buttons) */}
      <SettingsSection icon="User" iconColor="#3ADFFA" iconBg="rgba(58, 223, 250, 0.15)" title="Account">
        {accountSettings.map((setting) => (
          <SettingActionRow
            key={setting.id}
            title={setting.title}
            description={setting.description}
            buttonLabel={setting.buttonLabel}
          />
        ))}
      </SettingsSection>

      {/* Toggle sections */}
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

      <ArtistDangerZoneSection actions={dangerZoneActions} />
    </div>
  )
}

export default ArtistSettingsPage
