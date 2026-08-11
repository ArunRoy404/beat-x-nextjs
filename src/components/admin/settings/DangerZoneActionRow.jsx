import React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import SettingsConfirmDialog from "@/components/dialogs/admin/SettingsConfirmDialog"

const DangerZoneActionRow = ({ action }) => {
    const handleConfirm = () => {
        toast.success(action.successMessage)
    }

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-whitetext text-[18px] not-italic font-semibold">
                    {action.title}
                </span>
                <span className="text-light-gray text-[14px] not-italic font-normal">
                    {action.description}
                </span>
            </div>

            <SettingsConfirmDialog
                title={action.dialogTitle}
                description={action.dialogDescription}
                onConfirm={handleConfirm}
            >
                <Button
                    variant="outline"
                    className="rounded-full px-4 py-2 border border-red-error/10 bg-red-error/10 text-red-error text-[13px] font-semibold hover:bg-red-error/20 shrink-0"
                >
                    {action.buttonLabel}
                </Button>
            </SettingsConfirmDialog>
        </div>
    )
}

export default DangerZoneActionRow
