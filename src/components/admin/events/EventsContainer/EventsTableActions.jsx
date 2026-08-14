import React from "react"
import { SquarePen, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditEventDialog from "@/components/dialogs/admin/events/EditEventDialog"
import DeleteEventDialog from "@/components/dialogs/admin/events/DeleteEventDialog"

const EventsTableActions = ({ event, className, onClick }) => {
    return (
        <div
            className={cn("flex items-center justify-end gap-3 shrink-0", className)}
            onClick={(e) => {
                e.stopPropagation()
                onClick?.(e)
            }}
        >
            <EditEventDialog event={event}>
                <Button
                    title="Edit Event"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </EditEventDialog>

            <DeleteEventDialog event={event}>
                <Button
                    title="Delete Event"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 shrink-0" />
                </Button>
            </DeleteEventDialog>
        </div>
    )
}

export default EventsTableActions
