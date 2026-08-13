"use client"

import React from "react"
import { toast } from "sonner"
import { ChevronRight } from "lucide-react"
import SettingsConfirmDialog from "@/components/shared/Settings/SettingsConfirmDialog"

const ArtistDangerZoneActionRow = ({ action }) => {
    const handleConfirm = () => {
        toast.success(action.successMessage)
    }

    return (
        <SettingsConfirmDialog
            title={action.dialogTitle}
            description={action.dialogDescription}
            onConfirm={handleConfirm}
            nativeButton={false}
        >
            <div
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-[12px] border border-red-error/20 bg-red-error/10 text-red-error font-medium text-[14px] cursor-pointer hover:bg-red-error/15 transition-colors"
            >
                <span>{action.title}</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
            </div>
        </SettingsConfirmDialog>
    )
}

export default ArtistDangerZoneActionRow
