import React from "react"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EventDetailsDialog from "@/components/dialogs/admin/events/EventDetailsDialog"
import EditEventDialog from "@/components/dialogs/admin/events/EditEventDialog"
import DeleteEventDialog from "@/components/dialogs/admin/events/DeleteEventDialog"

const EventsTableActions = ({ event, className, onClick }) => {
    return (
        <div
            className={cn("flex items-center justify-end gap-2 shrink-0", className)}
            onClick={(e) => {
                e.stopPropagation()
                onClick?.(e)
            }}
        >
            <EventDetailsDialog event={event}>
                <Button
                    title="View Event Details"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 rounded-full cursor-pointer"
                >
                    <Eye className="w-4 h-4 shrink-0" />
                </Button>
            </EventDetailsDialog>

            <EditEventDialog event={event}>
                <Button
                    title="Edit Event"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 hover:bg-secondary/20 rounded-full cursor-pointer"
                >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </EditEventDialog>

            <DeleteEventDialog event={event}>
                <Button
                    title="Delete Event"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 hover:bg-red-error/20 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 shrink-0" />
                </Button>
            </DeleteEventDialog>
        </div>
    )
}

export default EventsTableActions
