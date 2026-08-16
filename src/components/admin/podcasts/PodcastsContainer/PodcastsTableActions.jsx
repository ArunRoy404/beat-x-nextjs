import React from "react"
import { Eye, Trash2, SquarePen } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditPodcastDialog from "@/components/dialogs/admin/podcasts/EditPodcastDialog"
import DeletePodcastDialog from "@/components/dialogs/admin/podcasts/DeletePodcastDialog"
import PodcastDetailsDialog from "@/components/dialogs/admin/podcasts/PodcastDetailsDialog"
import { useUpdatePodcastStatus } from "@/hooks/api/admin/podcasts/useUpdatePodcastStatus"

const PodcastsTableActions = ({ status, podcast, className }) => {
    const { mutate: updatePodcastStatus, isPending } = useUpdatePodcastStatus()

    const handleStatusChange = (nextStatus) => {
        updatePodcastStatus(
            { id: podcast._id, status: nextStatus },
            {
                onSuccess: () => toast.success(nextStatus === "archived" ? "Podcast taken down." : "Podcast restored."),
                onError: (error) => toast.error(error?.message || "Failed to update podcast status."),
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

            <PodcastDetailsDialog podcast={podcast}>
                <Button
                    title="View Details"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </PodcastDetailsDialog>

            <EditPodcastDialog podcast={podcast}>
                <Button
                    title="Edit Podcast"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </EditPodcastDialog>

            <DeletePodcastDialog podcast={podcast}>
                <Button
                    title="Delete Podcast"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 shrink-0" />
                </Button>
            </DeletePodcastDialog>
        </div>
    )
}

export default PodcastsTableActions
