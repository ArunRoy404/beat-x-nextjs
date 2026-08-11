import React from "react"
import { Eye, Check, X, Trash2, SquarePen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditPodcastDialog from "@/components/dialogs/artist/EditPodcastDialog"
import DeletePodcastDialog from "@/components/dialogs/artist/DeletePodcastDialog"
import PodcastUnderReviewDialog from "@/components/dialogs/artist/PodcastUnderReviewDialog"
import PodcastDetailsDialog from "@/components/dialogs/artist/PodcastDetailsDialog"

const PodcastsTableActions = ({
    status,
    podcast,
    onTakeDown,
    onRestore,
    onApprove,
    className
}) => {
    return (
        <div className={cn("flex items-center justify-end gap-3 pr-2", className)}>
            {/* Conditional status-based actions */}
            {status === "Published" && (
                <Button
                    notImplemented
                    onClick={onTakeDown}
                    variant="outline"
                    className="text-yellow-warning border border-yellow-warning/20 bg-yellow-warning/10 rounded-full px-3! py-3!"
                >
                    Take Down
                </Button>
            )}

            {status === "Take Down" && (
                <Button
                    notImplemented
                    onClick={onRestore}
                    variant="outline"
                    className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full px-3! py-3!"
                >
                    Restore
                </Button>
            )}

            {status === "Under Review" && (
                <>
                    <Button
                        notImplemented
                        onClick={onApprove}
                        title="Approve"
                        size="icon"
                        variant="outline"
                        className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full cursor-pointer"
                    >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                    </Button>
                    <PodcastUnderReviewDialog podcast={podcast} startWithRejection={true}>
                        <Button
                            title="Reject"
                            size="icon"
                            variant="outline"
                            className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                        >
                            <X className="w-3.5 h-3.5 shrink-0" />
                        </Button>
                    </PodcastUnderReviewDialog>
                </>
            )}

            {/* Details circle button */}
            {status === "Under Review" ? (
                <PodcastUnderReviewDialog podcast={podcast}>
                    <Button
                        title="View Details"
                        size="icon"
                        variant="outline"
                        className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                    >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                    </Button>
                </PodcastUnderReviewDialog>
            ) : (
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
            )}

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

            {/* Delete icon */}
            <DeletePodcastDialog podcast={podcast}>
                <Button
                    title="Delete Podcast"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </DeletePodcastDialog>
        </div>
    )
}

export default PodcastsTableActions
