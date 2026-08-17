import React from "react"
import { Eye, Trash2, SquarePen } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditAlbumDialog from "@/components/dialogs/admin/albums/EditAlbumDialog"
import DeleteAlbumDialog from "@/components/dialogs/admin/albums/DeleteAlbumDialog"
import AlbumDetailsDialog from "@/components/dialogs/admin/albums/AlbumDetailsDialog"
import { useUpdateAlbumStatus } from "@/hooks/api/admin/albums/useUpdateAlbumStatus"

const AlbumsTableActions = ({ status, album, className }) => {
    const { mutate: updateAlbumStatus, isPending } = useUpdateAlbumStatus()

    const handleStatusChange = (nextStatus) => {
        updateAlbumStatus(
            { id: album._id, status: nextStatus },
            {
                onSuccess: () => toast.success(nextStatus === "archived" ? "Album taken down." : "Album restored."),
                onError: (error) => toast.error(error?.message || "Failed to update album status."),
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

            <AlbumDetailsDialog album={album}>
                <Button
                    title="View Details"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </AlbumDetailsDialog>

            <EditAlbumDialog album={album}>
                <Button
                    title="Edit Album"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </EditAlbumDialog>

            <DeleteAlbumDialog album={album}>
                <Button
                    title="Delete Album"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 shrink-0" />
                </Button>
            </DeleteAlbumDialog>
        </div>
    )
}

export default AlbumsTableActions
