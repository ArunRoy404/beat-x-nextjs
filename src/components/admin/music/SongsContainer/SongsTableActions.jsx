import React from "react"
import { Eye, Trash2, SquarePen } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditSongDialog from "@/components/dialogs/admin/music/EditSongDialog"
import DeleteSongDialog from "@/components/dialogs/admin/music/DeleteSongDialog"
import SongDetailsDialog from "@/components/dialogs/admin/music/SongDetailsDialog"
import { useUpdateSongStatus } from "@/hooks/api/admin/songs/useUpdateSongStatus"

const SongsTableActions = ({ status, song, className }) => {
    const { mutate: updateSongStatus, isPending } = useUpdateSongStatus()

    const handleStatusChange = (nextStatus) => {
        updateSongStatus(
            { id: song._id, status: nextStatus },
            {
                onSuccess: () => toast.success(nextStatus === "archived" ? "Song taken down." : "Song restored."),
                onError: (error) => toast.error(error?.message || "Failed to update song status."),
            }
        )
    }

    return (
        <div className={cn("flex items-center justify-end gap-3 pr-2", className)}>
            {status === "active" && (
                <Button
                    onClick={() => handleStatusChange("archived")}
                    disabled={isPending}
                    variant="outline"
                    className="text-yellow-warning border border-yellow-warning/20 bg-yellow-warning/10 rounded-full px-3! py-3!"
                >
                    Take Down
                </Button>
            )}

            {status === "archived" && (
                <Button
                    onClick={() => handleStatusChange("active")}
                    disabled={isPending}
                    variant="outline"
                    className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full px-3! py-3!"
                >
                    Restore
                </Button>
            )}

            <SongDetailsDialog song={song}>
                <Button
                    title="View Details"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </SongDetailsDialog>

            <EditSongDialog song={song}>
                <Button
                    title="Edit Song"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </EditSongDialog>

            <DeleteSongDialog song={song}>
                <Button
                    title="Delete Song"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 shrink-0" />
                </Button>
            </DeleteSongDialog>
        </div>
    )
}

export default SongsTableActions
