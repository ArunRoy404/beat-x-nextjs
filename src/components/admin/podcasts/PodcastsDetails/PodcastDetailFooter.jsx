import React from "react"
import { Trash2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import DeletePodcastDialog from "@/components/dialogs/admin/podcasts/DeletePodcastDialog"
import RejectPodcastDialog from "@/components/dialogs/admin/podcasts/RejectPodcastDialog"
import { useApprovePodcast } from "@/hooks/api/admin/podcasts/useApprovePodcast"
import { useUpdatePodcastStatus } from "@/hooks/api/admin/podcasts/useUpdatePodcastStatus"
import { PODCAST_STATUS, isPodcastAwaitingReview, normalizePodcastStatus } from "@/lib/constants/podcastStatus"

const PodcastDetailFooter = ({ podcast }) => {
    const { mutate: approvePodcast, isPending: isApprovePending } = useApprovePodcast()
    const { mutate: updatePodcastStatus, isPending: isStatusPending } = useUpdatePodcastStatus()

    const status = normalizePodcastStatus(podcast?.status)
    const isAwaitingReview = isPodcastAwaitingReview(podcast)

    const handleApprove = () => {
        approvePodcast({ id: podcast?._id })
    }

    const handleStatusChange = (nextStatus) => {
        updatePodcastStatus({ id: podcast?._id, status: nextStatus })
    }

    return (
        <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card">
            <div className="flex items-center justify-between w-full flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    {/* Approve / Reject only for a real artist submission awaiting review */}
                    {isAwaitingReview && (
                        <>
                            <Button
                                onClick={handleApprove}
                                disabled={isApprovePending}
                                variant="outline"
                                className="text-green-success border border-green-success/20 bg-green-success/10 hover:bg-green-success/20 font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                            </Button>

                            <RejectPodcastDialog podcast={podcast}>
                                <Button
                                    variant="outline"
                                    className="text-red-error border border-red-error/20 bg-red-error/10 hover:bg-red-error/20 font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Reject
                                </Button>
                            </RejectPodcastDialog>
                        </>
                    )}

                    {!isAwaitingReview && status === PODCAST_STATUS.ACTIVE && (
                        <Button
                            onClick={() => handleStatusChange(PODCAST_STATUS.ARCHIVED)}
                            disabled={isStatusPending}
                            variant="outline"
                            className="text-yellow-warning border border-yellow-warning/20 bg-yellow-warning/10 hover:bg-yellow-warning/20 font-medium rounded-[10px] px-4 h-10"
                        >
                            Take Down
                        </Button>
                    )}

                    {!isAwaitingReview && status === PODCAST_STATUS.ARCHIVED && (
                        <Button
                            onClick={() => handleStatusChange(PODCAST_STATUS.ACTIVE)}
                            disabled={isStatusPending}
                            variant="outline"
                            className="text-green-success border border-green-success/20 bg-green-success/10 hover:bg-green-success/20 font-medium rounded-[10px] px-4 h-10"
                        >
                            Restore
                        </Button>
                    )}

                    <DeletePodcastDialog podcast={podcast}>
                        <Button
                            className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </DeletePodcastDialog>
                </div>

                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95 ml-auto"
                    >
                        Close
                    </Button>
                </DialogClose>
            </div>
        </div>
    )
}

export default PodcastDetailFooter
