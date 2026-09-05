"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useDeleteEvent } from "@/hooks/api/admin/events/useDeleteEvent"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"

const DeleteEventForm = ({ event, onSuccess, onCancel }) => {
    const deleteEventMutation = useDeleteEvent()

    const handleDelete = async (e) => {
        e?.preventDefault()
        const eventId = event?._id || event?.id
        if (!eventId) {
            toast.error("Invalid Event ID")
            return
        }

        try {
            await deleteEventMutation.mutateAsync(eventId)
            toast.success("Event deleted successfully!")
            onSuccess?.()
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || "Failed to delete event")
        }
    }

    return (
        <CommonFormContainer onSubmit={handleDelete}>
            <div className="flex flex-col gap-4">
                <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                    Are you sure you want to permanently delete <span className="font-semibold text-whitetext">{event?.title || "this Event"}</span>? This action cannot be undone.
                </p>
            </div>

            {/* Dialog Footer Actions */}
            <div className="flex items-center gap-4 mt-2 shrink-0">
                <DialogClose asChild className="flex-1 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full"
                        size="lg"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    type="submit"
                    className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white flex items-center justify-center gap-2 border-0"
                    size="lg"
                    disabled={deleteEventMutation.isPending}
                >
                    <Trash2 className="w-4 h-4" /> {deleteEventMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default DeleteEventForm
