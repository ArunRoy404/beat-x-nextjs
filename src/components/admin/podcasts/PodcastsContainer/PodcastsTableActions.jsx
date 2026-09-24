import React from "react"
import { Eye, Trash2, SquarePen, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditPodcastDialog from "@/components/dialogs/admin/podcasts/EditPodcastDialog"
import DeletePodcastDialog from "@/components/dialogs/admin/podcasts/DeletePodcastDialog"
import PodcastDetailsDialog from "@/components/dialogs/admin/podcasts/PodcastDetailsDialog"
import RejectPodcastDialog from "@/components/dialogs/admin/podcasts/RejectPodcastDialog"
import { useUpdatePodcastStatus } from "@/hooks/api/admin/podcasts/useUpdatePodcastStatus"
import { useApprovePodcast } from "@/hooks/api/admin/podcasts/useApprovePodcast"
import { PODCAST_STATUS, isPodcastAwaitingReview, normalizePodcastStatus } from "@/lib/constants/podcastStatus"

const PodcastsTableActions = ({ status, podcast, className }) => {
    const { mutate: updatePodcastStatus, isPending: isStatusPending } = useUpdatePodcastStatus()
    const { mutate: approvePodcast, isPending: isApprovePending } = useApprovePodcast()

    const normalizedStatus = normalizePodcastStatus(status)
    const isAwaitingReview = isPodcastAwaitingReview(podcast)

    const handleApprove = () => {
        approvePodcast({ id: podcast?._id })
    }

    const handleStatusChange = (nextStatus) => {
        updatePodcastStatus({ id: podcast?._id, status: nextStatus })
    }

    return (
        <div className={cn("flex items-center justify-end gap-2 pr-2", className)}>
            {isAwaitingReview && (
                <>
                    <Button
                        onClick={handleApprove}
                        disabled={isApprovePending}
                        variant="outline"
                        size="sm"
                        className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full px-3 text-[12px] h-8"
                    >
                        <CheckCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                        Approve
                    </Button>

                    <RejectPodcastDialog podcast={podcast}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full px-3 text-[12px] h-8"
                        >
                            <XCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                            Reject
                        </Button>
                    </RejectPodcastDialog>
                </>
            )}

            {!isAwaitingReview && normalizedStatus === PODCAST_STATUS.ACTIVE && (
                <Button
                    onClick={() => handleStatusChange(PODCAST_STATUS.ARCHIVED)}
                    disabled={isStatusPending}
                    variant="outline"
                    className="text-yellow-warning border border-yellow-warning/20 bg-yellow-warning/10 rounded-full px-3! py-3!"
                >
                    Take Down
                </Button>
            )}

            {!isAwaitingReview && normalizedStatus === PODCAST_STATUS.ARCHIVED && (
                <Button
                    onClick={() => handleStatusChange(PODCAST_STATUS.ACTIVE)}
                    disabled={isStatusPending}
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
