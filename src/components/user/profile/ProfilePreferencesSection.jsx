"use client"

import React, { useState } from "react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import ProfileSectionHeader from "./ProfileSectionHeader"
import ProfileSettingRow from "./ProfileSettingRow"
import { USER_EDITABLE_SETTINGS } from "./userSettingsFields"
import { useMySettings } from "@/hooks/api/user/settings/useMySettings"
import { useUpdateSettings } from "@/hooks/api/user/settings/useUpdateSettings"

const ProfilePreferencesSection = () => {
    const { data: settings } = useMySettings()
    const { mutate: updateSettings } = useUpdateSettings()

    // Only the row being saved is disabled, so one slow request doesn't
    // freeze the whole list.
    const [pendingKey, setPendingKey] = useState(null)

    const handleToggle = (key, checked) => {
        setPendingKey(key)

        updateSettings(
            { [key]: checked },
            {
                onSettled: () => setPendingKey(null),
            }
        )
    }

    return (
        <CommonGlassPanel className="flex flex-col gap-2 p-4 sm:p-5">
            <ProfileSectionHeader
                title="Preferences"
                description="Changes save automatically."
            />

            <div className="flex flex-col">
                {USER_EDITABLE_SETTINGS?.map((field) => (
                    <ProfileSettingRow
                        key={field?.key}
                        label={field?.label}
                        description={field?.description}
                        value={settings?.[field?.key]}
                        isPending={pendingKey === field?.key}
                        onChange={(checked) => handleToggle(field?.key, checked)}
                    />
                ))}
            </div>
        </CommonGlassPanel>
    )
}

export default ProfilePreferencesSection
